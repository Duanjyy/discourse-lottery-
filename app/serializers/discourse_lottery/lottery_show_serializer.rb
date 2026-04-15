module DiscourseLottery
  class LotteryShowSerializer < ApplicationSerializer
    attributes :id,
               :title,
               :cover_upload_id,
               :cover_image_url,
               :description_cooked,
               :topic_id,
               :participants_count,
               :starts_at,
               :ends_at,
               :draw_at,
               :draw_mode,
               :status,
               :seed,
               :drawn_at,
               :created_by_username,
               :conditions

    has_many :prizes, serializer: DiscourseLottery::PrizeSerializer

    def created_by_username
      object.created_by.username
    end
  end
end
