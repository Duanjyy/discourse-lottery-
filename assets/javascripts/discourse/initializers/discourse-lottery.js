import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-lottery",
  initialize(container) {
    withPluginApi("0.8.7", (api) => {
      api.addNavigationBarItem({
        name: "lotteries",
        displayName: I18n.t("discourse_lottery.nav"),
        href: "/lotteries",
      });
    });

    const router = container.lookup("router:main");
    router.map(function () {
      this.route("lotteries", { path: "/lotteries" });
      this.route("lottery", { path: "/lotteries/:id" });
    });
  },
};

