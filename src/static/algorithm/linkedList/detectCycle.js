/**
 * 找出环形链表入环位置
 */

/**
 * @param {ListNode} head 
 * @returns {ListNode}
 */
const detectCycle = head => {
  if (!head || !head.next) return null
  let fast = head.next.next, slow = head.next, p = head
  while(fast && fast.next && fast !== slow){
    fast = fast.next.next
    slow = slow.next
  }
  if (!fast || !fast.next) return null
  // 有环，fast比slow快一圈，把环前看成a,slow在的位置为环中b,环中到末尾差c
  // 则有a+(n+1)b+nc=2(a+b)⟹a=c+(n−1)(b+c)，所以slow走c到达是head走a的位置
  while(slow !== p){
    p = p.next
    slow = slow.next
  }
  return p
}

/**
 * @param {ListNode} head 
 * @returns {ListNode}
 */
const detectCycle1 = head => {
  let set = new Set()
  while(head){
    if (set.has(head)) {
      return head
    }
    set.add(head)
    head = head.next
  }
  return null
}
// console.log(detectCycle1(createCycleListNode([1,2,3,4,5],3)))
