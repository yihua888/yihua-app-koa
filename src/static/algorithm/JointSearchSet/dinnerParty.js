/**
 * HW0-phf
 * 输入一个二维数组，0代表通过，1代表障碍，2代表人，3代表餐厅，问这些人可以选择几个餐厅聚餐
 */
{
  /**
   * @param {number[][]} arr 
   * @returns {number}
   */
  const dinnerParty = arr => {
    const row = arr.length
    if (row === 0) return 0
    const col = arr[0].length
    if (col === 0) return 0
    const parents = new Array(col * row).fill(0).map((v, i) => i)

    const find = p => {
      p !== parents[p] && (parents[p] = find(parents[p]))
      return parents[p]
    }

    const union = (p1, p2) => {
      p1 = find(p1)
      p2 = find(p2)
      p1 !== p2 && (parents[p1] = p2)
    }

    const unionCondition = num => {
      return num === 0 || num === 2 || num === 3
    }

    const pArr = []
    const cArr = []

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (arr[i][j] === 2) {
          pArr.push(i * col + j)
        } else if (arr[i][j] === 3) {
          cArr.push(i * col + j)
        }
        if (unionCondition(arr[i][j])) {
          i < row - 1 && unionCondition(arr[i + 1][j]) && union(i * col + j, (i + 1) * col + j)
          j < col - 1 && unionCondition(arr[i][j + 1]) && union(i * col + j, i * col + j + 1)
        }
      }
    }

    const isUnicom = (p1, p2) => {
      return find(p1) === find(p2)
    }

    const plast = pArr.pop()
    let flag = true
    pArr.some(p => {
      if (!isUnicom(p, plast)) {
        flag = false
        return true
      }
    })

    if (!flag) return 0

    let conunt = 0
    cArr.forEach(c => {
      if (isUnicom(c, plast)) {
        conunt++
      }
    })

    return conunt
  }

  const arr = [
    [2, 0, 1, 0, 3],
    [0, 0, 1, 1, 1],
    [1, 0, 0, 0, 2],
    [3, 1, 1, 0, 0]
  ]
// console.log('---------------phf-------------')
// console.log(dinnerParty(arr))
}
