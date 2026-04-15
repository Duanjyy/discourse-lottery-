import Route from "@ember/routing/route";
import { ajax } from "discourse/lib/ajax";

export default class AdminPluginsLotteriesRoute extends Route {
  model() {
    return ajax("/admin/plugins/lotteries");
  }
}

