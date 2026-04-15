module DiscourseLottery
  class UsersController < DiscourseLottery::ApplicationController
    before_action :ensure_logged_in

    def entries
      user = fetch_user
      raise Discourse::InvalidAccess unless guardian.can_see_profile?(user)

      entries =
        Entry.where(user_id: user.id)
          .joins("JOIN discourse_lotteries l ON l.id = discourse_lottery_entries.lottery_id")
          .select("discourse_lottery_entries.*, l.title AS title")
          .where("l.status != ?", Lottery.statuses[:deleted])
          .order("discourse_lottery_entries.entered_at DESC")
          .limit(50)

      payload = entries.map do |e|
        {
          lottery_id: e.lottery_id,
          entered_at: e.entered_at,
          title: e.attributes["title"] || Lottery.where(id: e.lottery_id).pick(:title)
        }
      end

      render_json_dump(entries: payload)
    end

    def wins
      user = fetch_user
      raise Discourse::InvalidAccess unless guardian.can_see_profile?(user)

      winners =
        Winner.where(user_id: user.id)
          .includes(:lottery, :prize)
          .order(drawn_at: :desc)
          .limit(50)

      payload = winners.map do |w|
        {
          lottery_id: w.lottery_id,
          title: w.lottery.title,
          prize_name: w.prize.name,
          rank: w.prize.rank,
          drawn_at: w.drawn_at,
          delivery_status: w.delivery_status
        }
      end

      render_json_dump(wins: payload)
    end

    private

    def ensure_logged_in
      guardian.ensure_logged_in
    end

    def fetch_user
      User.find_by_username!(params[:username])
    end
  end
end
