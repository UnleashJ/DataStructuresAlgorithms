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


// 创建散列函数
export function loseloseHashCode(key){
    let keyStr = defaultToString(key);
    let hash = 0;
    for (let i = 0; i < keyStr.length; i++) {
        hash += keyStr.charCodeAt(i);
    }
    return hash%37
}



// 默认比较函数
export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
  };
  
export function defaultCompare(a, b) {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


export function swap(array,a,b){
    let tmp = array[a];
    array[a] = array[b]
    array[b] = tmp
}

