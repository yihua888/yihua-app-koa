/**
 * 岛屿数量:https://leetcode.cn/problems/number-of-islands/solution/dao-yu-shu-liang-by-leetcode/
 * @param {string[][]} grid 
 * @returns 
 */
const numIslands = grid => {
  const row = grid.length
  if (row === 0) return 0
  const col = grid[0].length
  if (col === 0) return 0
  // 映射
  const parents = new Array(col * row).fill(0).map((v, i) => i)

  const find = (p) => {
    // 如果当前的位置和所在下标不一样表示已经被联通，则需要更新其联通
    p !== parents[p] && (parents[p] = find(parents[p]))
    return parents[p]
  }

  /**
   * 把p1连到p2所在岛屿
   * @param {number} p1 
   * @param {number} p2 
   */
  const union = (p1, p2) => {
    p1 = find(p1)
    p2 = find(p2)
    p1 !== p2 && (parents[p1] = p2)
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === '1') {
        i < row - 1 && grid[i + 1][j] === '1' && union((i + 1) * col + j, i * col + j)
        j < col - 1 && grid[i][j + 1] === '1' && union(i * col + j + 1, i * col + j)
      } else {
        parents[i * col + j] = false
      }
    }
  }
  return parents.filter((v, i) => v === i).length
}

const grid = [['1', '1', '1'], ['0', '1', '0'], ['1', '1', '1']]
// console.log(numIslands(grid))
