/**
 * 插入：将当前元素与前面已有顺序的最后一个进行比较，然后看是否插入，如果插入则需要插入到最合适的位置，使得插入后依然有序
 * @param {number[]} arr 
 * @returns {number[]}
 */
const insertSort = arr => {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    if (arr[i] < arr[j]) {
      // 把i插入前面的位置
      let temp = arr[i]
      while (j >= 0 && arr[j] > temp) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = temp
    }
  }
  return arr
}
// console.log(insertSort([1,5,4,3,2]))
