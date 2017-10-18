import { observable, computed, action } from 'mobx';

class Store {
  @observable decks = {};

  @computed
  get count() {
    return this.decks.length;
  }

  @action
  setDecks(decks) {
    this.decks = decks;
  }
}

export default new Store();
