# name: discourse-lottery
# about: Native lottery plugin for Discourse
# version: 0.1.0
# authors: SOLO
# url: https://example.com

enabled_site_setting :lottery_enabled

register_asset "stylesheets/common/discourse-lottery.scss"

after_initialize do
  module ::DiscourseLottery
    PLUGIN_NAME = "discourse-lottery"
  end

  [
    "../lib/discourse_lottery/eligibility_checker",
    "../lib/discourse_lottery/draw_service",
    "../lib/discourse_lottery/export_service"
  ].each do |path|
    require_relative path
  end

  Discourse::Application.routes.append do
    get "/lotteries" => "discourse_lottery/lotteries#index"
    get "/lotteries/:id" => "discourse_lottery/lotteries#show"
    get "/lotteries/:id/results" => "discourse_lottery/lotteries#results"
    post "/lotteries/:id/enter" => "discourse_lottery/lotteries#enter"
    delete "/lotteries/:id/enter" => "discourse_lottery/lotteries#leave"

    get "/u/:username/lotteries/entries" => "discourse_lottery/users#entries"
    get "/u/:username/lotteries/wins" => "discourse_lottery/users#wins"

    namespace :admin do
      get "/plugins/lotteries" => "discourse_lottery/admin/lotteries#index"
      post "/plugins/lotteries" => "discourse_lottery/admin/lotteries#create"
      get "/plugins/lotteries/:id" => "discourse_lottery/admin/lotteries#show"
      put "/plugins/lotteries/:id" => "discourse_lottery/admin/lotteries#update"
      delete "/plugins/lotteries/:id" => "discourse_lottery/admin/lotteries#destroy"
      post "/plugins/lotteries/:id/restore" => "discourse_lottery/admin/lotteries#restore"
      post "/plugins/lotteries/:id/close" => "discourse_lottery/admin/lotteries#close"
      post "/plugins/lotteries/:id/draw" => "discourse_lottery/admin/lotteries#draw"
      get "/plugins/lotteries/:id/entries" => "discourse_lottery/admin/lotteries#entries"
      get "/plugins/lotteries/:id/winners" => "discourse_lottery/admin/lotteries#winners"
      post "/plugins/lotteries/:id/winners/:winner_id/mark_delivered" => "discourse_lottery/admin/lotteries#mark_delivered"

      get "/plugins/lotteries/:id/export" => "discourse_lottery/admin/exports#show"

      get "/plugins/lotteries/blacklist" => "discourse_lottery/admin/blacklist#index"
      post "/plugins/lotteries/blacklist" => "discourse_lottery/admin/blacklist#create"
      delete "/plugins/lotteries/blacklist/:id" => "discourse_lottery/admin/blacklist#destroy"
      post "/plugins/lotteries/blacklist/import" => "discourse_lottery/admin/blacklist#import"
    end
  end
end
