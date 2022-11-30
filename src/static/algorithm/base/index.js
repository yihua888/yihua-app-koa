
export default {}
/**
 * 集合 s 包含从 1 到 n 的整数。不幸的是，因为数据错误，导致集合里面某一个数字复制了成了集合里面的另外一个数字的值，
 * 导致集合 丢失了一个数字 并且 有一个数字重复 。给定一个数组 nums 代表了集合 S 发生错误后的结果。
 * 请你找出重复出现的整数，再找到丢失的整数，将它们以数组的形式返回。
 * @param {number[]} nums 
 * @returns {number[]}
 */


const findErrorNums = nums => {
    const len = nums.length
    const hasMap = new Array(len + 1).fill(false)
    hasMap[0] = true
    let rst = []
    for (let i = 0; i < len; i++) {
        hasMap[nums[i]] ? rst[0] = nums[i] : hasMap[nums[i]] = true
    }
    hasMap.some((v, i) => {
        if (!v) {
            rst[1] = i
            return true
        }
    })
    return rst
}


/**
 * @param {number} n
 * @return {number}
 */
var countLargestGroup = function (n) {
    const map = new Map()
    let index = 1
    const getSum = (num) => {
        return num.toString().split('').reduce((cur, i) => cur + Number(i), 0)
    }
    while (index <= n) {
        if (map.has(getSum(index))) {
            map.get(getSum(index)).push(index)
        } else {
            map.set(getSum(index), [index])
        }
        index++
    }

    let maxLen = 0
    let count = 0
    for (let [key, value] of map) {
        if (value.length > maxLen) {
            maxLen = value.length
            count = 1
        } else if (value.length === maxLen) {
            count++
        }
    }
    return count
};

// console.log(countLargestGroup(13));

/**
 * @param {number} n
 * @return {number}
 */
const countLargestGroup1 = function (n) {
    const arr = [[]]
    let index = 1
    const getSum = (num) => {
        let sum = 0
        const str = num.toString()
        for (let i = 0; i < str.length; i++) {
            sum += Number(str[i])
        }
        return sum
    }
    while (index <= n) {
        if (arr[getSum(index)]) {
            arr[getSum(index)].push(index)
        } else {
            arr[getSum(index)] = [index]
        }
        index++
    }

    let count = 1
    arr.sort((x, y) => y.length - x.length)

    const maxLen = arr[0].length
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length !== maxLen) return count;
        count++
    }

    return count
};
// console.log(countLargestGroup1(2));


/**
 * https://leetcode.cn/problems/maximum-length-of-repeated-subarray/
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findLength = function (nums1, nums2) {
    
};

// console.log((findLength([1,2,3,2,1],[3,2,1,4,7])));