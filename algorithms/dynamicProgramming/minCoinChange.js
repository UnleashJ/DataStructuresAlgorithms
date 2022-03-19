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
