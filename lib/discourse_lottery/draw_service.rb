require "digest"
require "openssl"

module DiscourseLottery
  class DrawService
    Result = Struct.new(:ok, :error, :seed, :winners, keyword_init: true)

    def self.call(lottery:, performed_by:, redraw: false)
      new(lottery: lottery, performed_by: performed_by, redraw: redraw).call
    end

    def initialize(lottery:, performed_by:, redraw:)
      @lottery = lottery
      @performed_by = performed_by
      @redraw = redraw
    end

    def call
      now = Time.zone.now
      lottery = Lottery.lock.find(@lottery.id)

      return Result.new(ok: false, error: "not_found") if lottery.blank? || lottery.deleted?
      return Result.new(ok: false, error: "draw_not_allowed") if lottery.closed? && !lottery.drawn?

      if lottery.drawn? && !@redraw
        return Result.new(ok: true, seed: lottery.seed, winners: lottery.winners.includes(:prize, :user))
      end

      if now < lottery.ends_at && lottery.manual?
        return Result.new(ok: false, error: "draw_not_allowed")
      end

      prizes = lottery.prizes.order(:rank, :id).to_a
      return Result.new(ok: false, error: "draw_not_allowed") if prizes.empty?

      Entry.where(lottery_id: lottery.id).where("entered_at <= ?", lottery.ends_at).pluck(:user_id).then do |user_ids|
        user_ids = user_ids.uniq
        user_ids = filter_user_ids(user_ids)

        entries_digest = Digest::SHA256.hexdigest(user_ids.sort.join(","))
        drawn_at = now
        seed = OpenSSL::HMAC.hexdigest("SHA256", Rails.application.secret_key_base, "#{lottery.id}:#{drawn_at.to_i}:#{entries_digest}")
        rnd = Random.new(seed.to_i(16) % 2**31)

        winners_by_prize = []
        remaining = user_ids.dup

        prizes.each do |prize|
          break if remaining.empty?
          count = [prize.quantity.to_i, remaining.length].min
          selected = remaining.sample(count, random: rnd)
          remaining -= selected
          selected.each do |user_id|
            winners_by_prize << { prize_id: prize.id, user_id: user_id }
          end
        end

        Winner.transaction do
          if @redraw
            Winner.where(lottery_id: lottery.id).delete_all
          end

          lottery.update!(seed: seed, drawn_at: drawn_at, status: :drawn)

          winners_by_prize.each do |row|
            Winner.create!(
              lottery_id: lottery.id,
              prize_id: row[:prize_id],
              user_id: row[:user_id],
              drawn_at: drawn_at,
              delivery_status: Winner.delivery_statuses[:pending]
            )
          end
        end

        notify_winners!(lottery)

        Result.new(ok: true, seed: seed, winners: lottery.winners.includes(:prize, :user))
      end
    rescue StandardError => e
      Discourse.warn_exception(e, message: "discourse_lottery draw failed", env: { lottery_id: @lottery.id })
      Result.new(ok: false, error: "draw_failed")
    end

    private

    def filter_user_ids(user_ids)
      blacklisted_ids = BlacklistEntry.where(user_id: user_ids).pluck(:user_id)
      user_ids -= blacklisted_ids
      user_ids
    end

    def notify_winners!(lottery)
      return unless SiteSetting.lottery_send_notifications

      winners = Winner.where(lottery_id: lottery.id).includes(:user, :prize)
      winners.find_each do |winner|
        SystemMessage.create(
          winner.user,
          "discourse_lottery_win",
          lottery_title: lottery.title,
          prize_name: winner.prize.name,
          lottery_url: "#{Discourse.base_url}/lotteries/#{lottery.id}"
        )
      end
    end
  end
end
