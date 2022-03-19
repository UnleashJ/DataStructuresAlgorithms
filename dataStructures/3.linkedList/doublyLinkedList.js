import { DoublyNode } from "./linkedNode.js";
import { LinkedList } from "./linkedList.js";

export class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    // 指向尾部节点
    this.tail = null;
  }

  push(element) {
    //   利用tail属性新实现
    const node = new DoublyNode(element);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = current;
    }
    this.tail = node;
    this.count++;
  }

  removeAt(index) {
    //   索引，不包含count
    if (index >= 0 && index < this.count) {
      let current = this.head;
      // 如果要删除第一个元素。直接删除
      if (index === 0) {
        if (this.count === 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.head.next.prev = null;
          this.head = this.head.next;
        }
      } else if (index === this.count - 1) {
        //   如果要移除最后一个元素，需要处理tail的指向
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        //    getElementAt利用继承（原型的方法）
        let preNode = this.getElementAt(index - 1);
        current = preNode.next;
        preNode.next = current.next;
        current.next.prev = preNode;
      }
      this.count--;
      return current.element;
    } else {
      return undefined;
    }
  }

  //   在某个位置插入某个元素
  insert(element, index) {
    //   校验index是否符合要求
    if (index >= 0 && index <= this.count) {
      let node = new Node(element);
      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          this.head.prev = node;
          node.next = this.head;
          this.head = node;
        }
      } else if (index === this.count) {
        //   往最后面插入
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      } else {
        let preNode = this.getElementAt(index - 1);
        node.next = preNode.next;
        preNode.next = node;
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

  getTail() {
    return this.tail;
  }

  clear() {
    super.clear();
    this.tail = undefined;
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
