// 利用数组实现栈，方法复杂度O(n)

class StackArray {
  constructor() {
    this.items = [];
  }

  push(...elements) {
    for (const element of elements) {
      this.items.push(element);
    }
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    // this.items = [];
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  size() {
    return this.items.length;
  }
}
