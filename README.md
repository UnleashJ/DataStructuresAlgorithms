# JavaScript算法与数据结构

## 栈

后进先出 LIFO

| 方法     | 描述                                    |
| -------- | --------------------------------------- |
| push     | 添加一个或者几个新元素到栈顶            |
| pop      | 移除栈顶元素，并返回该元素              |
| peek     | 返回栈顶元素，不会对栈进行任何操作      |
| isEmpty  | 栈里没有任何元素返回true，否则返回false |
| clear    | 清除栈里的所有元素                      |
| size     | 返回栈里的元素个数                      |
| toString | 将栈内元素转换为字符串，逗号分割        |

### 利用数组实现栈

用一个数组作为存储元素的容器，数组的元素就是栈的元素

```js
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

```



### 利用对象实现栈

用对象作为存储栈元素的容器，属性为顺序增长的数字，值作为元素，使得元素按顺序排列。

```js
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

```



### 利用栈的算法解决问题

#### 十进制转换二进制

```js
// 十进制整数转二进制
// decNumber十进制数
function decimalToBinary(decNumber) {
    let remStack = new StackObject();
    // 避免直接操作decNumber
    let number = decNumber;
    let result = "";

    // Math.floor(n) 小于等于n的最大整数
    while (number > 0) {
        let rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }
    while(!remStack.isEmpty()){
        result += remStack.pop().toString();
    }
    return result;
}

console.log(10,decimalToBinary(10));
console.log(8,decimalToBinary(8));
console.log(100,decimalToBinary(100));
console.log(34,decimalToBinary(34));
console.log(56,decimalToBinary(56));
```

#### 十进制转换任意进制

```js
// 十进制转2~36任意进制
function baseConverter(decNumber, base) {
    const digist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let remStack = new StackObject();
    let number = decNumber;
    let result = "";
    if (!(2 <= base && 36 >= base)) {
        return '';
    }
    while(number>0){
        let rem = Math.floor(number%base)
        remStack.push(rem)
        number = Math.floor(number/base)
    }

    while(!remStack.isEmpty()){
        result += digist[remStack.pop()];
    }
    return result;
}

console.log(baseConverter(100345,2))
console.log(baseConverter(100345,8))
console.log(baseConverter(100345,16))
console.log(baseConverter(100345,35))
```



#### 平衡括号

```js
function balancedSymbols(symbolString) {
    let result = true;
    let symbolStack = new StackObject();
    const starts = "([{";
    const ends = ")]}";
    for (let i = 0; i < symbolString.length; i++) {
        if (starts.indexOf(symbolString[i]) >= 0) {
            // 当前符号是开始标签
            symbolStack.push(symbolString[i]);
        } else if (symbolStack.isEmpty()) {
            result = false;
            break;
        } else {
            // 当前符号是结束标签且栈不是空
            let symbol = symbolStack.pop();
            // 栈顶符号与当前符号在开始与结束符号集中的序号一样
            if (!(starts.indexOf(symbol) === ends.indexOf(symbolString[i]))) {
                result = false;
                break;
            }
        }
    }
    // 必须保证栈是空的，不然后面的例子也会返回true{{{(((}}}
    return result && symbolStack.isEmpty();
}

console.log("{([])}", balancedSymbols("{([])}")); // true
console.log("{{([][])}()}", balancedSymbols("{{([][])}()}")); // true
console.log("[{()]", balancedSymbols("[{()]")); // false
console.log("{{([)[])}()}", balancedSymbols("{{([)[])}()}")); // false
```



## 队列与双端队列

先进先出 FIFO

### 对象实现队列

键为数字，值作为元素，使得元素按顺序排列。

| 方法     | 描述                                   |
| -------- | -------------------------------------- |
| enqueue  | 队尾添加一个或多个元素                 |
| dequeue  | 删除队列第一个元素（出口元素），并返回 |
| peek     | 返回队列第一个元素（出口元素）         |
| isEmpty  | 判断是否为空                           |
| size     | 返回队列的元素个数                     |
| clear    | 清空队列元素                           |
| toString | 将队列内元素转换为字符串，逗号分割     |

```js
class Queue{
    constructor(){
        // 记录队列最大序号
        this.count =0;
        // 记录队列最小序号
        this.lowestcount = 0;
        this.items = {};
    }

    enqueue(...elements){
        for (const element of elements) {
            this.items[this.count] = element
            this.count++;      
        }
    }

    dequeue(){
        if(this.isEmpty()){
            return ''
        }
        let result = this.items[this.lowestcount]
        delete this.items[this.lowestcount];
        this.lowestcount++
        return result
    }

    peek(){
        return this.items[this.lowestcount]
    }

    isEmpty(){
        return this.size() === 0;
    }

    size(){
        return this.count-this.lowestcount;
    }

    clear(){
        this.count =0;
        this.lowestcount=0;
        this.items={};
    }

    toString(){
        if(this.isEmpty()){
            return '';
        }
        let queueString = `${this.items[this.lowestcount]}`
        for (let index = this.lowestcount+1; index < this.count; index++) {
            queueString = `${queueString},${this.items[index]}`
        }
        return queueString;
    }
}
```

### 对象实现双端队列

1. 允许同时从前端和后端添加和移除元素的特殊队列。

2. 等同于撤销的概念

3. 同事遵循了先进先出和后进先出的原则，是结合了队列和栈的一种数据结构。

| 方法        | 描述                               |
| ----------- | ---------------------------------- |
| addFrount   | 双端队列前端添加一个元素           |
| addBack     | 双端队列后端添加一个元素           |
| removeFront | 双端队列移除第一个元素             |
| removeBack  | 双端队列移除最后一个元素           |
| peekFront   | 双端队列返回第一个元素             |
| peekBack    | 双端队列返回最后一个元素           |
| isEmpty     | 判断是否为空                       |
| size        | 返回队列的元素个数                 |
| clear       | 清空队列元素                       |
| toString    | 将队列内元素转换为字符串，逗号分割 |

```js
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

```



### 实例1：击鼓传花-拍7-循环队列

```js
function hotPotato(elementList,num){
    let queue = new Queue();
    // 淘汰者名单
    let eliminateList = [];
    for (let i = 0; i < elementList.length; i++) {
        queue.enqueue(elementList[i]);
    }

    while(queue.size()>1){
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminateList.push(queue.dequeue());
    }

    return {
        eliminate:eliminateList,
        winner:queue.dequeue()
    }
}

const elementList = ['John','Jack','Camila','Ingrid','Carl']
let result = hotPotato(elementList,9)
result.eliminate.forEach((item)=>{
    console.log(`${item} 被淘汰`)
})
console.log(`胜利者是${result.winner}`)
```



### 实例2：回文算法（双端队列）

一个字符串，正着读，倒着读是一样的（忽略大小写），如：asdsa，123321，rtyuytr

```js
function palindromeChecker(aString){
    if(aString===undefined||aString===null||aString===''){
        return false
    }

    let lowerString = aString.toLocaleLowerCase();
    let deque = new Deque();
    let isEqual = true
    for (const char of lowerString) {
        deque.addBack(char);
    }

    while(deque.size()>1){
        let firstChar = deque.removeFront();
        let lastChar = deque.removeBack();
        if(firstChar !== lastChar){
            isEqual = false;
        }
    }

    return isEqual;
}

console.log(palindromeChecker('21312'))
```



## 链表

数组与链表：

1. 大多数语言中数组的大小是固定的，且往中间插入或者删除元素的成本较高，因为需要移动元素。
2. 链表中的元素在内存中不是连续放置的（每一个节点都是一个对象），操作元素比较方便，添加或删除元素的时候不需要移动其他的元素。
3. 在数组中可以访问任意位置的元素，在链表中需要从头开始迭代链表直到找到所需要的元素。

### 实现链表数据结构

| 方法                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| push(element)         | 向链表尾部插入一个元素                                       |
| insert(element,index) | 向链表的特定位置插入一个新元素，插入成功返回true             |
| getElementAt(index)   | 获取特定位置的节点，若不存在返回undefined                    |
| remove(element)       | 移除一个元素，并返回该元素                                   |
| indexOf(element)      | 返回元素在链表中的索引，如果没有返回-1                       |
| removeAt(index)       | 从链表的特定位置移除一个元素，并返回该元素，若没有返回undefined |
| getHead               | 获取头元素                                                   |
| isEmpty               | 判断连目标是否为空，为空返回true                             |
| size                  | 返回链表中的元素个数                                         |
| toString              | 输出元素值，逗号分割                                         |



#### Node 节点类

```js
class Node {
  constructor(element, next = undefined) {
    (this.element = element), (this.next = next);
  }
}
```

#### LinkedList链表类

```js
class LinkedList {
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
      current = this.head;
      while (current.next) {
        current = current.next;
      }
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
    if (index >= 0 && index < this.count) {
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

```



### 双向链表

#### 节点类

```js
export class DoublyNode extends Node{
    constructor(element,next,prev){
        super(element,next)
        this.prev = prev
    }
}
```

#### 链表类

```js
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

```



### 循环链表

最后一个元素指向下一个元素的指针不是引用undefined而是head

