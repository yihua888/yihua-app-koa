/**
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * @param {number[]} nums
 * @return {number[][]}
 */
 const permute = function (nums) {
    const res = []
    const len = nums.length
    /**
     * @param {number[]} path 
     * @param {number} i 
     */
    const back = (path) => {
        if (path.length === len) {
            res.push(path)
            return;
        }

        for (let i = 0; i < len; i++) {
            // 只要没有就添加
            if (!path.includes(nums[i])) {
                path.push(nums[i])
                back(path.slice(0))
                path.pop()
            }
        }
    }
    back([])
    return res
};

// console.log(permute([1, 2, 3 ]));