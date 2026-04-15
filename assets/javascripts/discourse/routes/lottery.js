import Route from "@ember/routing/route";
import { action } from "@ember/object";
import { ajax } from "discourse/lib/ajax";

export default class LotteryRoute extends Route {
  model(params) {
    return ajax(`/lotteries/${params.id}`);
  }

  @action
  refreshModel() {
    this.refresh();
  }
}
