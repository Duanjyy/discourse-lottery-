module DiscourseLottery
  class Winner < ActiveRecord::Base
    self.table_name = "discourse_lottery_winners"

    enum delivery_status: { pending: 0, delivered: 1 }

    belongs_to :lottery, class_name: "DiscourseLottery::Lottery"
    belongs_to :prize, class_name: "DiscourseLottery::Prize"
    belongs_to :user

    validates :lottery_id, presence: true
    validates :prize_id, presence: true
    validates :user_id, presence: true
    validates :drawn_at, presence: true
  end
end
