// 给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵

/**
 * https://leetcode.cn/problems/spiral-matrix-ii/
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = function (n) {
  if (n < 1) return []
  if (n === 1) return [[1]]
  const rst = new Array(n).fill([])
  let top = 0, bottom = n - 1, left = 0, right = n - 1, cur = 1

  while (top <= bottom && left <= right) {
    // 走横向
    for (let j = left; j <= right; j++) {
      rst[top][j] = cur++
    }
    // 走纵向
    for (let i = top + 1; i <= bottom; i++) {
      rst[i][right] = cur++
    }

    if (top < bottom && left < right) {
      // 走反横向
      for (let j = right - 1; j > left; j--) {
        rst[bottom][j] = cur++
      }

      // 走反纵向
      for (let i = bottom; i > top; i--) {
        rst[i][left] = cur++
      }
    } [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
  }
  return rst
}

console.log(generateMatrix(3))
