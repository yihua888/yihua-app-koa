/**
 * https://leetcode.cn/problems/diameter-of-binary-tree/
 * @param {TreeNode} root
 * @return {number}
 */
 const diameterOfBinaryTree = function (root) {
    let max = 0;
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    const dfs = (root) => {
      if (!root) return 0;
      let left = dfs(root.left);
      let right = dfs(root.right);
      max = Math.max(max, left + right);
      // 此时的节点返回的是当前的最长，因为当前可达最长作为最长链条的参与，
      // 最长链可以理解为根节点两侧最长的可达链相加在加上1
      return Math.max(left, right) + 1;
    };
    dfs(root);
    return max;
  };