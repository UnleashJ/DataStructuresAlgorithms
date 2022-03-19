// 有序链表
import { LinkedList } from "./linkedList.js";
import { Node } from "./linkedNode.js";

function defaultCompareFn(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

export class SortedLinkedList extends LinkedList {
  constructor(compareFn = defaultCompareFn) {
    super();
    this.compareFn = compareFn;
  }

  // 因为有序链表，不支持任意位置插入元素
  insert(element) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    } else {
      let index = this.getIndexNextSortedElement(element);
      return super.insert(element, index);
    }
  }

  //   传入一个元素得到它应在的位置
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.count; i++) {
      let res = this.compareFn(element, current.element);
      if (res === -1) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}
