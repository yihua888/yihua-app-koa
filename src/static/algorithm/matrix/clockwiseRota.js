/**
 * @param {number[][]} arr 
 */
const clockwiseRota = arr => {
  const n = arr.length
  // 水平翻转
  for (let i = 0; i < n >> 1; i++) {
    for (let j = 0; j < n; j++) { [arr[i][j], arr[n - i - 1][j]] = [arr[n - i - 1][j], arr[i][j]]
    }
  }
  // 对角线翻转
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) { [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]]
    }
  }
  return arr
}
// console.log(clockwiseRota([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
