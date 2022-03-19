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
