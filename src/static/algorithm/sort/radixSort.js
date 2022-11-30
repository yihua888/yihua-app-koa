/**
 * 桶排序
 * @param {*} arr 
 * @param {*} arrDomain 
 * @param {*} gropSize 
 * @returns 
 */
function radixSort (arr, arrDomain, gropSize) {
  let data = []
  for (let i = 0; i < arr.length; i++) data.push([])
  for (let i = 0; i < arr.length; i++) {
    data[Math.floor(parseInt(arr[i] / gropSize)) + 1].push(arr[i])
  }
  for (let i = 0; i < data.length; i++) {
    quickSort(data[i])
  }
  return data.flat(Infinity)
}
