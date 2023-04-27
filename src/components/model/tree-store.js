

export default class TreeStore {
  constructor(options) {
    this.currentNode = null;
    this.currentNodeKey = null;

    for (let option in options) {
      this[option] = options[option];
    }

    this.nodesMap = {};

    this.root = new Node({
      data: this.data,
      store: this
    });

  }

}