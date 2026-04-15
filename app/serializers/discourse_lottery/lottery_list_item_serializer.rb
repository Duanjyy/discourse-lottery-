module DiscourseLottery
  class LotteryListItemSerializer < ApplicationSerializer
    attributes :id,
               :title,
               :cover_upload_id,
               :cover_image_url,
               :participants_count,
               :starts_at,
               :ends_at,
               :draw_at,
               :draw_mode,
               :status,
               :created_by_username

    has_many :prizes, serializer: DiscourseLottery::PrizeSerializer

    def created_by_username
      object.created_by.username
    end
  end
end
