module DiscourseLottery
  class BlacklistEntrySerializer < ApplicationSerializer
    attributes :id, :user_id, :username, :reason, :added_by_id, :added_by_username, :created_at

    def username
      object.user.username
    end

    def added_by_username
      object.added_by.username
    end
  end
end
