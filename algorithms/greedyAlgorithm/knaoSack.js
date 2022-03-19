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