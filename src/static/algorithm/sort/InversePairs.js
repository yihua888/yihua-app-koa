/**
 * 逆序列
 * @param {number[]} nums 
 * @returns {number}
 */
const InversePairs = nums => {
  let count = 0

  /**
   * @param {number[]} left 
   * @param {number[]} right 
   * @returns {number[]}
   */
  const merge = (left, right) => {
    const res = [], leftLen = left.length, rightLen = right.length
    let leftIndex = 0, rightIndex = 0
    while(leftIndex < leftLen && rightIndex < rightLen){
      if (left[leftIndex] <= right[rightIndex]) {
        res.push(left[leftIndex])
        leftIndex++
      }else {
        res.push(right[rightIndex])
        rightIndex++
        // 按理说left中所有元素应该小于等于right中所有元素，此时大于，说明当前right与当前left后续所有的子元素形成逆序列
        count += leftLen - leftIndex
      }
    }
    return leftIndex === leftLen ? res.concat(right.slice(rightIndex)) : res.concat(left.slice(leftIndex))
  }

  /**
   * @param {number[]} arr 
   * @returns {number[]}
   */
  const mergeSort = arr => {
    if (arr.length < 2) return arr
    const mid = arr.length >> 1
    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))
  }
  mergeSort(nums)
  return count
}

// console.log(InversePairs([7,6,5,4,3,2,1]))
