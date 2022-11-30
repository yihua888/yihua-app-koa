/**
 *@describe 给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个位置。
 */

/**
 * @param {number[]} nums 
 * @returns {boolean}
 */

 const canJump = (nums) => {
    const len = nums.length
    let dp = new Array(len).fill(false); //初始化dp
    dp[0] = true
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && nums[j] + j >= i) {
                dp[i] = true
                break;
            }
        }
    }
    return dp[len - 1]
}
// console.log(canJump([2,3,1,1,4]));