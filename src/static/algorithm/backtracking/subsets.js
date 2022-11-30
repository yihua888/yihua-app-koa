/**
 * @param {number[]} nums 
 * @returns {number[][]}
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 */
 const subsets = nums => {
    let res = []
    const len = nums.length
    /**
     * @param {number[]} path 最开始的处理是没有元素[]
     * @param {number} i 从哪个位置开始处理
     */
    const back = (path, i) => {
        res.push(path)
        for (let j = i; j < len; j++) {
            path.push(nums[j])
            // 以nums[i]为开头,path.slice(0)拷贝一下，不影响后续操作path,j处理完了，下一个从j+1开始处理
            back(path.slice(0), j + 1)
            // 处理完nums[j],将其弹出
            path.pop()
        }
    }
    back([], 0)
    return res
}

console.log(subsets([1,2,3,4]));