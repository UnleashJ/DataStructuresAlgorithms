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