/**
 * 判断root2是否是root1的子结构
 * @link https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @returns {boolean}
 */
const isSubtree = (root1, root2) => {
  if (!root2) return true;
  if (!root1) return false;
  if (root1.val !== root2.val) return false;
  return (
    isSubtree(root1.left, root2.left) && isSubtree(root1.right, root2.right)
  );
};

/**
 * 从根节点开始递归判断是否含有子结构
 * @link https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @returns {boolean}
 */
const HasSubTree = (pRoot1, pRoot2) => {
  if (!pRoot1 || !pRoot2) return false;
  return (
    isSubtree(pRoot1, pRoot2) ||
    HasSubTree(pRoot1.left, pRoot2) ||
    HasSubTree(pRoot1.right, pRoot2)
  );
};
