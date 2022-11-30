import { createListNode } from './index'
/**
 * 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  const head = new ListNode()
  let curNode = head, node1 = l1, node2 = l2
  while (node1 && node2) {
    if (node1.val < node2.val) {
      curNode.next = node1
      node1 = node1.next
    } else {
      curNode.next = node2
      node2 = node2.next
    }
    curNode = curNode.next
  }
  node1 ? curNode.next = node1 : curNode.next = node2
  return head.next
}

console.log(mergeTwoLists(createListNode([1, 4, 5]), createListNode([1, 2, 3])))
