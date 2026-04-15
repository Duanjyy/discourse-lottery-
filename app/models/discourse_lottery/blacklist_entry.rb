module DiscourseLottery
  class BlacklistEntry < ActiveRecord::Base
    self.table_name = "discourse_lottery_blacklist"

    belongs_to :user
    belongs_to :added_by, class_name: "User"

    validates :user_id, presence: true, uniqueness: true
    validates :added_by_id, presence: true
  end
end