```js
// 循环链表
class CircularLinkedList extends LinkedList {
    constructor() {
      super();
    }
  
    // 任意位置插入元素，要注意最后一个元素的next指针指向最新head元素
    insert(element, index) {
      if (index >= 0 && index <= this.count) {
        let node = new Node(element);
        let current = this.head;
        if (index === 0) {
          //   空链表
          if (this.head == null) {
            this.head = node;
            node.next = -this.head;
          } else {
            node.next = current;
            current = this.getElementAt(this.size()-1);
            this.head = node;
            current.next = this.head;
          }
        } else {
          //   循环队列，最后一个元素的下一个元素是head。此处没有变化
          let pre = this.getElementAt(index - 1);
          node.next = pre.next;
          pre.next = node;
        }
        this.count++;
        return true;
      }
      return false;
    }
  
    removeAt(index){
      if (index >= 0 && index < this.count) {
          let current = this.head
          if(index === 0){
              // 如果只有一个元素
              if(this.size()===1){
                  this.head = null;   
              }else{
                  current = this.head
                  let tail = this.getElementAt(this.size-1);
                  tail.next = this.head.next;
                  this.head = this.head.next;
              }
          }else{
              let pre = this.getElementAt(index-1);
              current = pre.next;
              pre.next = current.next
          }
          this.count--;
          return current
      } 
      return undefined;
    }
  }
```



### 有序链表

有序链表是指保持元素有序的链表结构。

```js
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

```



### 链表实现其他结构
可以用双向链表作为基本结构，来实现栈、队列、双端队列。

对栈来说，我们会从尾部添加元素，也会从尾部移除元素，所以用双向链表

```js
import { DoublyLinkedList } from "../linkedList/doublyLinkedList.js";

class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList();
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.removeAt(this.size() - 1);
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElementAt(this.size() - 1).element;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size();
  }
  clear() {
    this.items.clear();
  }
  toString() {
    return this.items.toString();
  }
}

```





## 集合

不允许值重复的数据结构



| 方法            | 描述                                       |
| --------------- | ------------------------------------------ |
| add(element)    | 向集合中添加某元素                         |
| delete(element) | 从集合中移除某元素                         |
| has(element)    | 集合是否包含元素，是返回true 否则返回false |
| clear()         | 清空集合                                   |
| size()          | 返回集合中元素的数量                       |
| values()        | 返回一个包含集合中所有值（元素）的数组     |



### 实现

```js
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
}

```



#### 知识点

1. in为true,表示对象在原型链上是否有特定属性
2. hasOwnProperty对象是否包含某属性（不包含继承的属性）
3. 我们可以使用this.items.hasownproperty(element)，但不是所有的对象都继承了object.prototype，继承了object.prototype的对象上的hasownproperty也可能被重写覆盖，因为下面这种写法最安全 
4. Object.keys()返回一个对象的所有属性的数组
5. 继承的可枚举属性也可以被for/in循环枚举
6. Object.values()返回一个包含给定对象所有属性值的数组







## 字典和散列表

1. 字典的存储方式：[键，值]  [key,value]

2. defaultToString函数，将key转为字符串

   ```js
   export function defaultToString(item){
       if(item===null){
           return "NULL"
       }else if(item === undefined){
           return "UNDEFINED"
       }else if(typeof ittem ==='string' || item instanceof String){
           return `${item}`;
       }
       return item.toString();
   }
   ```

3. 方法

   | 方法                | 描述                                                         |
   | ------------------- | ------------------------------------------------------------ |
   | set(key,value)      | 字典中设置键和值，没有则新增，存在则覆盖                     |
   | remove(key)         | 移除一个key                                                  |
   | hasKey(key)         | 判断一个键是否存在于字典中，返回Boolean                      |
   | get(key)            | 检索一个key对应的value                                       |
   | clear()             |                                                              |
   | size()              |                                                              |
   | isEmpty()           |                                                              |
   | keys()              | 将字典所包含的所有键名以数组的形式返回                       |
   | values()            | 将字典所包含的所有值以数组的形式返回                         |
   | keyValues()         | 将字典中所有键值对返回                                       |
   | forEach(callbackFn) | 迭代字典中所有的键值对，回调函数有两个参数：key和value。forEach方法可以在回调函数返回false时终止 |
   | toString            |                                                              |

   

### 实现一个字典数据结构

#### 定义一个键值对类

保存原始的键key和value值

```js
class ValuePair{
    constructor(key,value){
        this.key = key;
        this.value = value
    }
    toString(){
        return `[#$this.key]:[$this.value]`
    }
}
```



#### hasKey() 判断一个键是否存在于字典中

```js
hasKey(key){
    // return this.table[this.toStrFn(key)] !== null;
    return Object.hasOwnProperty.call(this.table, key);
}
```



#### set(key,value)字典中设置键和值

```js
set(key, value) {
    // key和value都不为null或者undefined
    if (key != null && value != null) {
      this.table[this.toStrFn(key)] = new ValuePair(key, value);
      return true;
    }
    return false
  }
```



#### remove(key) 字典中移除某个key

```js
remove(key) {
    if (this.hasKey(key)) {
        delete this.table[this.toStrFn(key)];
        return true;
    }
    return false;
}
```



#### keyValues(),keys(),values()

只要获得了keyValues()数组，就可以通过他们的key，value获得keys(),values()

```js
keyValues() {
    let keyValuesArray = [];
    for (const key in this.table) {
        if (this.hasKey(key)) {
            keysArray.push(this.table[this.toStrFn(key)]);
        }
    }
    return keyValuesArray;
}

keys() {
    return this.keyValues.map(item => item.key);
}

values(){
    return this.keyValues.map(item => item.value); 
}
```



#### forEach(callback)

```js
forEach(callbackFn){
    this.keyValues.every((item)=>{
        return callbackFn(item.key,item.value)
    })
}
```



####全部实现

```js
import { defaultToString } from "../../utils/index.js";


export class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  hasKey(key) {
    // return this.table[this.toStrFn(key)] !== null;
    return Object.hasOwnProperty.call(this.table, key);
  }

  set(key, value) {
    // key和value都不为null或者undefined
    if (key != null && value != null) {
      this.table[this.toStrFn(key)] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  get(key) {
    // if (this.hasKey(key)) {
    //     return this.table[this.toStrFn(key)].value
    //   }
    //   return undefined;

    let valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  keyValues() {
    let keyValuesArray = [];
    for (const key in this.table) {
      if (this.hasKey(key)) {
        keyValuesArray.push(this.table[this.toStrFn(key)]);
      }
    }
    return keyValuesArray;
  }

  keys() {
    return this.keyValues().map(item => item.key);
  }

  values(){
    return this.keyValues().map(item => item.value); 
  }

  forEach(callbackFn){
      this.keyValues.every((item)=>{
         return callbackFn(item.key,item.value)
      })
  }

  clear(){
      this.table = {}
  }

  size(){
      return Object.keys(this.table).length
  }

  isEmpty(){
      return this.size()===0
  }

  toString(){
      if(this.isEmpty()){
          return '';
      }
      let keyValuesArray = this.keyValues();
      let objString = keyValuesArray[0].toString();
      for (let i = 1; i < keyValuesArray.length; i++) {
          objString = `${objString},${keyValuesArray[i].toString()}`       
      }
      return objString;
  }
}


class ValuePair {
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
    toString() {
      return `[#${this.key}]:[${this.value}]`;
    }
  }
```





### 散列表

1. 散列算法是尽可能快地在数据结构中找到一个值

2. 散列函数，对每个键返回哈希值的函数

   1. loseloseHashCode

      ```js
      // 创建散列函数
      export function loseloseHashCode(key){
          let keyStr = defaultToString(key);
          let hash = 0;
          for (let i = 0; i < keyStr.length; i++) {
              hash += keyStr.charCodeAt(i);
          }
          return hash%37
      }
      ```

      

3. 冲突：不同的键有相同的散列值



#### 基本实现

```js
import { defaultToString } from "../../utils/index.js";
import { loseloseHashCode } from "../../utils/index.js";
import { ValuePair } from "./dictionary.js";

export class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  hashCode(key) {
    return loseloseHashCode(key);
  }

  put(key, value) {
    // key和value都不为null或者undefined
    if (key != null && value != null) {
      let hashCode = this.hashCode(key);
      this.table[hashCode] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    let hashCode = this.hashCode(key);
    let valuePair = this.table[hashCode];
    return valuePair == null ? undefined : valuePair.value;
  }

  remove(key) {
    let hashCode = this.hashCode(key);
    let valuePair = this.table[hashCode];
    if (valuePair != null) {
      delete this.table[hashCode];
      return true;
    }
    return false;
  }
}

```



#### 处理冲突的解决办法

分离链接、线性探查、双散列法（介绍前两种）

##### 分离链接

为散列表的每一个位置创建一个链表，并将元素储存在里面

```js
// hashTableSeparateChaining解决散列表中的冲突之分离链接

import { defaultToString } from "../../utils/index.js";
import { loseloseHashCode } from "../../utils/index.js";
import { ValuePair } from "./dictionary.js";
import { LinkedList } from "../3.linkedList/linkedList.js";

export class HashTableSeparateChaining解决散列表中的冲突之分离链接 {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  hashCode(key) {
    return loseloseHashCode(key);
  }

  put(key, value) {
    // key和value都不为null或者undefined
    if (key != null && value != null) {
      let hashCode = this.hashCode(key);
      if(this.table[hashCode]==null){
        this.table[hashCode] = new LinkedList();
      }
      this.table[hashCode].push(new ValuePair(key,value))
      return true;
    }
    return false;
  }

  get(key) {
    let hashCode = this.hashCode(key);
    let linkedList = this.table[hashCode];
    if(linkedList != null && !linkedList.isEmpty()){
        let current = linkedList.getHead();
        while(current!=null){
            if(current.element.key === key){
                return current.element.value
            }
            current = current.next;  
        }
    }
    return undefined
  }

  remove(key) {
    let hashCode = this.hashCode(key);
    let linkedList = this.table[hashCode];
    if (linkedList != null) {
        let current = linkedList.getHead();
        while(current!=null){
            if(current.element.key === key){
                linkedList.remove(current.element)
                if(linkedList.isEmpty()){
                    // 删除链表
                    delete this.table[hashCode]
                }
                return true
            }
            current = current.next;  
        }
    }
    return false;
  }
}

```



##### 线性探查

1. 向表中某个位置添加一个新元素时，若索引position位置已经被占用了，就尝试position+1的位置，以此类推。直到找到一个空闲的位置
2. 当从散列表中移除一个键值对的时候，不能只将其delete删除。如果我们移除了某个位置的元素，该位置就会置空。下次查找相同哈希值的其他元素时，找到该位置为空，算法若直接判断没有找到该元素，会导致错误（正确的要找的元素可能位于后面）。若算法不中断而是继续向后查找，对于没有该元素的场景又会浪费性能。线性探查删除元素有以下两种方法：
   1. 删除可以用软删除法：即没有真正的删除，而是设置一个标志位，代表他被删除了
   2. 第二种方法是删除某元素之后，将一个或多个元素移动到之前的位置。这样在查找元素时，如哈希值位置处的元素为空，可以直接返回没有找到该元素，无需向后继续查询。移动规则如下：
      1. 当前元素的哈希值小于等于被移除元素的哈希值
      2. 或者当前元素哈希值小于等于空闲实际位置removedPosition的，都可以被移动



```js
// 解决散列表中的冲突之线性探查-删除移动元素
import { defaultToString } from "../../utils/index.js";
import { loseloseHashCode } from "../../utils/index.js";
import { ValuePair } from "./dictionary.js";

export default class HashTableLinearProbing {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  hashCode(key) {
    return loseloseHashCode(key);
  }

  put(key, value) {
    // key和value都不为null或者undefined
    if (key != null && value != null) {
      let position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  get(key) {
    let position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      } else {
        let index = position + 1;
        while (this.table[index] != null && this.table[index].key !== key) {
          index++;
        }

        if (this.table[index] != null && this.table[index].key === key) {
          return this.table[index].value;
        }
      }
    }
    return undefined;
  }

  remove(key) {
    let position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        // 移动
        this.verifyRemoveSideEffect(key, position);
        return true;
      } else {
        let index = position + 1;
        while (this.table[index] != null && this.table[index].key !== key) {
          index++;
        }

        if (this.table[index] != null && this.table[index].key === key) {
          delete this.table[index];
          // 移动
          this.verifyRemoveSideEffect(key, index);
          return true;
        }
      }
    }
    return false;
  }

  //   向后查询，把hashcode小于等于被删除元素的，向前移动
  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }
}

