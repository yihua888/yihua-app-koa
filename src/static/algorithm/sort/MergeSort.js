// -----------------------------------------------归并排序-----------------------------------------------------
function MergeSort (arr, left, right) {
  if (left >= right) return
  let mid = Math.floor((right - left) >> 1) + left
  MergeSort(arr, left, mid)
  MergeSort(arr, mid + 1, right)
  Merge(arr, left, mid, right)
  return arr
}

function Merge (arr, left, mid, right) {
  let temp = [], i = 0
  let p1 = left, p2 = mid + 1
  while (p1 <= mid && p2 <= right) {
    arr[p1] <= arr[p2] ? temp[i++] = arr[p1++] : temp[i++] = arr[p2++]
  }
  while (p1 <= mid) {
    temp[i++] = arr[p1++]
  }
  while (p2 <= right) {
    temp[i++] = arr[p2++]
  }
  for (let i = 0; i < temp.length; i++) {
    arr[i + left] = temp[i]
  }
}
