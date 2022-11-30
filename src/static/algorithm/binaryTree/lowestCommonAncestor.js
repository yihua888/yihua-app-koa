// 二叉树最近公共祖先
/**
 * https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 const lowestCommonAncestor = function (root, p, q) {
    if (!root) return null;
    if (root === p || root === q) return root;
    // left上找p,q和right上找p,q
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    // 如果不在left上，则说明在right上
    if (!left) return right;
    if (!right) return left;
    if (right && left) return root;
    // 都不在
    return null;
  };
  