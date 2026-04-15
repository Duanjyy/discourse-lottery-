module DiscourseLottery
  module Admin
    class BlacklistController < DiscourseLottery::Admin::BaseController
      def index
        entries = BlacklistEntry.includes(:user, :added_by).order(created_at: :desc).limit(200)
        render_serialized(entries, DiscourseLottery::BlacklistEntrySerializer)
      end

      def create
        user = User.find_by(username: params.require(:username))
        raise Discourse::NotFound if user.blank?

        entry =
          BlacklistEntry.create!(
            user_id: user.id,
            added_by_id: current_user.id,
            reason: params[:reason].presence
          )

        render_serialized(entry, DiscourseLottery::BlacklistEntrySerializer)
      end

      def destroy
        entry = BlacklistEntry.find(params[:id])
        entry.destroy!
        render_json_dump(success_json)
      end

      def import
        raw = params.require(:usernames).to_s
        usernames = raw.split(/[\r\n,]+/).map(&:strip).reject(&:blank?).uniq

        created = 0
        usernames.each do |username|
          user = User.find_by(username: username)
          next if user.blank?
          next if BlacklistEntry.exists?(user_id: user.id)

          BlacklistEntry.create!(user_id: user.id, added_by_id: current_user.id)
          created += 1
        end

        render_json_dump(success_json.merge(created: created))
      end
    end
  end
end

