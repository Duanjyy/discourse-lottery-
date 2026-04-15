module DiscourseLottery
  class ApplicationController < ::ApplicationController
    requires_plugin DiscourseLottery::PLUGIN_NAME

    before_action :ensure_enabled

    private

    def ensure_enabled
      raise Discourse::NotFound unless SiteSetting.lottery_enabled
    end
  end
end
