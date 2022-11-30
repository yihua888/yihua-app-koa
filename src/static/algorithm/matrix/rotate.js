/**
 * @param {number[][]} arr 
 * @returns {number[][]}
 */
const rotate = arr => {
  if (!arr.length) return []
  const rst = []
  for (let i = 0; i < arr[0].length; i++) {
    const temp = []
    for (let j = 0; j < arr.length; j++) {
      temp.push(arr[j][arr[0].length - 1 - i])
    }
    rst.push(temp)
  }
  return rst
}

/**
 * @param {number[][]} matrix 
 * @returns {number[]}
 */
const printMatrix = matrix => {
  if (matrix.length < 1) return []
  const rst = []
  while (matrix.length) {
    for (let i = 0; i < matrix[0].length; i++) {
      rst.push(matrix[0][i])
    }
    // 当前层取完，可以去除
    matrix.splice(0, 1)
    // 使用魔法函数，进行顺时针旋转
    matrix = rotate(matrix)
  }
  return rst
}
// console.log(printMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
