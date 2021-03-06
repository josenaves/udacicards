import { observable, computed, action } from 'mobx';

class Store {
  @observable decks = {};

  // number of decks
  @computed
  get decksCount() {
    return Object.keys(this.decks).length;
  }

  @computed
  get deckTitles() {
    return Object.keys(this.decks);
  }

  @action
  setDecks(brandNewDecks) {
    this.decks = brandNewDecks;
  }
}

export default new Store();
