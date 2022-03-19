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
