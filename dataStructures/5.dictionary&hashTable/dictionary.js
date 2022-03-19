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


export class ValuePair {
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
    toString() {
      return `[#${this.key}]:[${this.value}]`;
    }
  }