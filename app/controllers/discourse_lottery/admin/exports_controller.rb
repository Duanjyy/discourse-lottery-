module DiscourseLottery
  module Admin
    class ExportsController < DiscourseLottery::Admin::BaseController
      def show
        lottery = Lottery.find(params[:id])
        type = params[:type].presence || "entries"

        csv =
          case type
          when "entries"
            ExportService.entries_csv(lottery)
          when "winners"
            ExportService.winners_csv(lottery)
          else
            raise Discourse::NotFound
          end

        filename = "lottery-#{lottery.id}-#{type}.csv"
        send_data csv, filename: filename, type: "text/csv; charset=utf-8"
      end
    end
  end
end

