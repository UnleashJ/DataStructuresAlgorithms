// 使用JavaScript对象创建stack类，这样除了toString，其他方法的复杂度为O(1)

class StackObject {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(...elements) {
    for (const element of elements) {
      this.items[this.count] = element;
      this.count++;
    }
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    let result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return (this.items[this.count - 1]);
  }

  isEmpty() {
    return this.count === 0;
  }

  clear() {
    // this.items = {};
    // this.count = 0;
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  size() {
    return this.count;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objstring = this.items[0];
    // 对象默认不可迭代，所以不用forof
    for (let i = 1; i < this.count; i++) {
      objstring = `${objstring},${this.items[i]}`;
    }
    return objstring;
  }
}
