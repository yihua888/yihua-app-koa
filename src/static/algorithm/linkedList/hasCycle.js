import { createCycleListNode } from './index'
// 给定一个链表，判断链表中是否有环

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = head => {
  let fast = head, slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) return true
  }
  return false
}
console.log(hasCycle(createCycleListNode([1, 2, 3, 4, 5], -1)))
console.log(hasCycle(createCycleListNode([1, 2, 3, 4, 5], 0)))
