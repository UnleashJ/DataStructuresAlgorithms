function lcs(str1, str2) {
  let m = str1.length;
  let n = str2.length;

  let l = [];

  for (let i = 0; i <= m; i++) {
    l[i] = [];
    for (let j = 0; j <= n; j++) {
      l[i][j] = 0;
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (str1[i - 1] === str2[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
      } else {
        let a = l[i - 1][j];
        let b = l[i][j - 1];
        l[i][j] = a > b ? a : b;
      }
    }
  }
  findIndex(l, str1, str2, m, n)
  return l;
}

function findIndex(l, str1, str2, m, n) {
  let i = m;
  let j = n;
  let answer = "";
  while (i > 0 && j > 0) {
    if (l[i][j] === l[i - 1][j - 1] + 1) {
        console.log(i,j)
      answer = str1[i - 1] + answer;
      i--;
      j--;
    } else if (l[i][j] === l[i][j - 1]) {
        // str1前i个与str2前j-1个
      i--;
    } else {//l[i][j] === l[i-1][j]
      j--;
    }
  }
  console.log(answer);
}


let str1 = 'acbaed'
let str2 = 'abcadf'
console.log(lcs(str1,str2))
