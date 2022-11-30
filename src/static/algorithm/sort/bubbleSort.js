/**
 * 冒泡：让当前的和下一个比，然后依据统一规则更换两个数的位置
 * @param {number[]} arr 
 */
const bubbleSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      arr[j] > arr[j + 1] && ([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]])
    }
  }
  return arr
}
// console.log(bubbleSort([1,5,4,3,2]))
