module DiscourseLottery
  class LotteryAdminListSerializer < ApplicationSerializer
    attributes :id,
               :title,
               :status,
               :draw_mode,
               :starts_at,
               :ends_at,
               :draw_at,
               :participants_count,
               :created_at,
               :created_by_username

    def created_by_username
      object.created_by.username
    end
  end
end
