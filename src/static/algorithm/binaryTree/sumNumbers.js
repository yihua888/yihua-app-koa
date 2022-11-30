/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumNumbers = (root) => {
  let rst = 0;
  const ergodicTree = (root, pre) => {
    pre += root.val;
    if (!root.left && !root.right) {
      rst += Number(pre);
      return;
    }
    root.left && ergodicTree(root.left, pre);
    root.right && ergodicTree(root.right, pre);
  };
  ergodicTree(root, "");
  return rst;
};
// console.log(sumNumbers(tree));
