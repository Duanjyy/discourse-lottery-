import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-lottery-admin",
  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.addAdminRoute("discourse_lottery.admin_title", "lotteries");
    });
  },
};

