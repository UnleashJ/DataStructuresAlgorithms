// 计算一个数的阶乘

// 迭代计算
"use strict" 

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
    // console.trace()
    if(number===1||number===0){
        return 1;
    }
    return number*factorial(number-1)
}

function factorial2(n, total) {
    "use strict" 
    if (n === 1) return total;
    return factorial2(n - 1, n * total);
  }