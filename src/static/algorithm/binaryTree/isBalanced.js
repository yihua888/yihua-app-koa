
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 const isBalanced = (root) => {
    /**
     * @param {TreeNode} root
     * @returns {number}
     */
    const orderTree = (root) => {
      if (!root) return 0;
      let left = orderTree(root.left);
      let right = orderTree(root.right);
      // -1表示非平衡二叉树
      if (left === -1 || right === -1 || Math.abs(left - right) > 1) return -1;
      // 则说明当前节点距离叶子节点的最大长度
      return Math.max(left, right) + 1;
    };
  
    return orderTree(root) !== -1;
  };