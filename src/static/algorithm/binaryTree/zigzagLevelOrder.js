import { tree } from "./index";
/**
 * Definition for a binary tree node.
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = (root) => {
  const rst = [];
  const queue = [];
  root.level = 0;
  queue.push(root);
  while (queue.length) {
    const curNode = queue.shift();
    const level = curNode.level;
    delete curNode.level;
    if (!rst[level]) {
      rst[level] = [curNode.val];
    } else {
      level % 2 && rst[level].unshift(curNode.val);
      !(level % 2) && rst[level].push(curNode.val);
    }
    curNode.left &&
      (curNode.left.level = level + 1) &&
      queue.push(curNode.left);
    curNode.right &&
      (curNode.right.level = level + 1) &&
      queue.push(curNode.right);
  }
  return rst;
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 const zigzagLevelOrder1 = (root) => {
  const queue = [],
    rst = [];
  queue.push(root);
  let isEven = true,
    level = 0,
    toBePrinted = 1,
    curNode,
    temp = [];
  while (queue.length) {
    curNode = queue.shift();
    // 奇数行从开始插入
    if (isEven) {
      temp.push(curNode.val);
    } else {
      temp.unshift(curNode.val);
    }

    if (curNode.left) {
      queue.push(curNode.left);
      level++;
    }

    if (curNode.right) {
      queue.push(curNode.right);
      level++;
    }

    toBePrinted--;
    if (toBePrinted === 0) {
      rst.push(temp);
      temp = [];
      // 下一层有多少个
      toBePrinted = level;
      level = 0;
      isEven = !isEven;
    }
  }
  return rst;
};


zigzagLevelOrder(tree);
zigzagLevelOrder1(tree);
