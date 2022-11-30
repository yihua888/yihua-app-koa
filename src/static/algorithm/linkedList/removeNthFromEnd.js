import { createListNode  } from './index'
/**
 * 删除链表的倒数第n个节点
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
  if (!head) return null
  let fast = head, pre = head, len = 0, p1 = head
  // p1走到末尾，统计总共的节点数
  while (p1) {
    len++
    p1 = p1.next
  }

  // 删除倒数第len个也就是删除第一个
  if (n === len) return head.next
  if (n > len) return head
  let delIndex = len - n
  while (delIndex--) {
    pre = fast
    fast = fast.next
  }
  pre.next = fast.next
  return head
}

console.log(removeNthFromEnd(createListNode([1, 2, 3, 4, 5]), 5))
