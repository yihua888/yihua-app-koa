function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * 排序链表
 * @param {ListNode} head
 * @return {ListNode}
 */
const sortList = function (head) {
  /**
   * @param {ListNode} left 
   * @param {ListNode} right 
   */
  const mergeList = (left, right) => {
    // 合成有序的新的链表
    const rst = new ListNode(0)
    let pre = rst
    while(left && right){
      if (left.val <= right.val) {
        pre.next = left
        left = left.next
      }else {
        pre.next = right
        right = right.next
      }
      // 移动指针
      pre = pre.next
    }
    // 把后续的接上
    pre.next = left ? left : right
    return rst.next
  }

  /**
   * @param {ListNode} node 
   * @returns {ListNode}
   */
  const mergeSort = (node) => {
    if (!node || !node.next) return node
    // 找中间，快指针走两个，正常指针走一步    
    let mid = node
    let fast = node.next
    while (fast && fast.next) {
      fast = fast.next.next
      mid = mid.next
    }
    // 找到了中间
    const right = mid.next
    // 断开链接
    mid.next = null
    const left = node
    return mergeList(mergeSort(left), mergeSort(right))
  }

  return mergeSort(head)
}

const arr = [2, 5, 4, 6, 3, 1]
function createListNode (arr) {
  const node = new ListNode(0)
  let pre = node
  arr.forEach(item => {
    pre.next = new ListNode(item)
    pre = pre.next
  })
  return node.next
}

// const nodeList = createListNode(arr)
// console.log(sortList(nodeList))
