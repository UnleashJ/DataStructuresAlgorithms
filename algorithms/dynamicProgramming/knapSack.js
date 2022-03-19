// 背包问题
function knapSack(capacity, weights, values) {
  /*  
        capacity背包容量
        weights各物品重量数组
        values各物品价值数组
    */
  let n = weights.length; //物品数量
  let dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = []; //初始化dp二位数组
  }

  // 求dp[i][j]
  for (let i = 0; i <= n; i++) {
    //前i件物品
    for (let j = 0; j <= capacity; j++) {
      //背包容量
      if (i === 0 || j === 0) {
        //考虑0件物品或者背包能装0，此时价值为0
        dp[i][j] = 0;
      } else {
        //注意：weights与values下标从0开始，所以是第i件物品的价值和重量下标是i-1
        if (weights[i - 1] > j) {
          //   此时第i件物品重量大于背包载重，i必没装
          dp[i][j] = dp[i - 1][j];
        } else {
          let a = dp[i - 1][j];
          let b = dp[i - 1][j - weights[i - 1]] + values[i - 1];
          dp[i][j] = a > b ? a : b;
        }
      }
    }
  }
  findValues(dp, capacity, weights, values, n);
  return dp[n][capacity];
}

// 递归版本
function mianRecursion(capacity, weights, values) {
  let n = weights.length; //物品数量
  let result = knapSackWithRecursion(capacity, weights, values, n);
  return result;
}

function knapSackWithRecursion(capacity, weights, values, n) {
  if (n === 0 || capacity === 0) {
    return 0;
  }
  if (weights[n - 1] > capacity) {
    return knapSackWithRecursion(capacity, weights, values, n - 1);
  }
  const a =
    values[n - 1] +
    knapSackWithRecursion(capacity - weights[n - 1], weights, values, n - 1);
  const b = knapSackWithRecursion(capacity, weights, values, n - 1);
  let result = a > b ? a : b;
  return result;
}

function findValues(dp, capacity, weights, values, n) {
  let i = n;
  let j = capacity;
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      // i装进去了
      console.log(`${i}:weight-${weights[i - 1]};value-${values[i - 1]}`);
      j -= weights[i - 1]; //背包此时容量应该是原容量减去当前物品重量
      i--;
    } else {
      // i没装进去，容量j不变，前i-1参与
      i--;
    }
  }
}

// 找到最大价值时的实际物品

let weights = [2, 3, 4, 5, 6, 7, 8, 9];
let values = [3, 4, 5, 6, 7, 8, 9, 10];
let capacity = 30;
console.log("背包问题最大容量");
// console.log(knapSack(capacity, weights, values));
console.log(mianRecursion(capacity, weights, values));
