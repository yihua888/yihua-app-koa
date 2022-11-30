/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = function (matrix) {
  const row = matrix.length
  if (row < 1) return []
  const col = matrix[0].length
  if (col < 1) return []
  let top = 0, left = 0, right = col - 1, bottom = row - 1
  const rst = []
  while (bottom >= top && right >= left) {
    // 走横向
    for (let j = left; j <= right; j++) {
      rst.push(matrix[top][j])
    }
    // 走纵向
    for (let i = top + 1; i <= bottom; i++) {
      rst.push(matrix[i][right])
    }
    if (left < right && top < bottom) {
      // 走反横向
      for (let j = right - 1; j > left; j--) {
        rst.push(matrix[bottom][j])
      }
      // 走反纵向
      for (let i = bottom; i > top; i--) {
        rst.push(matrix[i][left])
      }
    } [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
  }
  return rst
}

// console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
// console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))
