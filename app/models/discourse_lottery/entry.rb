module DiscourseLottery
  class Entry < ActiveRecord::Base
    self.table_name = "discourse_lottery_entries"

    belongs_to :lottery, class_name: "DiscourseLottery::Lottery"
    belongs_to :user

    validates :lottery_id, presence: true
    validates :user_id, presence: true
    validates :entered_at, presence: true
  end
end
