/**
 *@describe 给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个位置。
 *1. 使用一个变量保存当前可到达的最大位置
 *2. 时刻更新最大位置
 *3. 可达位置小于数组长度返回false，反之即反
 */

/**
 * @param {number[]} nums 
 * @returns {boolean}
 */
const canJump = (nums) => {
  let k = 0
  for (let i = 0; i < nums.length; i++) {
    if (i > k) return false
    k = Math.max(k , i + nums[i])
  }
  return true
}

// console.log(canJump([1,0,4,0]))
