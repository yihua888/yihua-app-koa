/**
 * 给定一个含重复数字的数组 nums ，返回其所有可能的全排列。你可以按任意顺序返回答案。
 * @param {number[]} nums
 * @return {number[][]}
 */
 const permuteRepeat = function (nums) {
    const map = new Map()
    const len = nums.length
    /**
     * @param {number[]} path 
     * @param {number[]} used 
     */
    const back = (path, used) => {
        if (path.length === len && !map.has(path.toString())) {
            map.set(path.toString(), path)
            return;
        }

        for (let i = 0; i < len; i++) {
            // 加一个思想记录使用过的下标
            if (!used.includes(i)) {
                path.push(nums[i])
                used.push(i)
                back(path.slice(), used.slice())
                used.pop()
                path.pop()
            }
        }
    }
    back([], [])
    return Array.from(map.values())
};
