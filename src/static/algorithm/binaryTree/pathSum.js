/**
 * 回溯
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
const pathSum = (root, targetSum) => {
  if (!root) return 0;
  let count = 0;
  /**
   * @param {array} path
   * @param {TreeNode} root
   */
  const back = (path, root, flag) => {
    path.push(root.val);
    if (path.reduce((pre, cur) => (pre += cur), 0) === targetSum) {
      count++;
    }
    root.left && back(path, root.left, flag);
    root.right && back(path, root.right, flag);
    path.pop();
    // 以子节点为根出发,如果由子节点产生的新树后续每次待会增加新的
    flag && root.left && back([], root.left, false);
    flag && root.right && back([], root.right, false);
  };

  back([], root, true);
  return count;
};

const testTree = createBinaryTreeBuyArr([
  10,
  5,
  -3,
  3,
  2,
  null,
  11,
  3,
  -2,
  null,
  1,
]);
// console.log(testTree);
// console.log(pathSum(testTree, 3));
// [1,null,2,null,3,null,4,null,5]
// root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8

/**
 * 回溯
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
const pathSum1 = (root, targetSum) => {
  let count = 0;
  const back = (path, root) => {
    if (root === null) {
      return;
    }
    path.push(root.val);
    let sum = 0;
    // 从后往前加，比如[1,2,3]可以拿到3
    for (let i = path.length - 1; i >= 0; i--) {
      sum += path[i];
      if (sum === targetSum) {
        count++;
      }
    }
    back(path, root.left);
    back(path, root.right);
    path.pop();
  };
  back([], root);
  return count;
};

// console.log(testTree);
// console.log(pathSum1(testTree, 8));

/**
 * DFS解法
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
const pathSum2 = function (root, targetSum) {
  if (!root) {
    return 0;
  }
  /**
   * @param {TreeNode} root
   * @param {number} targetSum
   * @return {number}
   */
  const rootSum = (root, targetSum) => {
    let rst = 0;
    if (!root) {
      return 0;
    }

    let val = root.val;
    if (val === targetSum) {
      rst++;
    }

    rst += rootSum(root.left, targetSum - val);
    rst += rootSum(root.right, targetSum - val);
    return rst;
  };
  let rst = rootSum(root, targetSum);
  // 以子节点出发
  rst += pathSum(root.left, targetSum);
  // 以子节点出发
  rst += pathSum(root.right, targetSum);
  return rst;
};

// console.log(pathSum2(testTree, 3));

/**
 * DFS解法+前缀和
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
const pathSum3 = function (root, targetSum) {
  const prefix = new Map();
  // 初始前缀和为0，为了后续cur-targetSum = 0的时候
  prefix.set(0, 1);

  /**
   * @param {TreeNode} root
   * @param {map} prefix
   * @param {number} targetSum
   * @param {number} cur
   * @returns
   */
  const dfs = (root, prefix, cur, targetSum) => {
    if (!root) {
      return 0;
    }
    let ret = 0;
    cur += root.val;
    // 证明到达当前节点，前缀和（路径相加）为cur,那我们可以确定的是在前缀和中查找cur-targetSum有多少种路径
    // 因为cur - (cur-targetSum) = targetSum。所以证明前面的路径可以形成targetSum
    ret += prefix.get(cur - targetSum) || 0;
    // 设置下子节点所包含的前缀和
    prefix.set(cur, (prefix.get(cur) || 0) + 1);
    // 以子节点开始计算
    ret += dfs(root.left, prefix, cur, targetSum);
    ret += dfs(root.right, prefix, cur, targetSum);
    // 子节点算完之后，需要清除当前造成的前缀和。例如：子节点left生成了3=>1，返回上一级right，也会存在3=>1。
    prefix.set(cur, prefix.get(cur) - 1);
    return ret;
  };
  return dfs(root, prefix, 0, targetSum);
};
// const testTree1 = createBinaryTreeBuyArr([5,4,8,11,null,13,4,7,2,null,null,5,1])
// console.log(pathSum3(testTree1, 22));
