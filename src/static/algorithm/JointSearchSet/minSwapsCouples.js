/**
 * n 对情侣坐在连续排列的 2n 个座位上，想要牵到对方的手。
 * 人和座位由一个整数数组 row 表示，其中 row[i] 是坐在第 i 个座位上的人的 ID。
 * 情侣们按顺序编号，第一对是 (0, 1)，第二对是 (2, 3)，以此类推，最后一对是 (2n-2, 2n-1)。
 * 返回 最少交换座位的次数，以便每对情侣可以并肩坐在一起。 每次交换可选择任意两人，让他们站起来交换座位。
 * https://leetcode.cn/problems/couples-holding-hands
 */
// /**
//  * @param {number[]} row 
//  */
// const minSwapsCouples = function (row) {
//     const len = row.length
//     const posMap = new Array(len + 1)
//     row.forEach((v, k) => { posMap[v] = k })
//     let times = 0
//     for (let i = 0; i < len; i += 2) {
//         let lover = row[i] ^ 1
//         if (row[i + 1] === lover) continue
//         let next = row[i + 1]
//         times++
//         [row[i + 1], row[posMap[lover]]] = [row[posMap[lover]], row[i + 1]]
//         [posMap[lover], posMap[next]] = [posMap[next], posMap[lover]]
//     }
//     return times
// }
// console.log(minSwapsCouples([2, 7, 5, 4, 3, 1 , 6 ,0]))

/**
 * @param {number[]} row 
 */
const minSwapsCouples = function (row) {
  const len = row.length
  const tot = len >> 1
  const f = new Array(tot).fill(0).map((v, i) => i)

  const getf = (x) => {
    x !== f[x] && (f[x] = getf(f[x]))
    return f[x]
  }

  const add = (x, y) => {
    f[getf(x)] = getf(y)
  }

  for (let i = 0; i < len; i += 2) {
    const l = row[i] >> 1
    const r = (row[i] + 1) >> 1
    add(l, r)
  }

  const map = new Map()
  for (let i = 0; i < tot; i++) {
    const fx = getf(i)
    if (map.has(fx)) {
      map.set(fx, map.get(fx) + 1)
    } else {
      map.set(fx, 1)
    }
  }

  let times = 0
  for (const [f, sz] of map.entries()) {
    times += sz - 1
  }

  return times
}

// console.log(minSwapsCouples([2, 7, 5, 4, 3, 1, 6, 0]))
