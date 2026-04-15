module DiscourseLottery
  module Admin
    class BaseController < ::Admin::AdminController
      requires_plugin DiscourseLottery::PLUGIN_NAME

      before_action :ensure_enabled

      private

      def ensure_enabled
        raise Discourse::NotFound unless SiteSetting.lottery_enabled
      end
    end
  end
end
