// 双端队列
class Deque {
  constructor() {
    // 记录队列最大序号
    this.count = 0;
    // 记录队列最小序号
    this.lowestcount = 0;
    this.items = {};
  }

  addFrount(element) {
    if (this.isEmpty()) {
      this.items[this.lowestcount] = element;
      this.lowestcount++;
    } else if (this.lowestcount > 0) {
      this.lowestcount--;
      this.items[this.lowestcount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return "";
    }
    let result = this.items[this.lowestcount];
    delete this.items[this.lowestcount];
    this.lowestcount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return "";
    }
    let result = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return result;
  }

  peekFront(){
    if (this.isEmpty()) {
        return "";
      }
      return this.items[this.lowestcount];
  }

  peekBack(){
    if (this.isEmpty()) {
        return "";
      }
      return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestcount;
  }

  clear() {
    this.count = 0;
    this.lowestcount = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let queueString = `${this.items[this.lowestcount]}`;
    for (let index = this.lowestcount + 1; index < this.count; index++) {
      queueString = `${queueString},${this.items[index]}`;
    }
    return queueString;
  }
}
