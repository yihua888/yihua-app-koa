// -----------------------------------------------堆排序-----------------------------------------------------

function adjustMaxHeap (heap, head, heapSize) {
  let temp = heap[head]
  let child = head * 2 + 1
  while (child < heapSize) {
    if (child + 1 < heapSize && heap[child] < heap[child + 1]) child++
    if (heap[head] < heap[child]) {
      heap[head] = heap[child]
      head = child
      child = head * 2 + 1
    } else break
    heap[head] = temp
  }
}

function buildHeap (heap) {
  for (let i = (heap.length - 1) >> 1; i >= 0; i--) {
    adjustMaxHeap(heap, i, heap.length)
  }
}

/**
 * 堆排序
 * @param {*} arr 
 * @returns 
 */
function heapSort (arr) {
  buildHeap(arr)
  for (let i = arr.length - 1; i > 0; i--) { [arr[i], arr[0]] = [arr[0], arr[i]]
    adjustMaxHeap(arr, 0, i)
  }
  return arr
}
