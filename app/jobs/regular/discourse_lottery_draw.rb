module Jobs
  class DiscourseLotteryDraw < ::Jobs::Base
    def execute(args)
      lottery_id = args[:lottery_id]
      return if lottery_id.blank?

      lottery = DiscourseLottery::Lottery.find_by(id: lottery_id)
      return if lottery.blank? || lottery.deleted?

      return if lottery.drawn? || lottery.closed?
      return if lottery.draw_at.present? && Time.zone.now < lottery.draw_at

      DiscourseLottery::DrawService.call(lottery: lottery, performed_by: Discourse.system_user, redraw: false)
    end
  end
end

