module DiscourseLottery
  class WinnerAdminSerializer < ApplicationSerializer
    attributes :id,
               :lottery_id,
               :user_id,
               :username,
               :prize_id,
               :prize_name,
               :rank,
               :drawn_at,
               :delivery_status

    def username
      object.user.username
    end

    def prize_name
      object.prize.name
    end

    def rank
      object.prize.rank
    end
  end
end
