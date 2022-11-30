import { createListNode } from './index'
// 输入一个链表，输出该链表中倒数第k个结点。
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const getKthFromEnd = function (head, k) {
  if (head === null || k === 0) return null
  let fast = head, slow = head
  while (k--) {
    fast = fast.next
  }

  while (fast) {
    fast = fast.next
    slow = slow.next
  }

  return slow
}

console.log(getKthFromEnd(createListNode([1, 2, 3, 4, 5]), 2))
