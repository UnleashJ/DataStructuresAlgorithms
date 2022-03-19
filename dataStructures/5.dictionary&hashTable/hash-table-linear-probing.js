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
