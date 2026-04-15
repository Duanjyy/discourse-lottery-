module DiscourseLottery
  class PrizeSerializer < ApplicationSerializer
    attributes :id, :rank, :name, :quantity, :image_upload_id, :image_url, :description, :prize_type
  end
end
