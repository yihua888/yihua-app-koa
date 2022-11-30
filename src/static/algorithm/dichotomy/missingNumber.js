/**
 * 0～n-1中缺失的数字
 * 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。
 * 在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字
 * @param {number[]} nums 
 * @returns {number}
 */
 const missingNumber = (nums) => {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
      let mid = (left + right) >> 1
      if (mid === nums[mid]) {
        left = mid + 1
      } else if (mid < nums[mid]) {
        right = mid - 1
      }
    }
    return left
  }
  // console.log(missingNumber([0,1,3,4,5,6]));