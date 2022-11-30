export default {}

function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * 创建普通链表
 * @param {any[]} arr 
 */
function createListNode (arr) {
  const head = new ListNode(arr.shift())
  let newNode = head
  arr.forEach(item => {
    newNode.next = new ListNode(item)
    newNode = newNode.next
  })
  return head
}

/**
 * 创建环形链表
 * @param {any[]} arr 
 * @param {number} pos 
 */
function createCycleListNode (arr, pos) {
  const head = new ListNode(arr.shift())
  let newNode = head
  let cycleNode = null
  arr.forEach((item, index) => {
    if (pos === index) {
      cycleNode = newNode
    }
    newNode.next = new ListNode(item)
    newNode = newNode.next
  })
  newNode.next = cycleNode
  return head
}

export { createListNode, createCycleListNode }


