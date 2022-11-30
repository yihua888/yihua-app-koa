import { tree } from "./index";
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 const levelOrder = function (root) {
    if (!root) return [];
    const rst = [];
    const queue = [];
    let curNode;
    queue.push(root);
    while (queue.length) {
      curNode = queue.shift();
      rst.push(curNode.val);
      curNode.left && queue.push(curNode.left);
      curNode.right && queue.push(curNode.right);
    }
    return rst;
  };
  
  /**
   * @param {TreeNode} root
   * @return {number[]}
   */
  const levelOrder1 = (root) => {
    if (!root) return [];
    let cur = 0,
      all = 0,
      rst = [],
      queue = [],
      curNode;
    queue[all++] = root;
    while (cur < all) {
      curNode = queue[cur++];
      rst.push(curNode.val);
      curNode.left && (queue[all++] = curNode.left);
      curNode.right && (queue[all++] = curNode.right);
    }
    return rst;
  };
  // console.log(levelOrder1(tree));
  