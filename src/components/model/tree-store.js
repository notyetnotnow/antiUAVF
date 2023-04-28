import TreeNode from "./tree-node";

export default class TreeStore {
  constructor(options) {
    this.currentNode = null;
    this.currentNodeKey = null;
    
    for (let option in options) {
      if(Object.prototype.hasOwnProperty.call(options, option)){
        this[option] = options[option];
      }
    }
    
    this.nodesMap = {};

    this.root = new TreeNode({
      data: this.data,
      store: this
    });

  }

  registerNode(node) {
    const key = this.key;

    if (!key || !node || !node.data) return;

    const nodeKey = node.key;
    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
  }

  deregisterNode(node) {
    const key = this.key;
    if (!key || !node || !node.data) return;

    node.childNodes.forEach(child => {
      this.deregisterNode(child);
    });

    delete this.nodesMap[node.key];
  }

  setData(newVal) {
    const instanceChanged = newVal !== this.root.data;
    if (instanceChanged) {
      this.root.setData(newVal);
    } else {
      this.root.updateChildren();
    }
  }

  updateChildren() {
    // const newData = this.getChildren() || [];
    // const oldData = this.childNodes.map((node) => node.data);

    // const newDataMap = {};
    // const newNodes = [];

    // newData.forEach((item, index) => {
    //   const key = item[NODE_KEY];
    //   const isNodeExists = !!key && arrayFindIndex(oldData, data => data[NODE_KEY] === key) >= 0;
    //   if (isNodeExists) {
    //     newDataMap[key] = { index, data: item };
    //   } else {
    //     newNodes.push({ index, data: item });
    //   }
    // });

    // if (!this.store.lazy) {
    //   oldData.forEach((item) => {
    //     if (!newDataMap[item[NODE_KEY]]) this.removeChildByData(item);
    //   });
    // }

    // newNodes.forEach(({ index, data }) => {
    //   this.insertChild({ data }, index);
    // });

  }
}