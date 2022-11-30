/**
 * 输入两个链表，找出它们的第一个公共结点
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const FindFirstCommonNode = (l1, l2) => {
  let p1 = l1, p2 = l2
  // p1先走完自己的再去走p2,p2走完自己再走p1，这样就可以找到交点，
  // 因为这样遇到的相等的点表达后面的距离是相等的，则说明改点是遇到的第一个点
  while (p1 !== p2) {
    p1 = p1 === null ? l2 : p1.next
    p2 = p2 === null ? l1 : p2.next
  }
  return p1
}