```





## 递归

1. 递归函数 ：直接调用自身的方法或函数。能够间接调用自身的方法或函数也是递归函数

2. 基线条件：一个不再递归调用的条件，以防止无线递归

3. 调用栈（call stack）：每当一个函数被一个算法调用时，该函数就会进入调用栈的顶部

   1. 浏览器查看调用栈的行为：sources-call stack

   2. console.trace()浏览器控制台查看调用栈结果

      ```
      console.trace
      factorial @ factorial.js:16
      factorial @ factorial.js:20
      factorial @ factorial.js:20
      factorial @ factorial.js:20
      factorial @ factorial.js:20
      (anonymous) @ testFactorial.html:12
      ```

      

### 阶乘

```js
// 计算一个数的阶乘

// 迭代计算
function factorialIterative(number){
    if(number<0) return undefined
    let tatal = 1;
    for (let i = number; i > 1; i--) {
        tatal = tatal*i  
    }
    return tatal
}


// 递归计算
function factorial(number){
    console.trace()
    if(number===1||number===0){
        return 1;
    }
    return number*factorial(number-1)
}
```





### 斐波那切数列

0 1 1 2 3 5 8 13 21 34

```js
// 斐波那些数列
// 0 1 1 2 3 5 8 13 21 34

// 求位置n处的数，迭代
function fibonacciIterative(n) {
  if (n < 0) return undefined;
  if (n === 0) return 0;
  if (n === 1) return 1;
  let num1 = 0;
  let num2 = 1;
  let number = 0;
  for (let i = 2; i <= n; i++) {
    number = num1 + num2;
    num1 = num2;
    num2 = number;
  }
  return number;
}

