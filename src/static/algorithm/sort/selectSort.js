/**
 * 选择排序
 * @param {number[]} arr 
 * @returns {number[]}
 */
function selectSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = Math.min(...arr.slice(i))
    let index = arr.indexOf(min)
    ;[arr[i], arr[index]] = [arr[index], arr[i]]
  }
  return arr
}
