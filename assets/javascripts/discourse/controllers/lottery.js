import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { ajax } from "discourse/lib/ajax";

export default class LotteryController extends Controller {
  @tracked results = null;

  @action
  async enter() {
    await ajax(`/lotteries/${this.model.id}/enter`, { type: "POST" });
    await this.send("refreshModel");
  }

  @action
  async leave() {
    await ajax(`/lotteries/${this.model.id}/enter`, { type: "DELETE" });
    await this.send("refreshModel");
  }

  @action
  async loadResults() {
    this.results = await ajax(`/lotteries/${this.model.id}/results`);
  }
}

