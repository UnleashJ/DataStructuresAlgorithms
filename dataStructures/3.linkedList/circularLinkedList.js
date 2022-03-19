import { LinkedList } from "./linkedList.js";
import { Node } from "./linkedNode.js";
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
