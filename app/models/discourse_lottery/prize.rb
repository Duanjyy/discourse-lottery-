module DiscourseLottery
  class Prize < ActiveRecord::Base
    self.table_name = "discourse_lottery_prizes"

    belongs_to :lottery, class_name: "DiscourseLottery::Lottery"
    has_many :winners, class_name: "DiscourseLottery::Winner", foreign_key: :prize_id, dependent: :destroy

    validates :lottery_id, presence: true
    validates :rank, presence: true, numericality: { greater_than: 0, only_integer: true }
    validates :name, presence: true, length: { maximum: 255 }
    validates :quantity, presence: true, numericality: { greater_than: 0, only_integer: true }
    validates :prize_type, presence: true
  end
end
