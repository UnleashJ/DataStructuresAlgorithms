// 最小堆
import { Compare, defaultCompare, swap } from "../../utils/index.js";

export class MaxHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  getLeftIndex(index) {
    return 2 * index + 1;
  }

  getRightIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value);
      // 上移新值，直到他的父节点小于这个插入的值
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  //插入新值之后的上移操作
  siftUp(index) {
    let parentIndex = this.getParentIndex(index);
    // 新值大于其父节点的值，需要不断的向上操作互换（迭代）
    if (
      index > 0 &&
      this.compareFn(this.heap[index], this.heap[parentIndex]) ===
        Compare.BIGGER_THAN
    ) {
      swap(this.heap, index, parentIndex);
      this.siftUp(parentIndex)
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  //移除最大值
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    let removeValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    //   下移操作
    this.siftDown(0);
    return removeValue;
  }
  //移除最大值之后的下移操作
  siftDown(index) {
    let element = index;
    let size = this.size();
    let leftIndex = this.getLeftIndex(index);
    let rightIndex = this.getRightIndex(index);

    // 比左子节点的值小，则调整
    if (
      leftIndex < size &&
      this.compareFn(this.heap[element], this.heap[leftIndex]) ===
        Compare.LESS_THAN
    ) {
      // 交换位置index值
      element = leftIndex;
    }
    // 再与右侧子节点比较（此时实际上可能是左侧子节点与右侧子节点比较，因为上面可能交换了一次。
    // 即若左右子节点都比父节点大，与更大的那个交换，这样才满足最小堆的条件）
    if (
      rightIndex < size &&
      this.compareFn(this.heap[element], this.heap[rightIndex]) ===
        Compare.LESS_THAN
    ) {
      element = rightIndex;
    }
    if (element !== index) {
      swap(this.heap, element, index);
      this.siftDown(element);
    }
  }
}
