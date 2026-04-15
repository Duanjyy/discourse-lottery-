module DiscourseLottery
  class LotteriesController < DiscourseLottery::ApplicationController
    before_action :ensure_participation_enabled, only: %i[enter leave]

    def index
      lotteries = Lottery.where.not(status: Lottery.statuses[:deleted]).order(starts_at: :desc)

      if (status = params[:status]).present? && Lottery.statuses.key?(status)
        lotteries = lotteries.where(status: Lottery.statuses[status])
      end

      if (q = params[:q]).present?
        q = q.to_s.strip
        lotteries = lotteries.joins("LEFT JOIN users u ON u.id = discourse_lotteries.created_by_id")
        lotteries = lotteries.where("discourse_lotteries.title ILIKE ? OR u.username ILIKE ?", "%#{q}%", "%#{q}%")
      end

      page = [params[:page].to_i, 0].max
      per_page = [[params[:per_page].to_i, 50].min, 1].max
      per_page = 20 if params[:per_page].blank?
      lotteries = lotteries.limit(per_page).offset(page * per_page)

      render_serialized(lotteries, DiscourseLottery::LotteryListItemSerializer)
    end

    def show
      lottery = find_lottery
      lottery.mark_running!

      entered = current_user.present? && Entry.exists?(lottery_id: lottery.id, user_id: current_user.id)
      eligibility =
        if current_user.present?
          EligibilityChecker.call(lottery: lottery, user: current_user, ip_address: request.remote_ip)
        else
          { ok: false, reasons: [EligibilityChecker.reason("not_logged_in")] }
        end

      eligibility[:reasons_text] =
        Array(eligibility[:reasons]).map do |r|
          I18n.t("discourse_lottery.eligibility.#{r[:key]}", **(r[:args] || {}))
        end

      payload = DiscourseLottery::LotteryShowSerializer.new(lottery, scope: guardian, root: false).as_json
      payload[:entered] = entered
      payload[:eligibility] = eligibility

      render_json_dump(payload)
    end

    def enter
      guardian.ensure_logged_in
      lottery = find_lottery

      raise Discourse::InvalidAccess unless lottery.can_enter_now?
      raise Discourse::InvalidAccess unless lottery.running? || lottery.scheduled?

      lottery.mark_running!
      raise Discourse::InvalidAccess unless lottery.running?

      eligibility = EligibilityChecker.call(lottery: lottery, user: current_user, ip_address: request.remote_ip)
      raise Discourse::InvalidAccess unless eligibility[:ok]

      Entry.transaction do
        Entry.create!(
          lottery_id: lottery.id,
          user_id: current_user.id,
          ip_address: request.remote_ip,
          entered_at: Time.zone.now
        )
        Lottery.increment_counter(:participants_count, lottery.id)
      end

      render_json_dump(success_json)
    rescue ActiveRecord::RecordNotUnique
      render_json_dump(success_json)
    end

    def leave
      guardian.ensure_logged_in
      lottery = find_lottery
      raise Discourse::InvalidAccess unless Time.zone.now <= lottery.ends_at

      removed = Entry.where(lottery_id: lottery.id, user_id: current_user.id).delete_all
      Lottery.decrement_counter(:participants_count, lottery.id) if removed.to_i > 0 && lottery.participants_count.to_i > 0

      render_json_dump(success_json)
    end

    def results
      lottery = find_lottery
      raise Discourse::InvalidAccess unless can_view_results?(lottery)

      render_serialized(lottery.winners.includes(:user, :prize).order(:prize_id, :id), DiscourseLottery::WinnerSerializer)
    end

    private

    def find_lottery
      Lottery.find_by(id: params[:id]).tap do |lottery|
        raise Discourse::NotFound if lottery.blank? || lottery.deleted?
      end
    end

    def ensure_participation_enabled
      raise Discourse::InvalidAccess unless SiteSetting.lottery_participation_enabled
    end

    def can_view_results?(lottery)
      return true if SiteSetting.lottery_results_public
      return true if guardian.is_admin?
      return false if current_user.blank?
      Winner.exists?(lottery_id: lottery.id, user_id: current_user.id) || Entry.exists?(lottery_id: lottery.id, user_id: current_user.id)
    end
  end
end
