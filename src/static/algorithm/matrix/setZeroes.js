// 矩阵置零
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
  const cols = []
  const rows = []
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        cols.push(j)
        rows.push(i)
      }
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    cols.forEach(col => {
      matrix[i][col] = 0
    })
  }

  for (let j = 0; j < matrix[0].length; j++) {
    rows.forEach(row => {
      matrix[row][j] = 0
    })
  }
}

const testData = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
// console.time('0')
// setZeroes(testData)
// console.timeEnd('0')

// console.log(testData)

// 矩阵置零
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes1 = function (matrix) {
  const setZero = (row, col) => {
    for (let i = 0; i < matrix.length; i++) {
      if (i <= row) {
        matrix[i][col] = 0
      } else if (!Object.is(0, matrix[i][col])) {
        matrix[i][col] = -0
      }
    }

    for (let j = 0; j < matrix[0].length; j++) {
      if (j <= col) {
        matrix[row][j] = 0
      } else if (!Object.is(0, matrix[row][j])) {
        matrix[row][j] = -0
      }
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (Object.is(matrix[i][j], 0)) {
        // 将已经不能访问的置为0，能访问的不为0的置为-0
        setZero(i, j)
      } else if (Object.is(matrix[i][j], -0)) {
        matrix[i][j] = 0
      }
    }
  }
}
// const testData1 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// console.time('1')
// setZeroes1(testData1)
// console.timeEnd('1')
// console.log(testData1)