// 递归
function fibonacci(n) {
  if (n < 0) return undefined;
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 记忆化
function fibonacciMemo(n) {
  let memo = [0, 1];
  let fibonacci = (n) => {
    console.log(memo);
    if (memo[n] != null) {
        console.log(`我记住了${n}:${memo[n]}`);
        return memo[n]
    };
    return (memo[n] = fibonacci(n - 1) + fibonacci(n - 2));
  };

  return fibonacci(n);
}

```



### 尾调用优化

#### 尾调用

指某个函数的最后一步是，调用另一个函数，**并返回它的值（即必须有return）**。

```js
function f(x){
  return g(x);
}
```

上面代码中，函数f的**最后一步**是调用函数g，这就叫尾调用。

以下两种情况，都不属于尾调用

```js
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}
```

上面代码中，情况一是调用函数g之后，还有别的操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。



尾调用不一定出现在函数尾部，只要是最后一步操作即可。

```js
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
```

上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。





#### 尾调用优化

函数调用会在内存形成一个"调用记录"，又称"调用帧"（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用记录上方，还会形成一个B的调用记录。等到B运行结束，将结果返回到A，B的调用记录才会消失。如果函数B内部还调用函数C，那就还有一个C的调用记录栈，以此类推。所有的调用记录，就形成一个调用栈（call stack）。

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015041002.png)

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了。

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f() 的调用记录，只保留 g(3) 的调用记录。

"尾调用优化"（Tail call optimization），即只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。这就是"尾调用优化"的意义。



## 树

### 二叉搜索树（BinarySearchTree）

二叉树的一种，又称有序二叉树，在左侧（包括子树）存储比父节点小的值，右侧（包括子树）存储比父节点大的值。（没有键值相等的节点）



| 方法                | 描述                               |
| ------------------- | ---------------------------------- |
| insert(key)         | 向树中插入一个新的键               |
| search(key)         | 在树中查找一个键，如果存在返回true |
| inOrderTraverse()   | 通过中序遍历方式遍历所有节点       |
| preOrderTraverse()  | 通过先序遍历方式遍历所有节点       |
| postOrderTraverse() | 通过后续遍历的方式遍历所有节点     |
| min()               | 返回树中最小的值/键                |
| max()               | 返回树中最大的值/键                |
| remove(key)         | 从树中移除某个键                   |



#### 树的节点类

```js
// 树的节点类
class Node{
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
```



#### insert(key)

1. 若二叉树的根节点为null，说明二叉树为空，此时插入的节点即为新节点
2. 若根节点不为空，将节点添加到其他位置，**新节点与根节点battle**，过程如下
   1. 若新节点小于根节点
      1. 根节点的左侧子节点为null，则新节点作为它的左侧子节点。
      2. 根节点的左侧子节点不为null，则新节点插入到根节点左侧子树中，**新节点与左侧子节点battle**（递归）
   2. 若新节点大于根节点
      1. 根节点的右侧子节点为null，则新节点作为它的右侧子节点。
      2. 根节点的右侧子节点不为null，则新节点插入到根节点右侧子树中，**新节点与右侧子节点battle**（递归）

```js
insertNode(node,key){
    let compareResult = this.compareFn(key,node.key)
    // key === node.key
    if(compareResult===Compare.EQUALS){
        throw Error('新节点键值不能与树中键值相等');
    }
    // key < node.key
    if(this.compareFn(key,node.key) === Compare.LESS_THAN){
        if(node.left == null){
            node.left = new Node(key);
        }else{
            this.insertNode(node.left,key)
        }
    }else{
        // key > node.key
        if(node.right == null){
            node.right = new Node(key);
        }else{
            this.insertNode(node.right,key)
        }
    }
}
```



#### 树的遍历

中序遍历：左 中 右，从小到大的顺序访问，所以中间的数根节点

先序遍历：中 左 右，先访问父节点，再访问后代节点，所以第一个是根节点

后序遍历：左 右 中，先访问后代节点，再访问父节点本身，所以最后一个是根节点

```js
// 中序遍历
inOrderTraverse(callBack){
    this.inOrderTraverseNode(this.root,callBack)
}
inOrderTraverseNode(node,callBack){
    if(node != null){//基线条件
        this.inOrderTraverseNode(node.left,callBack)
        callBack(node.key)
        this.inOrderTraverseNode(node.right,callBack)
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
```



#### 搜索树中的值

搜索某个特定值的步骤如下：

1. 若二叉树的根节点为null，说明查找失败，此时返回false
2. 若根节点不为空，**键值与根节点battle**，过程如下
   1. 若键值点小于根节点，**键值与左侧子节点battle**（递归）
   2. 若键值大于根节点，**键值与右侧子节点battle**（递归）
   3. 若键值等于根节点，返回true

```js
//最小值
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

//最大值
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

//搜索某个特定值
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
```



#### 删除某个节点

1. 删除叶节点（即没有子节点）
   1. 该节点赋值null即可
2. 删除只有一个子节点的节点
   1. 它的父节点，指向它的子节点
3. 删除有两个子节点的节点
   1. 用该节点右子树的最小节点的键值去更新这个节点的键值（因为要保证删除这个节点之后，这颗子树仍然符合二叉搜索树的条件，即左侧都比它小，右侧都比它他。理论上讲用左子树最大节点的键值去更新也可以）
   2. 再把右子树中的这个最小节点移除（递归）

```js
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
```



### 自平衡树

#### AVL树（平衡二叉树）

| 方法                   | 描述                                               |
| ---------------------- | -------------------------------------------------- |
| getNodeHeight(node)    | 获得节点的高度                                     |
| getBalanceFactor(node) | 获得某节点的平衡因子，右子树高度与左子树高度的差值 |
|                        |                                                    |
|                        |                                                    |

AVL树是一种自平衡二叉搜索树，任何一个子节点左右两侧子树的高度之差最多为1。添加或移除节点时，AVL树会尝试保持自平衡。



节点的高度是从节点到其任意子节点的边的最大值。getNodeHeight(node)。

- 若节点是null，则其高度为-1。
- 若节点不为null，其高度为 左右子节点的高度的最大值加一（递归）

```js
getNodeHeight(node){
    if(node == null){
        return -1//叶子节点高度返回0，null返回-1
    }
    return Math.max(this.getNodeHeight(node.left),this.getNodeHeight(node.right)) +1
}
```



平衡因子，右子树高度与左子树高度的差值，有0，-1,1时，即是平衡AVL树，若不是则需要调整平衡。

```js
getBalanceFactor(node){
    return this.getNodeHeight(node.right)-this.getNodeHeight(node.left)
}
```



##### 平衡操作

- 所谓的左旋和右旋都是以子树为原点的：如b是a的子树，那么旋转就围绕b来进行。
- 如果b是a的左子树，那么就围绕b将a向右旋转，看着就像是a直接掉下来了，掉成了b的右子树。
- 如果b是a的右子树，那么就围绕b将a向左旋转，看着就像是a直接掉下来了，掉成了b的左子树。

###### 左-左（LL）：向右单旋转进行平衡

左侧子节点高度大于右侧子节点高度（node.left.h>node.right.h），并且左侧子节点是平衡的或也是左侧重的。

获取该节点node的左节点leftNode，将该节点node的左子节点指向leftNode的右子节点。将leftNode的右子节点指向node

```js
rotationLL(node){
    let leftNode = node.left; 
    node.left = leftNode.right
    leftNode.right = node;
    return leftNode;//返回该子树现在的根节点
}
```



###### 右-右（RR）：向左单旋转进行平衡

右侧子节点高度大于左侧子节点高度(node.left.h<node.right.h)，并且右侧子节点是平衡的或也是右侧重的

```js
rotationRR(node){
    let rightNode = node.right;
    node.right = rightNode.left
    rightNode.left = node;
    return rightNode
}
```



###### 左-右（LR）：向左旋转再向右旋转

左侧子节点高度大于右侧子节点高度，并且左侧子节点的右侧偏重。先对左侧子节点进行左旋操作，这样形成左左，再对不平衡的节点进行右旋操作。

```js
rotationLR(node){
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
}
```



###### 右-左（RL）：向右旋转再向左旋转

右侧子节点高度大于左侧子节点高度，并且右侧子节点的左侧偏重。先对右侧子节点进行右旋操作，这样形成右右，再对不平衡的节点进行左旋操作。

```js
rotationRL(node){
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
}
```



##### 插入节点

```js
insert(key){
    this.root = this.insertNode(this.root,key)
}
insertNode(node,key){
    if(node == null){
        return node = new Node(key)
    }
    if(this.compareFn(key,node.key) === Compare.LESS_THAN){
        // 向左侧插入
        node.left =  this.insertNode(node.left,key)
    }else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN ){
        // 右侧插入
        node.right = this.insertNode(node.right,key)
    }
    // 树原本是平衡的，插入元素之后，变得不平衡，那么哪侧高度高，新元素就是插入到了哪一侧
    // 此操作是在某个子树变得不平衡之后马上进行的，也就是从下往上的，最后调整根节点
    let balanceFactor = this.getBalanceFactor(node);
    if(balanceFactor === 2){
        // 右侧高，新元素插入到了右侧
        if(this.compareFn(key,node.right) === Compare.LESS_THAN){
            //新节点键值小于右侧子节点键值，那么他是RL
            node = this.rotationRL(node)    
        }else{
            //新节点键值大于右侧子节点键值，那么他是RR
            node = this.rotationRR(node)    
        }
    }else if(balanceFactor === -2){
        // 左侧高，新元素插入到了左侧
        if(this.compareFn(key,node.left) === Compare.LESS_THAN){
            // 新节点键值小于左侧子节点键值，那么他是LL
            node = this.rotationLL(node) 
        }else{
            // 新节点键值大于左侧子节点键值，那么他是LR
            node = this.rotationLR(node) 
        }
    }
    return node;
}
```



#### 红黑树

1. 红黑树与AVL树对比

- AVL树适合搜索频繁但是插入和删除比较少的场景

- 红黑树适合插入和删除频繁，但是搜索比较少的场景
- 红黑树的叶子节点是null叶子节点

2. 红黑树的规则

- 树的根节点是黑的
- 所有叶节点是黑的，用null表示
- 如果一个节点是红的，那么他两个子节点是黑的
- 不能有两个相邻红节点，一个红节点不能有红的父节点和子节点
- 从给定的父节点到他的null叶子节点的所有路径包含相同数量的黑色节点



首先红黑树是不符合AVL树的平衡条件的，即每个节点的左子树和右子树的高度最多差1的二叉查找树。但是提出了为节点增加颜色，红黑是用非严格的平衡来换取增删节点时候旋转次数的降低，任何不平衡都会在三次旋转之内解决，而AVL是严格平衡树，因此在增加或者删除节点的时候，根据不同情况，旋转的次数比红黑树要多。所以红黑树的插入效率更高！！！

这里引用一下知乎上的回答：


Answer 1：
1. 如果插入一个node引起了树的不平衡，AVL和RB-Tree都是最多只需要2次旋转操作，即两者都是O(1)；但是在删除node引起树的不平衡时，最坏情况下，AVL需要维护从被删node到root这条路径上所有node的平衡性，因此需要旋转的量级O(logN)，而RB-Tree最多只需3次旋转，只需要O(1)的复杂度。
2. 其次，AVL的结构相较RB-Tree来说更为平衡，在插入和删除node更容易引起Tree的unbalance，因此在大量数据需要插入或者删除时，AVL需要rebalance的频率会更高。因此，RB-Tree在需要大量插入和删除node的场景下，效率更高。自然，由于AVL高度平衡，因此AVL的search效率更高。
3. map的实现只是折衷了两者在search、insert以及delete下的效率。总体来说，RB-tree的统计性能是高于AVL的。

Answer 2  这个总结比较好：
红黑树的 查询性能略微逊色于AVL树，因为他比avl树会稍微不平衡最多一层，也就是说红黑树的查询性能只比相同内容的avl树最多多一次比较，但是，红黑树在插入和删除上完爆avl树， avl树每次插入删除会进行大量的平衡度计算，而红黑树为了维持红黑性质所做的红黑变换和旋转的开销，相较于avl树为了维持平衡的 开销要小得多





## 二叉堆和堆排序

能高效快速的找出最大值和最小值，常被应用于优先队列、堆排序算法。

- 二叉堆是一个完全二叉树，除了最后一层叶节点外，每一层都有左右侧节点，并且最后一层的叶节点尽可能都是左侧子节点。

- 二叉堆不是最小堆就是最大堆。堆特性：所有节点都大于等于（最大堆）或小于等于（最小堆）它的子节点。

二叉堆不是二叉搜索树。二叉搜索树是左侧节点小于父节点，右侧节点大于父节点。

二叉树可以使用动态的表示方式，也就是指针，上一章使用过。第二种可以使用数组表示（完全二叉树用数组表示比较好）。使用数组访问二叉树节点，对于给定位置index的节点（使用数组第一个位置0）：

- 它的左侧子节点是2*index+1
- 它的右侧子节点是2*index+2
- 它的父节点是Math.floor((index-1)/2)

[^注：]: 有些完全二叉树用数组表示时，不使用第一个位置0，而是从位置1开始。此时对于给定index的节点，它的左子节点是2*index，右子节点是2*index+1，父节点是Math.floor(index/2)



### 最小堆

| 方法          | 描述                               |
| ------------- | ---------------------------------- |
| insert(value) | 插入一个值                         |
| extract()     | 移除最小值（最小堆），并返回这个值 |
| findMinimum() | 返回最小值（最小堆），并不会移除   |



```js
// 最小堆
import { Compare, defaultCompare, swap } from "../../utils/index.js";

export class MinHeadp {
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
    // 新值小于其父节点的值，需要不断的向上操作互换
    while (
      index > 0 &&
      this.compareFn(this.heap[index], this.heap[parentIndex]) ===
        Compare.LESS_THAN
    ) {
      swap(this.heap, index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
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

  //移除最小值
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    //将最后一个值放在数组首位，准备进行下移操作
    let removeValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    //   下移操作
    this.siftDown(0);
    return removeValue;
  }
  //移除最小值之后的下移操作
  siftDown(index) {
    let element = index;
    let size = this.size();
    let leftIndex = this.getLeftIndex(index);
    let rightIndex = this.getRightIndex(index);

    // 比左子节点的值大，则调整
    if (
      leftIndex < size &&
      this.compareFn(this.heap[element], this.heap[leftIndex]) ===
        Compare.BIGGER_THAN
    ) {
      // 交换位置index值
      element = leftIndex;
    }
    // 再与右侧子节点比较（此时实际上可能是左侧子节点与右侧子节点比较，因为上面可能交换了一次。
    // 即若左右子节点都比父节点小，与更小的那个交换，这样才满足最小堆的条件）
    if (
      rightIndex < size &&
      this.compareFn(this.heap[element], this.heap[rightIndex]) ===
        Compare.BIGGER_THAN
    ) {
      element = rightIndex;
    }
    if (element !== index) {
      swap(this.heap, element, index);
      this.siftDown(element);
    }
  }
}

```



### 最大堆

```js
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

```



### 堆排序

要实现从小到大的排序，就要建立大顶堆，即父节点比子节点都要大。

1. 初始化数组，创建大顶堆。
2. 大顶堆的创建从下往上比较，不能直接用无序数组从根节点比较，否则有的不符合大顶堆的定义。
   1. 交换根节点和倒数第一个数据，现在倒数第一个数据就是最大的。
   2. 重新建立大顶堆。
3. 因为只有 array[0] 改变，其它都符合大顶堆的定义，所以可以根节点 array[0] 重新建立。
4. 重复2、3的步骤，直到只剩根节点 array[0]，即 i=1。

![堆排序（利用最大堆升序）](https://img-blog.csdnimg.cn/20190613001742222.gif)



```js
function heapify(array, index, heapSize, compareFn) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    if (left < heapSize && compareFn(array[left], array[index]) > 0) {
        largest = left;
    }
    if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
        largest = right;
    }
    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, heapSize, compareFn);
    }
}

