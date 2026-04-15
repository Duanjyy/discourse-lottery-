module DiscourseLottery
  class EntryAdminSerializer < ApplicationSerializer
    attributes :id, :lottery_id, :user_id, :username, :entered_at, :ip_address

    def username
      object.user.username
    end
  end
end
