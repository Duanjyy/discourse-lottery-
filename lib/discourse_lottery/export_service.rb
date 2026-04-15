require "csv"

module DiscourseLottery
  class ExportService
    def self.entries_csv(lottery)
      CSV.generate(headers: true) do |csv|
        csv << %w[user_id username entered_at ip_address]
        Entry.where(lottery_id: lottery.id).includes(:user).find_each do |entry|
          csv << [entry.user_id, entry.user.username, entry.entered_at&.iso8601, entry.ip_address]
        end
      end
    end

    def self.winners_csv(lottery)
      CSV.generate(headers: true) do |csv|
        csv << %w[user_id username prize rank drawn_at delivery_status]
        Winner.where(lottery_id: lottery.id).includes(:user, :prize).find_each do |winner|
          csv << [
            winner.user_id,
            winner.user.username,
            winner.prize.name,
            winner.prize.rank,
            winner.drawn_at&.iso8601,
            winner.delivery_status
          ]
        end
      end
    end
  end
end
