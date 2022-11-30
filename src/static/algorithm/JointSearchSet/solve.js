/**
 * @link https://leetcode.cn/problems/surrounded-regions/submissions/
 * @param {character[][]} board
 * @return {void}
 */
const solve = board => {
  const row = board.length
  if (row <= 2) return board
  const col = board[0].length
  if (col <= 2) return board
  // 映射
  const parents = new Array(col * row).fill(0).map((v, i) => i)

  const find = p => {
    p !== parents[p] && (parents[p] = find(parents[p]))
    return parents[p]
  }

  const union = (p1, p2) => {
    p1 = find(p1)
    p2 = find(p2)
    p1 !== p2 && (parents[p1] = parents[p2])
  }

  const isConnected = (p1, p2) => find(p1) === find(p2)

  const flag = col * row
  parents.push(col * row)

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === 'O') {
        if (i === 0 || j === 0 || i === row - 1 || j === col - 1) {
          union(i * col + j, flag)
          i === 0 && board[i + 1][j] === 'O' && union(i * col + j, (i + 1) * col + j)
          j === 0 && board[i][j + 1] === 'O' && union(i * col + j, i * col + j + 1)
        } else {
          i < row - 1 && board[i + 1][j] === 'O' && union(i * col + j, (i + 1) * col + j)
          j < col - 1 && board[i][j + 1] === 'O' && union(i * col + j, i * col + j + 1)
        }
      }
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === 'O' && !isConnected(i * col + j, flag)) {
        board[i][j] = 'X'
      }
    }
  }
}
const board = [["O"]]
solve(board)
console.log(board)
