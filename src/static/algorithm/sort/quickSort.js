/**
 * 快排：将数组一步步分解为左（小）中 右（大），这样分到最小的时候就合并变成了左 右都进行了排序，再合并。
 * @param {number[]} arr 
 * @returns {number[]}
 */
const quickSort = arr => {
  if (arr.length <= 1) return arr
  const left = [], right = [], mid = arr.pop()
  arr.forEach(num => {
    if (num > mid) {
      right.push(num)
    } else {
      left.push(num)
    }
  })

  return quickSort(left).concat(mid, quickSort(right))
}
// console.log(quickSort([1,5,4,3,2]))
