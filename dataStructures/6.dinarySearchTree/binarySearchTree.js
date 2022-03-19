import { Compare, defaultCompare } from "../../utils/index.js";

// 树的节点类
export class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export  class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    // 树的根节点
    this.root = null;
    this.compareFn = compareFn;
  }

  insert(key) {
    let node = new Node(key);
    if (this.root == null) {
      this.root = node;
      return true;
    } else {
      return this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    let compareResult = this.compareFn(key, node.key);
    // key === node.key
    if (compareResult === Compare.EQUALS) {
      return false;
    }
    // key < node.key
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        //基线条件
        node.left = new Node(key);
        return true;
      } else {
        return this.insertNode(node.left, key);
      }
    } else {
      // key > node.key
      if (node.right == null) {
        //基线条件
        node.right = new Node(key);
        return true;
      } else {
        return this.insertNode(node.right, key);
      }
    }
  }

  // 中序遍历
  inOrderTraverse(callBack) {
    this.inOrderTraverseNode(this.root, callBack);
  }

  inOrderTraverseNode(node, callBack) {
    if (node != null) {
      //基线条件
      this.inOrderTraverseNode(node.left, callBack);
      callBack(node.key);
      this.inOrderTraverseNode(node.right, callBack);
    }
  }

  // 先序遍历
  preOrderTraverse(callBack) {
    this.preOrderTraverseNode(this.root, callBack);
  }
  preOrderTraverseNode(node, callBack) {
    if (node != null) {
      callBack(node.key);
      this.preOrderTraverseNode(node.left, callBack);
      this.preOrderTraverseNode(node.right, callBack);
    }
  }

  // 后序遍历
  postOrderTraverse(callBack) {
    this.postOrderTraverseNode(this.root, callBack);
  }
  postOrderTraverseNode(node, callBack) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callBack);
      this.postOrderTraverseNode(node.right, callBack);
      callBack(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    let compareResult = this.compareFn(key, node.key);
    if (compareResult === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (compareResult === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    // console.trace();
    if (node == null) {
      return null;
    }
    let compareResult = this.compareFn(key, node.key);
    if (compareResult === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (compareResult === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 第一种删除叶节点
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      //   第二种： 删除只有一个子节点的节点
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == node) {
        node = node.left;
        return node;
      }
      //   第三种，删除有两个子节点的节点
      let minNode = this.minNode(node.right); //右侧最小节点
      let minKey = minNode.key;
      node.key = minKey;
      node.right = this.removeNode(node.right, minKey);
      return node;
    }
  }
}
