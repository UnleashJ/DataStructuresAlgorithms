// 构建自己的集合类
export class Set {
  constructor() {
    this.items = {};
  }

  has(element) {
    // in为true,表示对象在原型链上是否有特定属性
    // return element in this.items

    // hasOwnProperty对象是否包含某属性（不包含继承的属性）
    /* 我们可以使用this.items.hasownproperty(element)，但不是所有的对象都继承了Object.prototype，继承了
        Object.prototype的对象上的hasownproperty也可能被重写覆盖，因为下面这种写法最安全 */
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  add(element) {
    if (this.has(element)) {
      return false;
    }
    this.items[element] = element;
    return true;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  //返回一个包含集合中所有值（元素）的数组
  values() {
    // Object.values()返回一个包含给定对象所有属性值的数组（ES2017新增方法）（只能用在现代浏览器中）
    // return Object.values(this.items)
    let values = [];
    for (let key in this.items) {
      if (Object.hasOwnProperty.call(this.items, key)) {
        values.push(key);
      }
    }
    return values;
  }

  // 并集运算（纯函数：不会修改当前的实例和参数，没有副作用的方法或函数）
  union(otherSet) {
    let unionSet = new Set();
    this.values().forEach((item) => unionSet.add(item));
    otherSet.values().forEach((item) => unionSet.add(item));
    return unionSet;
  }

  //交易运算
  intersection(otherSet) {
    let intersectionSet = new Set();
    for (const key in this.items) {
      if (otherSet.has(key)) {
        intersectionSet.add(key);
      }
    }
    return intersectionSet;
  }

  //差集，集合存在于A但不存在于B中A-B（注意与B-A的不同）
  difference(otherSet) {
    let differenceSet = new Set();
    for (const key in this.items) {
      if (!otherSet.has(key)) {
        differenceSet.add(key);
      }
    }
    return differenceSet;
  }

  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = this.values().every((value) => {
      if (!otherSet.has(value)) {
        return false;
      }
      return true;
    });
    return isSubset;
  }
}
