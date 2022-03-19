// 斐波那些数列
// 0 1 1 2 3 5 8 13 21 34

// 求位置n处的数，迭代
function fibonacciIterative(n) {
  if (n < 0) return undefined;
  if (n === 0) return 0;
  if (n === 1) return 1;
  let num1 = 0;
  let num2 = 1;
  let number = 0;
  for (let i = 2; i <= n; i++) {
    number = num1 + num2;
    num1 = num2;
    num2 = number;
  }
  return number;
}

// 递归
function fibonacci(n) {
  if (n < 0) return undefined;
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 记忆化
function fibonacciMemo(n) {
  let memo = [0, 1];
  let fibonacci = (n) => {
    console.log(memo);
    if (memo[n] != null) {
        console.log(`我记住了${n}:${memo[n]}`);
        return memo[n]
    };
    return (memo[n] = fibonacci(n - 1) + fibonacci(n - 2));
  };

  return fibonacci(n);
}
