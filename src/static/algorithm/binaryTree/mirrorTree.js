/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 const mirrorTree = (root) => {
    if (!root) return root;
    [root.left, root.right] = [root.right, root.left];
    mirrorTree(root.left);
    mirrorTree(root.right);
    return root;
  };
  