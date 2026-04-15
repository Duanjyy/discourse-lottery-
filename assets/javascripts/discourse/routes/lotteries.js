import Route from "@ember/routing/route";
import { ajax } from "discourse/lib/ajax";

export default class LotteriesRoute extends Route {
  model() {
    return ajax("/lotteries");
  }
}

