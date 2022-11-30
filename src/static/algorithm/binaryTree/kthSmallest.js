import { tree } from "./index";
/**
 * https://leetcode.cn/problems/kth-smallest-element-in-a-bst/
 * @param {TreeNode} root
 * @param {number} k
 * @returns
 */
 const kthSmallest = (root, k) => {
    let res;
    /**
     * @param {TreeNode} root
     * @returns
     */
    const midOrder = (root) => {
      // 找到左边最小的节点
      if (!root) return root;
      //  有左找左
      midOrder(root.left);
      //  走到这一步证明找到最小的
      if (k === 0) return res;
      res = root.val;
      k--;
      midOrder(root.right);
    };
    midOrder(root);
    return res;
  };
  