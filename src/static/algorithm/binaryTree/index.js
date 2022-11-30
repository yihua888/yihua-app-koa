export default {};

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {array} arr
 * @returns {TreeNode}
 */
const createBinaryTreeBuyArr = (arr) => {
  const root = new TreeNode(arr.shift());
  let curNode = null;
  let index = 0;
  const queue = [];
  let newNode = null;
  queue.push(root);
  while (index < arr.length) {
    curNode = queue.shift();
    while (!curNode && queue.length) {
      curNode = queue.shift();
    }
    newNode = arr[index];
    if (newNode !== null) {
      newNode = new TreeNode(newNode);
    }

    curNode.left = newNode;
    queue.push(newNode);
    index++;

    newNode = arr[index];
    if (newNode !== null) {
      newNode = new TreeNode(newNode);
    }
    curNode.right = newNode;
    queue.push(newNode);
    index++;
  }
  return root;
};

/**
 * @param {Array} arr
 * @returns
 */
const createBinaryTree = (arr, rootId) => {
  const map = new Map();
  let root = new TreeNode();
  arr.forEach((item) => {
    if (map.has(item.pid)) {
      map.get(item.pid).push(item);
    } else {
      map.set(item.pid, [item]);
    }
    if (item.id === rootId) {
      root = new TreeNode(item.val);
    }
  });
  // 得到映射
  /**
   * @param {TreeNode} root
   */
  const mountChild = (root, pid) => {
    if (map.has(pid)) {
      map.get(pid).forEach((i) => {
        if (i.isLeft) {
          root.left = new TreeNode(i.val);
          mountChild(root.left, i.id);
        } else {
          root.right = new TreeNode(i.val);
          mountChild(root.right, i.id);
        }
      });
    }
  };
  mountChild(root, rootId);
  return root;
};


const arr = [
  { val: 1, id: 1, pid: null, isLeft: false },
  { val: 2, id: 2, pid: 1, isLeft: true },
  { val: 3, id: 3, pid: 1, isLeft: false },
  { val: 4, id: 4, pid: 2, isLeft: false },
  { val: 5, id: 5, pid: 3, isLeft: false },
  { val: 6, id: 6, pid: 4, isLeft: true },
  { val: 7, id: 7, pid: 4, isLeft: false },
  { val: 8, id: 8, pid: 5, isLeft: false },
];
const tree = createBinaryTree(arr, 1);

export {
  tree
}



