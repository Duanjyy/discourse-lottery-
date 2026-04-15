module DiscourseLottery
  class EligibilityChecker
    def self.call(lottery:, user:, ip_address: nil)
      return result(false, [reason("not_logged_in")]) if user.blank?
      return result(false, [reason("suspended")]) if user.respond_to?(:suspended?) && user.suspended?
      return result(false, [reason("silenced")]) if user.respond_to?(:silenced?) && user.silenced?
      return result(false, [reason("inactive")]) if user.respond_to?(:active?) && !user.active?
      return result(false, [reason("blacklisted")]) if BlacklistEntry.exists?(user_id: user.id)

      conditions = (lottery.conditions || {}).with_indifferent_access
      reasons = []

      if (min_days = conditions[:min_registered_days]).present?
        days = ((Time.zone.now - user.created_at) / 1.day).floor
        reasons << reason("min_registered_days", expected: min_days, actual: days) if days < min_days.to_i
      end

      if (min_topics = conditions[:min_topic_count]).present?
        topics = user.user_stat&.topic_count.to_i
        reasons << reason("min_topic_count", expected: min_topics, actual: topics) if topics < min_topics.to_i
      end

      if (min_posts = conditions[:min_post_count]).present?
        posts = user.user_stat&.post_count.to_i
        reasons << reason("min_post_count", expected: min_posts, actual: posts) if posts < min_posts.to_i
      end

      if (min_replies = conditions[:min_reply_count]).present?
        replies =
          if user.user_stat&.respond_to?(:reply_count)
            user.user_stat.reply_count.to_i
          else
            [user.user_stat&.post_count.to_i - user.user_stat&.topic_count.to_i, 0].max
          end
        reasons << reason("min_reply_count", expected: min_replies, actual: replies) if replies < min_replies.to_i
      end

      if conditions[:require_verified_email]
        verified = user.respond_to?(:email_confirmed?) ? user.email_confirmed? : true
        reasons << reason("require_verified_email") unless verified
      end

      if (group_ids = conditions[:required_group_ids]).present?
        group_ids = Array(group_ids).map(&:to_i).uniq
        reasons << reason("required_group_ids") unless user.groups.where(id: group_ids).exists?
      end

      if (topic_id = conditions[:require_like_topic_id]).present?
        type_id = PostActionType.types[:like]
        liked =
          PostAction.joins(:post).where(
            user_id: user.id,
            post_actions: { post_action_type_id: type_id },
            posts: { topic_id: topic_id.to_i, post_number: 1, deleted_at: nil }
          ).exists?
        reasons << reason("require_like_topic_id") unless liked
      end

      if (topic_id = conditions[:require_reply_topic_id]).present?
        replied = Post.where(topic_id: topic_id.to_i, user_id: user.id).where("post_number > 1").where(deleted_at: nil).exists?
        reasons << reason("require_reply_topic_id") unless replied
      end

      one_entry_per_ip = conditions.key?(:one_entry_per_ip) ? conditions[:one_entry_per_ip] : SiteSetting.lottery_one_entry_per_ip
      if one_entry_per_ip && ip_address.present?
        exists = Entry.where(lottery_id: lottery.id, ip_address: ip_address).exists?
        reasons << reason("one_entry_per_ip") if exists
      end

      result(reasons.empty?, reasons)
    end

    def self.result(ok, reasons)
      { ok: ok, reasons: reasons }
    end

    def self.reason(key, **args)
      { key: key, args: args }
    end
  end
end
