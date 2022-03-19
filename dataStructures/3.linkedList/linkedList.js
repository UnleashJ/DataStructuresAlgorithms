import { Node } from "./linkedNode.js";

export class LinkedList {
  constructor() {
    this.count = 0;
    this.head = null;
  }

  push(element) {
    let node = new Node(element);
    let current = null;
    if (!this.head) {
      this.head = node;
    } else {
      // 从头开始向后迭代
      //   current = this.head;
      //   while (current.next) {
      //     current = current.next;
      //   }
      current = this.getElementAt(this.count - 1);
      current.next = node;
    }
    this.count++;
  }

  removeAt(index) {
    //   索引，不包含count
    if (index >= 0 && index < this.count) {
      let current = this.head;
      // 如果要删除第一个元素。直接删除
      if (index === 0) {
        this.head = this.head.next;
      } else {
        // let current = this.head;
        // let pre = null;
        // for (let i = 0; i < index; i++) {
        //   pre = current;
        //   current = current.next;
        // }
        let pre = this.getElementAt(index - 1);
        current = pre.next;
        pre.next = current.next;
        current.next = null;
      }
      this.count--;
      return current.element;
    } else {
      return undefined;
    }
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
      return current;
    }
    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      let node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let pre = this.getElementAt(index - 1);
        node.next = pre.next;
        pre.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (current.element === element) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  remove(element) {
    //   可以想办法先拿到index，再通过removeAt方法删除元素
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  clear() {
    this.head = undefined;
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = this.head.element;
    let current = this.head.next;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
