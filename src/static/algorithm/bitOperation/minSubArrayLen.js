/**
 * https://leetcode.cn/problems/minimum-size-subarray-sum/submissions/
 * @param {number} target 
 * @param {number[]} nums 
 * @returns 
 */
 const minSubArrayLen = function (target, nums) {
    let left = 0, right = 0, len = Infinity, num = 0;
    while (right < nums.length) {
        num += nums[right];
        while (num >= target) {
            len = Math.min(len, right - left + 1);
            num -= nums[left];
            left++;
        }
        right++;
    }
    return len === Infinity ? 0 : len;
};
// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));