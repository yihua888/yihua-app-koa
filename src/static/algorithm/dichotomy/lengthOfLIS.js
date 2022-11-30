/**
 * 最长上升子序列
 * 1. 维护一个子序列存放当前的上升序列
 * 2. 将当前数与子序列最大值比较，如果比最大值大直接加入队尾，如果更小则找一个合适的位置替换当前位置的元素
 * 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 * @param {number[]} nums 
 * @returns {number} 
 */
 const lengthOfLIS = function (nums) {
    const len = nums.length
    if (len === 0) {
      return 0;
    }
    const d = [nums[0]]
    for (let i = 0; i < len; i++) {
      if (nums[i] > d[d.length - 1]) {
        d.push(nums[i])
      } else {
        // 由于我们需要求的是长度，所以当我们当前元素小的时候进行替换，不会改变数组的长度。但是如果其恰好可以替换目前的最后一个元素，
        // 则能够保证当前序列最大值处于可选值的最小值，比如已存在序列1，2，3，6。当前元素5，经过替换之后会变成1，2，3，5.这样如果下一个是6可以插入。
        let left = 0, right = d.length - 1
        while (left < right) {
          let mid = (left + right) >> 1
          if (d[mid] === nums[i]) {
            left = mid
            break;
          }
          if (d[mid] > nums[i]) {
            right = mid
          } else {
            left = mid + 1
          }
        }
        d[left] = nums[i]
      }
    }
    return d.length
  };
  // console.log(lengthOfLIS([4,10,4,3,8,9]));
  