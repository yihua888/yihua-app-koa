import { createListNode } from './index'
/**
 * 给定一个链表的 头节点 head ，请判断其是否为回文链表。
 * https://leetcode.cn/problems/aMhZSa/
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function (head) {
  if (!head) return true
  let slow = head, fast = head, pre = null, temp
  // 反转链表，并且使slow指向链表的中间位置
  while (fast && fast.next) {
    fast = fast.next.next
    temp = slow
    slow = slow.next
    temp.next = pre
    pre = temp
  }

  // 存在fast,不存在fast.next，则证明是奇数个，则slow往后再移动一个到达中间位置
  if (fast) slow = slow.next
  while (pre && slow) {
    if (slow.val !== pre.val) return false
    slow = slow.next
    pre = pre.next
  }

  return true
}
console.log(isPalindrome(createListNode([1, 2, 3, 2, 1])))