function buildMaxHeap(array, compareFn) {
    //   从最后一个非叶子结点开始（叶结点自然不用调整，第一个非叶子结点 arr.length/2-1
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    return array;
}

function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);
    while (heapSize > 1) {
        swap(array, 0, --heapSize);
        heapify(array, 0, heapSize, compareFn);
    }
    return array;
}
```





## 图

### 概念

图是一组由边连接的节点。

相邻顶点：

度：一个顶点的度是其相邻顶点的数量

路径：顶点的一个连续序列,ABEI。

环：

无环的：

连通：如果图中每两个顶点间都存在路径，则图是连通的。

强连通

未加权、加权



### 图的表示方法

#### 邻接矩阵

二维数据array，如果索引为i的节和索引为j的节点**相邻**，则array\[i\]\[j\] === 1，否则array\[i\]\[j\] === 0。无向图的邻接矩阵一定是对称的。

缺点：

1. 不是强连通的图如果用邻接矩阵表示，则矩阵中有很多0，浪费存储空间表示根本不存在的边，
2. 图中的顶点可能会改变，而二维矩阵不够灵活。



#### 邻接表

由图中每个顶点的相邻顶点列表所组成。可以用数组、链表、散列表来表示这种结构。

```js

import {Dictionary} from '../5.dictionary&hashTable/dictionary.js'

//  图类
export class Graph{
    constructor(isDirected=false){
        this.isDirected = isDirected;
        this.vertices = []//存储节点名字
        this.adjList = new Dictionary()//作为邻接表，顶点为键，相邻节点列表为值
    }

    // 添加节点
    addVertex(v){
        if(!this.vertices.includes(v)){
            this.vertices.push(v);
            this.adjList.set(v,[]);
        }
    }

    // 添加边，接收两个顶点作为参数
    addEdge(v,w){
        if(!this.adjList.get(v)){
            this.addVertex(v)
        }
        if(!this.adjList.get(w)){
            this.addVertex(w)
        }
        this.adjList.get(v).push(w)
        // 无向图，需再加一个
        if(!this.isDirected){
            this.adjList.get(w).push(v)
        }
    }

    getVertices(){
        return this.vertices
    }

    getAdjList(){
        return this.adjList
    }

    toString(){
        let objString = ''
        for (const vertex of this.vertices) {
            let edgeList = this.adjList.get(vertex)  
            objString+=`${vertex} -> `;
            for (let i = 0; i < edgeList.length; i++) {
                objString += edgeList[i]
            } 
            objString+='\n'
        }
        return objString
    }
 }
```



#### 关联矩阵

二维数组，行表示顶点，列表示边。



### 图的遍历

广度优先搜索和深度优先搜索。可以用来寻找特定顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否有环等等。

需要明确指出第一个被访问的顶点。

| 算法         | 数据结构     | 描述                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| 广度优先搜索 | 队列存储顶点 | 获取当前节点所有相邻节点，然后将没有访问过的依次入队列       |
| 深度优先搜索 | 栈存储顶点   | 沿着当前节点直到这条路径最后一个顶点，接着返回继续探索下一条路 |

顶点有三种状态

- 未被访问过，0
- 访问过但是没有被探索过，1
- 访问过且探索过，2



#### 广度优先搜索（BFS）

从指定的顶点开始遍历，先访问其所有的邻点，就像一次访问图的一层，先宽后深的访问顶点

##### 实现：

```js
// breadthFirstSearch广度优先搜索
import { Queue } from "../2.queue/queue.js";

// 初始化各个顶点状态
const initializeVertexState = (vertices)=>{
    let vertexState = {}
    for (let i = 0; i < vertices.length; i++) {
        vertexState[vertices[i]] = 0
    }
    return vertexState;
}

// startVertex入口节点名称
export let breadthFirstSearch = (graph,startVertex,callback)=>{
    let vertices = graph.getVertices();//获取所有顶点
    let adjList = graph.getAdjList();//各个顶点的相邻顶点列表（是一个字典）
    let vertexState = initializeVertexState(vertices);
    
    let queue = new Queue();
    queue.enqueue(startVertex);
    vertexState[startVertex] = 1;

    // 开始遍历
    while(!queue.isEmpty()){
        let u = queue.dequeue();
        let neighbors = adjList.get(u);//获取节点u的相邻节点列表
        for (let i = 0; i < neighbors.length; i++) {
            let w = neighbors[i]
            if(vertexState[w] === 0){//未方位过的节点谈价到队列中，并状态置为已被访问1
                queue.enqueue(w)
                vertexState[w] = 1 
            }
        }
        vertexState[u] = 2;//表示该节点已经探索完毕2
        if(callback){
            callback(u)
        }
    }
}


```



##### 使用BFS寻找最短路径（无权图）

给定一个图G和源顶点v，找出每个顶点到v的最短距离。

解析：对于给定顶点v，广度优先算法会优先访问所有与其具体为1的顶点，接着是距离为2的顶点，以此类推。

非加权图：

```js
// 使用BFC寻找各个节点具体源节点的最短路径
export let BFSMinDistance = (graph, vertex) => {
    let vertices = graph.getVertices(); //获取所有顶点
    let adjList = graph.getAdjList(); //各个顶点的相邻顶点列表（是一个字典）
    let vertexState = initializeVertexState(vertices);

    let queue = new Queue();
    queue.enqueue(vertex);
    vertexState[vertex] = 1;
    let distance = {};
    let predecessors = {}; //各个节点的前溯点

    for (let i = 0; i < vertices.length; i++) {
        distance[vertices[i]] = 0; //初始化各个节点的距离
        predecessors[vertices[i]] = null; //初始化各个节点的前溯点为null
    }
    // 开始遍历
    while (!queue.isEmpty()) {
        let u = queue.dequeue();
        let neighbors = adjList.get(u); //获取节点u的相邻节点列表
        for (let i = 0; i < neighbors.length; i++) {
            let w = neighbors[i];
            if (vertexState[w] === 0) {
                //未方位过的节点谈价到队列中，并状态置为已被访问1
                queue.enqueue(w);
                distance[w] = distance[u] + 1;
                predecessors[w] =   u;
                vertexState[w] = 1;
            }
        }
        vertexState[u] = 2; //表示该节点已经探索完毕2
    }
    return {
        distance,
        predecessors
    };
};
```

#### 深度优先搜索

深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径。

##### 实现

```js
export let depthFirstSearch = (graph, callback) => {
  let vertices = graph.getVertices(); //获取所有顶点
  let adjList = graph.getAdjList(); //各个顶点的相邻顶点列表（是一个字典）
  let vertexState = initializeVertexState(vertices);

  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    if (vertexState[element] === 0) {
      depthFirstSearchVisit(element, vertexState, adjList, callback);
    }
  }
};

let depthFirstSearchVisit = (u, vertexState, adjList, callback) => {
  vertexState[u] = 1;
  let neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (vertexState[w] === 0) {
      depthFirstSearchVisit(w, vertexState, adjList, callback);
    }
  }
  vertexState[u] = 2;
  if (callback) {
    callback(u);
  }
};
```



##### 应用：拓扑排序

编排一些任务的步骤和执行顺序，适用于有向无环图（DAG）

```js
export let DFS = (graph) => {
  let vertices = graph.getVertices(); //获取所有顶点
  let adjList = graph.getAdjList(); //各个顶点的相邻顶点列表（是一个字典）
  let vertexState = initializeVertexState(vertices);
  let d = {}; //各个节点的发现时间
  let f = {}; //各个节点的探索完成时间
  let p = {}; //前溯点
  let time = {
    count: 0,
  };

  for (let i = 0; i < vertices.length; i++) {
    // 初始化
    d[vertices[i]] = 0;
    f[vertices[i]] = 0;
    p[vertices[i]] = null;
  }
  for (let i = 0; i < vertices.length; i++) {
    if (vertexState[vertices[i]] === 0) {
      DFSVisit(vertices[i], vertexState, d, f, p, time,adjList);
    }
  }
  return {
      discovery:d,
      finished:f,
      predecessors:p
  }
};
let DFSVisit = (u, vertexState, d, f, p, time,adjList) => {
  d[u] = ++time.count;
  vertexState[u] = 1;
  let neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (vertexState[w] === 0) {
      p[w] = u;
      DFSVisit(w, vertexState, d, f, p, time,adjList);
    }
  }
  vertexState[u] = 2;
  f[u] = ++time.count;
};

