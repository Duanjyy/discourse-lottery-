module DiscourseLottery
  module Admin
    class LotteriesController < DiscourseLottery::Admin::BaseController
      def index
        lotteries = Lottery.order(created_at: :desc)
        lotteries = lotteries.where(status: params[:status]) if params[:status].present? && Lottery.statuses.key?(params[:status])
        render_serialized(lotteries.limit(50), DiscourseLottery::LotteryAdminListSerializer)
      end

      def show
        lottery = Lottery.find(params[:id])
        render_serialized(lottery, DiscourseLottery::LotteryAdminShowSerializer)
      end

      def create
        lottery = Lottery.new
        apply_lottery_params(lottery, allow_prizes: true)
        lottery.created_by_id = current_user.id
        lottery.status = lottery.infer_status_from_time
        lottery.save!

        schedule_jobs(lottery)

        render_serialized(lottery, DiscourseLottery::LotteryAdminShowSerializer)
      end

      def update
        lottery = Lottery.find(params[:id])

        if lottery.drawn?
          raise Discourse::InvalidAccess
        end

        apply_lottery_params(lottery, allow_prizes: true)
        lottery.save!

        schedule_jobs(lottery)

        render_serialized(lottery, DiscourseLottery::LotteryAdminShowSerializer)
      end

      def close
        lottery = Lottery.find(params[:id])
        lottery.mark_closed!
        render_json_dump(success_json)
      end

      def destroy
        lottery = Lottery.find(params[:id])
        lottery.soft_delete!
        render_json_dump(success_json)
      end

      def restore
        lottery = Lottery.find(params[:id])
        lottery.restore!
        render_json_dump(success_json)
      end

      def draw
        lottery = Lottery.find(params[:id])
        redraw = params[:redraw].to_s == "true"
        result = DrawService.call(lottery: lottery, performed_by: current_user, redraw: redraw)
        raise Discourse::InvalidAccess unless result.ok
        render_json_dump(seed: result.seed)
      end

      def entries
        lottery = Lottery.find(params[:id])
        entries = Entry.where(lottery_id: lottery.id).includes(:user).order(entered_at: :desc)
        render_serialized(entries.limit(200), DiscourseLottery::EntryAdminSerializer)
      end

      def winners
        lottery = Lottery.find(params[:id])
        winners = Winner.where(lottery_id: lottery.id).includes(:user, :prize).order(:prize_id, :id)
        render_serialized(winners, DiscourseLottery::WinnerAdminSerializer)
      end

      def mark_delivered
        lottery = Lottery.find(params[:id])
        winner = Winner.find_by!(id: params[:winner_id], lottery_id: lottery.id)
        winner.update!(delivery_status: Winner.delivery_statuses[:delivered])
        render_json_dump(success_json)
      end

      private

      def apply_lottery_params(lottery, allow_prizes:)
        attrs = lottery_params

        if attrs[:prizes].present? && allow_prizes
          prizes = attrs.delete(:prizes)
          lottery.prizes.destroy_all
          prizes.each do |p|
            lottery.prizes.build(
              rank: p[:rank],
              name: p[:name],
              quantity: p[:quantity],
              image_upload_id: p[:image_upload_id],
              image_url: p[:image_url],
              description: p[:description],
              prize_type: p[:prize_type] || "physical"
            )
          end
        end

        lottery.assign_attributes(attrs.except(:prizes))
      end

      def schedule_jobs(lottery)
        return unless lottery.auto? && lottery.draw_at.present?
        Jobs.enqueue_at(lottery.draw_at, :discourse_lottery_draw, lottery_id: lottery.id)
      end

      def lottery_params
        params.require(:lottery).permit(
          :title,
          :cover_upload_id,
          :cover_image_url,
          :description_raw,
          :topic_id,
          :starts_at,
          :ends_at,
          :draw_at,
          :draw_mode,
          :status,
          conditions: [
            :min_registered_days,
            :min_topic_count,
            :min_post_count,
            :min_reply_count,
            :require_verified_email,
            :require_like_topic_id,
            :require_reply_topic_id,
            :one_entry_per_ip,
            { required_group_ids: [] }
          ],
          prizes: %i[rank name quantity image_upload_id image_url description prize_type]
        )
      end
    end
  end
end
