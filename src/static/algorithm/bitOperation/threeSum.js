/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。注意：答案中不可以包含重复的三元组。
 */

/**
 * https://leetcode.cn/problems/3sum/
 * @param {number[]} nums 
 * @returns {number[][]}
 */
 const threeSum = function (nums) {
    const len = nums.length
    if (len < 3) return []
    nums.sort((x, y) => x - y)
    const res = []
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) return res
        if (i && nums[i] === nums[i - 1]) continue;
        let left = i + 1, right = len - 1;
        while (left < right) {
            const rst = nums[i] + nums[left] + nums[right]
            if (rst === 0) {
                res.push([nums[i], nums[left], nums[right]])
                while (left < right && nums[left] === nums[left + 1]) {
                    left++
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--
                }
                left++
                right--
            } else if (rst < 0) {
                left++
            } else {
                right--
            }
        }
    }
    return res
};
// console.log(threeSum([-1,0,1,2,-1,-4]));
// console.log(threeSum([0,0,0,0]));