```



### 最短路径算法

#### Dijkstra算法（迪杰斯特拉算法）

计算单个源到所有其他源的最短路径的贪心算法。

更适合加权图（有向或无向）

用邻接矩阵表示图

描述：

1. 给定一个源节点v0，先获得该节点到相邻节点的距离（不相邻的距离为无穷大），选出其中的距离最小的节点v1，并将V1节点置为已确认状态。
2. 将v1作为中间节点，可以获得v1的相邻节点及其之间距离（不包含已经确认的v0），那么v0到这些节点的距离就可以确定或更新为更小值。更新后，再选择其中距离最小的节点v2。
3. 再讲V2作为中间节点，以此类推重复上述步骤，就能获得V0到各节点的最小距离。



```js
let graph = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 2, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0],
];

function dijkstra(graph, src) {
    //src是源节点，数字代表邻接矩阵的index
    let dist = []; //存储源节点到各个几点间的距离
    let visited = []; //确定的节点
    for (let i = 0; i < graph.length; i++) {
        dist[i] = Infinity; //初始化，源节点到所有节点最大距离为无穷
        visited[i] = false; //初始化，每个节点都没有访问过
    }
    dist[src] = 0; //设置源节点到自己的距离为0
    for (let i = 1; i < graph.length - 1; i++) {
        //到倒数第二个节点，所有的距离就已经是最短距离，所以是graph.length - 1
        let minIndex = getMinDisIndex(dist, visited); //获得源节点到其他未访问过的节点的距离中最小距离的index
        visited[minIndex] = true; //设置当前过渡节点被访问过
        for (let j = 0; j < graph.length; j++) {
            // 给距离重新赋值，条件
            // 当该节点未被访问，
            // 且是过渡节点的相邻节点，
            // 且源节点到过渡节点的距离不为无穷大（感觉这一条可以省略），
            // 且通过过渡节点，源节点到该节点距离比之前小
            if (
                !visited[j] &&
                graph[minIndex][j] !== 0 &&
                dist[minIndex] !== Infinity &&
                graph[minIndex][j] + dist[minIndex] < dist[j]
            ) {
                dist[j] = graph[minIndex][j] + dist[minIndex];
            }
        }
    }
    return dist;
}

function getMinDisIndex(dist, visited) {
    let min = Infinity;
    let minIndex = -1;
    for (let i = 0; i < dist.length; i++) {
        if (visited[i] === false && dist[i] <= min) {
            min = dist[i];
            minIndex = i;
        }
    }
    return minIndex;
}

let dist = dijkstra(graph, 0);
console.log(dist);
```



#### Floyd弗洛伊德算法

动态规划算法，找到所有源到所有顶点的最短路径。

描述：

1. 首先将相邻节点之间的可能的最短距离为他们之间边的权重（后面有更小值时会更新），无边连接的节点间则为正无穷远，相同节点之间为0。
2. 将顶点0到K作为中间节点。从i到j经过K后，若距离变得更小，则更新他们（i,j）之间的距离。如此循环~

```js
 let graph = [
     [0, 2, 4, 0, 0, 0],
     [0, 0, 2, 4, 2, 0],
     [0, 0, 0, 0, 3, 0],
     [0, 0, 0, 0, 0, 2],
     [0, 0, 0, 3, 0, 2],
     [0, 0, 0, 0, 0, 0],
 ];
function floyd(graph) {
    let dist = [];
    for (let i = 0; i < graph.length; i++) {
        dist[i] = [];//二维数组里面那个也得初始化
        for (let j = 0; j < graph.length; j++) {
            if (i === j) {
                dist[i][j] = 0;
            } else if (graph[i][j] === 0) {
                dist[i][j] = Infinity;
            } else {
                dist[i][j] = graph[i][j];
            }
        }
    }

    for (let k = 0; k < graph.length; k++) {
        //k作为中间节点
        for (let i = 0; i < graph.length; i++) {
            //起点i
            for (let j = 0; j < graph.length; j++) {
                //终点j
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}

console.log(floyd(graph));
```



### 最小生成树（MST）

一个有 n 个结点的[连通图](https://baike.baidu.com/item/连通图/6460995)的生成树是原图的极小连通子图，且包含原图中的所有 n 个结点，并且有保持图连通的最少的边。常用来解决生活中的实际问题，如网络设计、桥梁建造成本最小。



#### Prim算法（普里姆算法）

求解加权无向连通图的贪心算法。与迪杰斯特拉算法类似

描述：

1. 选择第一个顶点v0，先获得该节点到相邻节点的距离（不相邻的距离为无穷大），选出其中的距离最小的节点
2. 将v1作为中间节点，可以获得v1的相邻节点及其之间距离（不包含已经确认的v0），那么v0到这些节点的距离就可以确定或更新为更小值。更新后，再选择其中距离最小的节点v2。
3. 再讲V2作为中间节点，以此类推重复上述步骤，就能获得V0到各节点的最小距离。

```js
let graph = [
    [0, 2, 4, 0, 0, 0],
    [2, 0, 2, 4, 2, 0],
    [4, 2, 0, 0, 3, 0],
    [0, 4, 0, 0, 3, 2],
    [0, 2, 3, 3, 0, 2],
    [0, 0, 0, 2, 2, 0],
];
function getMinDisIndex(dist, visited) {
    let min = Infinity;
    let minIndex = -1;
    for (let i = 0; i < dist.length; i++) {
        if (visited[i] === false && dist[i] <= min) {
            min = dist[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function prim(graph) {
    let key = []; //保存父节点到该顶点之间权重
    let visited = [];
    let parent = [];
    // 初始化
    for (let i = 0; i < graph.length; i++) {
        key[i] = Infinity;
        visited[i] = false;
    }
    key[0] = 0; //原点到自己为0
    parent[0] = -1; //原点的父节点下标为-1
    for (let i = 0; i < graph.length; i++) {
        let minIndex = getMinDisIndex(key, visited);
        visited[minIndex] = true;
        for (let j = 0; j < graph.length; j++) {
            if (
                !visited[j] &&
                graph[minIndex][j] !== 0 &&
                graph[minIndex][j] < key[j]
            ) {
                parent[j] = minIndex; //j的父节点的下标是minIndex
                key[j] = graph[minIndex][j];
            }
        }
    }
    return {
        parent,
        key,
    };
}

console.log(prim(graph));
```

#### Kruskal算法（克鲁斯卡尔算法）

一种求加权无向连通图MST的贪心算法。

描述：克鲁斯卡尔算法的基本思想是以边为主导地位，始终选择当前可用的最小边权的边（可以直接快排或者algorithm的sort）。每次选择边权最小的边链接两个端点是kruskal的规则，并实时判断两个点之间有没有间接联通（即有没有形成闭环，若形成了，这边不算）。

MST的边数一定是顶点树减1





## 排序和搜索算法

### 排序算法 

![](https://upload-images.jianshu.io/upload_images/1726554-156436f8dda59bf9.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

#### 冒泡排序

最简单但是性能最差，算法时间复杂度O(n^2)

从前往后比较所有相邻的两个项，先比较第一个和第二个，如果第一个比第二个大，则交换他们。再比较第二个和第三个，如果前一个比后一个大，则交换他们。以此类推，往后接着比较。元素项向上移动至正确的顺序。第一轮比较完成后，最大的数字会在数组末尾。那么下一轮比较可以不用比较最后一个数。



```js
// 改进，内循环中减去外循环中已跑过的轮数
function bubbleSort2(array,compareFn = defaultCompare){
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length-1-i; j++) {
            if(compareFn(array[j],array[j+1]) === Compare.BIGGER_THAN){
                swap(array,j,j+1)
            }  
        }
    }
}
```



#### 选择排序

原址比较排序算法。找到数组中的最小值并将其放在第一位，第二小值放在第二位，依次类推。

假定最小值是第一个值，下标是0。将第一个值与后面的值依次比较，若下标为n的值比当前最小值小，则最小值的下标更新为n，这样循环一次后找到最小值，将其放在第一位下标0处。次小值从第二个值，下标1开始比较，重复上述步骤，最终完成排序。

时间复杂度O(n^2)

```js
function selectSort(array, compareFn = defaultCompare) {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (compareFn(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swap(array, i, minIndex);
        }
    }
}
```



#### 插入排序

对于一个数组，可以将其理解为已经排好序的数组+待插入的数组。初始时可以认为数组第1项（下标0）为已经排好序的数组，未排好序的数组是剩余元素。从第二项（下标1）开始插入，与第一项元素做比较，若小于第一项元素，则互换位置，将其插入。再比较数组第三项（下标2），先于第二项比较若小于则换位，再与第一项比较，若小于则换位，否咋插入。依次类推，将后面几项插入。



```js
function insertSort(array, compareFn = defaultCompare) {
    for (let i = 1; i < array.length; i++) {
        let j = i;
        let temp = array[i];
        //只有当前项比已排序数组小时，才需要换位
        if (temp < array[i - 1]) {
            //j>0且待插入元素小于比较元素时，交换位置
            while (j > 0 && compareFn(temp,array[j-1]) === Compare.LESS_THAN) {
                array[j] = array[j - 1];
                j--;
            }
            array[j] = temp;
        }
    }
}
```



#### 归并排序

是一种分而治之的算法，由于是分治法，归并排序也是递归的。O(nlogn)

- 将序列中待排序数组分为若干组，每个数字为一组
- 将若干数组两两合并，保证合并后的数组是有序的。合并时候，比较两个数组的头部数组谁更小，将更小的移出推入新数组，直至将两个数组的元素全部移入新数组中。
- 重复第二步操作，直至合成一个数组，排序完成

可以将其分成两个方法，第一个方法负责将大数组分成若干小数组，并调用排序方法



递归：将一个大数组拆分为两个小数组，再将两个小数组拆分（递归）成更小的四个数组……，最小化后，然后将两个小数组按照顺序合并成大数组，再按照顺序合并成更大的数组



```js
function mergeSort(array, compareFn = defaultCompare) {
    if (array.length > 1) {
        let middle = Math.floor(array.length / 2);
        let leftArray = array.slice(0, middle);
        let rightArray = array.slice(middle, array.length);
        let l = mergeSort(leftArray, compareFn);
        let r = mergeSort(rightArray, compareFn);
        array = merge(l, r, compareFn);
    }
    return array;
}

function merge(l, r, compareFn) {
    let i = 0;
    let j = 0;
    let result = [];
    while (i < l.length && j < r.length) {
        result.push(
            compareFn(l[i], r[j]) === Compare.LESS_THAN ? l[i++] : r[j++]
        );
    }
    return result.concat(i < l.length ? l.slice(i) : r.slice(j));
}
let array = [5, 4, 3, 9, 8, 2, 1];
array = mergeSort(array);
```

时间复杂度计算方式：

[归并排序时间复杂度]: https://blog.csdn.net/crookshanks_/article/details/95355840



#### 快速排序

也采用分而治之的思想，将原始数组分为较小的数组，但没有向归并排序那样将他们分隔开

- 选定Pivot作为中心轴
- 将大于Pivot的数字放在Pivot右边，组成右序列
- 将小于Pivot的数字放在Pivot左边。组成左序列
- 分别对左右子序列重复前三步骤

自己实现的快速排序，定义了左右子数组，专门装小于和大于主元的数据（缺点：用了较多的内存去存储数据）

```js
//   这个方法新建了好几个left和right数组，空间复杂度太高
function quickSort(array, compareFn) {
    if (array.length > 1) {
        //   选择中间值作为主元
        let middleIndex = Math.floor(array.length / 2);
        let pivot = array[middleIndex]; //主元
        let left = 0;
        let right = array.length - 1;
        let leftArry = [];
        let rightArray = [];

        while (left !== middleIndex) {
            if (array[left] > pivot) {
                rightArray.push(array[left]);
            } else if (array[left] < pivot) {
                leftArry.push(array[left]);
            }
            left++;
        }
        while (right !== middleIndex) {
            if (array[right] > pivot) {
                rightArray.push(array[right]);
            } else if (array[right] < pivot) {
                leftArry.push(array[right]);
            }
            right--;
        }

        let array1 = quickSort(leftArry, compareFn);
        let array2 = quickSort(rightArray, compareFn);
        array = array1.concat(pivot, array2);
    }
    return array;
}

let array = [5, 4, 3, 9, 8, 2, 1, 10, 11, 100, 999, 97, 0, 6, 7];
array = quickSort(array);
console.log(array);
```

较好的版本（推荐），这种算法没有新建left\right数组，相较于归并排序也比较好

```js
 function quickSort(array, left, right) {
     if (array.length > 1) {
         //   选择中间值作为主元
         let middleIndex = Math.floor((left + right) / 2);
         let pivot = array[middleIndex]; //主元
         let i = left;
         let j = right;
         while (i <= j) {
             while (array[i] < pivot) {
                 // 退出循环时，在左边遇到了比配pivot大的值
                 i++;
             }
             while (array[j] > pivot) {
                 // 退出循环时，在右边遇到了比配pivot小的值
                 j--;
             }
             if (i <= j) {
                 swap(array, i, j); //交换
                 i++;
                 j--;
             }
         }
         console.log(i,j)

         if (left < i - 1) {
             quickSort(array, left, i - 1);
         }
         if (i < right) {
             quickSort(array, i, right);
         }
     }
     return array;
 }
```



#### 计数排序

是一个分布式排序。分布式排序：使用已组织好的辅助数据结构（桶），然后进行合并，得到排序好的数组（用空间换时间）。

计数排序，使用一个数组counts（桶），用来存储各个元素出现的次数，下标index代表元素，值代表次数，若未出现，则次数为0。因此计数排序用来排序整数。算法时间复杂度O(n+k)，但是需要更多的内存存放数据。



```js
function countSort(array, compareFn) {
    let counts = [];
    array.forEach((element) => {
        if (!counts[element]) {
            //一开始没有
            counts[element] = 0;
        }
        counts[element]++;
    });
    let indexSort = 0;
    counts.forEach((item, index) => {
        let count = counts[index];
        while (count > 0) {
            array[indexSort] = index;
            indexSort++;
            count--;
        }
    });
    console.log(counts)
}

let array = [5, 4, 3, 9, 8, 2, 1, 10, 11, 100, 999,1001, 97, 0, 6, 7];
countSort(array);
console.log(array);
```



#### 桶排序

桶排序也是一种分布式排序。将元素分为较小的数组，放入桶中，再使用一个简单的排序算法（插入排序）将小数组排序。最后合并成结果数组。分组装桶时，已经是一次排序，将不同范围的元素装入不同的桶中，在桶中排好序后直接合并成结果数组。

#### 基数排序



### 搜索算法

#### 顺序搜索（线性搜索）

将每一个元素与我们要找的元素进行比较，是效率最低效的一种搜索方法。

实现：略

#### 二分搜索

要求被搜索的数组已经排序，步骤如下

1. 先对数组进行排序
2. 选择数组的中间值
3. 将待搜索值与中间值进行比较，如果是待搜索值，则算法执行完毕，返回
4. 如果待搜索值小于中间值，则返回步骤2，选择左边子数组的中间值进行比较。
5. 如果待搜索值大于中间值，则返回步骤2，选择右边子数组的中间值进行比较。

```js
function binarySearch(array, searchValye) {
    // 对数组进行排序（快排）
    array = quickSort(array, 0, array.length - 1);
    return search(array, 0, array.length - 1, searchValye);
}

function search(array, low, heigh, searchValye) {
    if (low > heigh) {
        return false;
    }
    let middleIndex = Math.floor((low + heigh) / 2);
    let middleValue = array[middleIndex];
    if (middleValue === searchValye) {
        return true;
    } else if (middleValue < searchValye) {
        return search(array, middleIndex + 1, heigh, searchValye);
    } else {
        return search(array, low, middleIndex - 1, searchValye);
    }
}
```



#### 内插搜索

二分搜索检查mid位置的值，内插搜索会根据搜索的值检查数组中的不同地方。需要一个公式计算出检查值的位置position。内插搜索在数组中的值是均匀分布时心性能最好，能较快的找出待搜索值。

```js
export function interpolationSearch(
array,
 value,
 compareFn = defaultCompare,
 equalsFn = defaultEquals,
 diffFn = defaultDiff
) {
    const { length } = array;
    let low = 0;
    let high = length - 1;
    let position = -1;
    let delta = -1;
    while (
        low <= high &&
        biggerEquals(value, array[low], compareFn) &&
        lesserEquals(value, array[high], compareFn)
    ) {
        delta = diffFn(value, array[low]) / diffFn(array[high], array[low]);
        position = low + Math.floor((high - low) * delta);
        if (equalsFn(array[position], value)) {
            return position;
        }
        if (compareFn(array[position], value) === Compare.LESS_THAN) {
            low = position + 1;
        } else {
            high = position - 1;
        }
    }
    return DOES_NOT_EXIST;
}
```





## 算法设计与技巧

### 分而治之

1. 分解原问题为多个子问题，子问题之间相互独立
2. 解决子问题，用返回解决子问题的方式的递归算法。递归算法的基本情形可以用来解决子问题。
3. 组合这些子问题的解决方式，得到原问题的解。

例如二分搜索算法：

```js
function binarySearch(array, searchValye) {
    // 对数组进行排序（快排）
    array = quickSort(array, 0, array.length - 1);
    return search(array, 0, array.length - 1, searchValye);
}

function search(array, low, heigh, searchValye) {
    if (low > heigh) {
        return false;
    }
    let middleIndex = Math.floor((low + heigh) / 2);
    let middleValue = array[middleIndex];
    if (middleValue === searchValye) {
        return true;
    } else if (middleValue < searchValye) {
        return search(array, middleIndex + 1, heigh, searchValye);
    } else {
        return search(array, low, middleIndex - 1, searchValye);
    }
}
```



### 动态规划

动态规划是将问题分解成相互依赖的子问题。

1. 定义子问题
2. 实现要反复执行来解决子问题的部分
3. 识别并求解出基线条件



#### 最少硬币找零问题

要找amount元，有几种面额的货币coins[]，找出所需的最少货币数。

思考：若有[1,5,10,20]面额的货币，要找26元，可以先计算找25,20,16,6元时分别所需要的最少货币数，然后找到其中最小的，再加一就是结果。要找到25元的最少货币数可以找24,20,15,5元时分别所需要的最少货币数，然后找到其中最小的，再加一就是结果。依次类推，递归找到最小货币数。

```js
// 最少找零问题-动态规划解
function minCoinChange(coins, amount) {
    let cache = []; //用来保存各种面额找零所需要的硬币数，可以不用重复计算值。记忆化

    function makeChange(amount) {
        if (coins.indexOf(amount) !== -1) {
            return (cache[amount] = [amount]);
        }

        if (cache[amount]) {
            return cache[amount];
        }

        let minCounts = [];
        for (let i = 0; i < coins.length; i++) {
            let newAmount = amount - coins[i];
            if (newAmount > 0) {
                minCounts[i] = makeChange(newAmount).concat(coins[i]);
            }
        }
        let minCount = [];
        for (let j = 0; j < minCounts.length; j++) {
            if (!minCount.length || minCount.length > minCounts[j].length) {
                minCount = minCounts[j];
            }
        }
        return (cache[amount] = minCount);
    }

    return makeChange(amount);
}

let count = minCoinChange([1, 5, 10, 25], 40);
console.log(count);

```



#### 背包问题（0-1版本）

给定一个固定大小、能够携带重量W的背包，以及一组有价值有重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过W，且总价值V最大。

0-1版本是指只能往背包中装完整物品。与之对应的是分数背包问题，允许装入分数物品。

思考：前i件物品，装入载重j的背包中，**考虑前i件物品的情况下，能装的最大价值为dp\[i\]\[j\]**（这只是一种函数关系，这i件物品有些装了，有些没装）。有两种情况

1. 第i件物品没装进去（前面i-1怎么装的不用管），那么dp\[i\]\[j\] = dp\[i-1\]\[j\]，
2. 第i件物品装进去了，那么dp\[i\]\[j\] = dp\[i-1\]\[j-w\[i\]\] + v\[i\]

找到这两种的最大值，就是所求结果。

```text
dp[i][j] = max(dp[i−1][j], dp[i−1][j−w[i]]+v[i]) // j >= w[i]
```

再按照上面方法，考虑前i-1件商品的情况下，能拿到的最大价值，以此类推。



```js
let weights = [2, 3, 4];
let values = [3, 4, 5];
let capacity = 5;
```

| i/j  | 0    | 1    | 2    | 3    | 4    | 5    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | 0    | 0    | 0    | 0    | 0    | 0    |
| 1    | 0    | 0    | 3    | 3    | 3    | 3    |
| 2    | 0    | 0    | 3    | 4    | 4    | 7    |
| 3    | 0    | 0    | 3    | 4    | 5    | 7    |



迭代方法求解

```js
function knapSack(capacity, weights, values) {
  /*  
        capacity背包容量
        weights各物品重量数组
        values各物品价值数组
    */
  let n = weights.length; //物品数量
  let dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = []; //初始化dp二位数组
  }

  // 求dp[i][j]
  for (let i = 0; i <= n; i++) {
    //前i件物品
    for (let j = 0; j <= capacity; j++) {
      //背包容量
      if (i === 0 || j === 0) {
        //考虑0件物品或者背包能装0，此时价值为0
        dp[i][j] = 0;
      } else {
        //注意：weights与values下标从0开始，所以是第i件物品的价值和重量下标是i-1
        if (weights[i - 1] > j) {
          //   此时第i件物品重量大于背包载重，i必没装
          dp[i][j] = dp[i - 1][j];
        } else {
          let a = dp[i - 1][j];
          let b = dp[i - 1][j - weights[i - 1]] + values[i - 1];
          dp[i][j] = a > b ? a : b;
        }
      }
    }
  }
  findValues(dp, capacity, weights, values, n);
  return dp[n][capacity];
}

//找值方法
function findValues(dp, capacity, weights, values, n) {
  let i = n;
  let j = capacity;
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      // i装进去了
      console.log(`${i}:weight-${weights[i - 1]};value-${values[i - 1]}`);
      j -= weights[i - 1]; //背包此时容量应该是原容量减去当前物品重量
      i--;
    } else {
      i--;
    }
  }
}

let weights = [2, 3, 4, 5, 6, 7, 8, 9];
let values = [3, 4, 5, 6, 7, 8, 9, 10];
let capacity = 30;
```



递归方法求解（暂时无法输出都有哪些值）

```js
function knapSackWithRecursion(capacity, weights, values, n) {
  if (n === 0 || capacity === 0) {
    return 0;
  }
  if (weights[n - 1] > capacity) {
    return knapSackWithRecursion(capacity, weights, values, n - 1);
  }
  const a =
    values[n - 1] +
    knapSackWithRecursion(capacity - weights[n - 1], weights, values, n - 1);
  const b = knapSackWithRecursion(capacity, weights, values, n - 1);
  return a > b ? a : b;
}
```



#### 最长公共子序列

找出两个字符串序列的最长子序列的长度。最长子序列是指，在两个字符串序列中以相同的顺序出现，但不要求连续的字符串序列。

思考：设两个字符串str1，str2的长度为m和n，他们的最长子序列长度为L\[m\]\[n\]（代表str1前m个字母，str2前n个字母参与进来，能拿到的最长子序列为L\[m\]\[n\]），若最后一个字母相等，则

```
L[m][n] = L[m-1][n-1] + 1
```

否则

```
L[m][n] = max{L[m-1][n],L[m][n-1]}
```

```js
function lcs(str1, str2) {
  let m = str1.length;
  let n = str2.length;

  let l = [];

  for (let i = 0; i <= m; i++) {
    l[i] = [];
    for (let j = 0; j <= n; j++) {
      l[i][j] = 0;
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (str1[i - 1] === str2[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
      } else {
        let a = l[i - 1][j];
        let b = l[i][j - 1];
        l[i][j] = a > b ? a : b;
      }
    }
  }
  findIndex(l, str1, str2, m, n)
  return l;
}

function findIndex(l, str1, str2, m, n) {
  let i = m;
  let j = n;
  let answer = "";
  while (i > 0 && j > 0) {
    if (l[i][j] === l[i - 1][j - 1] + 1) {
        console.log(i,j)
      answer = str1[i - 1] + answer;
      i--;
      j--;
    } else if (l[i][j] === l[i][j - 1]) {
        // str1前i个与str2前j-1个
      i--;
    } else {//l[i][j] === l[i-1][j]
      j--;
    }
  }
  console.log(answer);
}


let str1 = 'acbaed'
let str2 = 'abcadf'
console.log(lcs(str1,str2))

```





### 贪心算法

贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优解（当前最好解），从而达到全局的最优（全局最优解）

#### 最少硬币找零问题

大部分情况下的结果是最优的，不过对于有些面额而言不是最优的。

思考：要想获得最少货币个数，尽可量多的使用面额大的硬币，这样对于一般情况下，借都是最优的。

 

```js
// 贪心算法 最少硬币找零问题
function minCoinChange(coins,amount){
    //coins硬币面额
    //amount金额 
    let totalAmount = 0
    let change = []
    for (let i=coins.length-1 ; i>=0; i--){
        let coin =  coins[i];
        while(totalAmount + coin <= amount){
            totalAmount += coin
            change.push(coin)
        }
    }
    return change;
}

// let coins = [1,5,10,25]
// console.log(minCoinChange(coins,36))//[25,10,1]

let coins = [1,3,4]
console.log(minCoinChange(coins,6))//[4,1,1]
```





#### 分数背包问题

可以装入分数的物品。

```js
// 分数背包问题--贪心算法
function knapSack(capacity,weights,values){
    // capacity容量
    // weights物品重量数组
    // values物品价值数组

    // 尽可量的优先装价值比最高的物品

    let load = 0
    let val = 0
    for (let i = 0; i < values.length; i++) {
        if(weights[i] + load <= capacity){
            val+=values[i]
            load += weights[i]
        }else{
            let p = (capacity-load)/weights[i]
            val += p*values[i]
            load += p*weights[i]
        }
    }
    console.log(val)
    console.log(load)
    return {val,load}
}

console.log(knapSack(6,[2,3,4],[3,4,5]))
```



### 回溯算法

#### 迷宫老鼠问题

```js
// 迷宫老鼠
function isSafe(maze, x, y) {
  const n = maze.length;
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true;
  }
  return false;
}

function findPath(maze, x, y, solution) {
  const n = maze.length;
  if (x === n - 1 && y === n - 1) {
    solution[x][y] = 1;
    return true;
  }
  if (isSafe(maze, x, y) === true) {
    solution[x][y] = 1;
    if (findPath(maze, x + 1, y, solution)) {
      return true;
    }
    if (findPath(maze, x, y + 1, solution)) {
      return true;
    }
    if (findPath(maze, x, y - 1, solution)) {
      return true;
    }
    if (findPath(maze, x - 1, y, solution)) {
      return true;
    }
    solution[x][y] = 0;
    return false;
  }
  return false;
}

function ratInAMaze(maze) {
  const solution = [];
  for (let i = 0; i < maze.length; i++) {
    solution[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }
  if (findPath(maze, 0, 0, solution) === true) {
    return solution;
  }
  return "NO PATH FOUND";
}

let maze = [
  [1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1],
];

console.log(ratInAMaze(maze));
 [1, 1, 0, 0, 0]
 [0, 1, 0, 0, 0]
 [1, 1, 0, 0, 0]
 [1, 0, 0, 0, 0]
 [1, 1, 1, 1, 1]

```



### 函数式编程



# LeetCode

1. 使用Set集合，可以对字符串去重

   ```js
   let set = new Set(string)
   ```

   

1. 

