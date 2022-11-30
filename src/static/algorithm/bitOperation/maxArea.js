/**
 * 盛最多水的容器
 * @param {number[]} height 
 * @returns {number}
 */
 function maxArea(height) {
    const len = height.length
    let res = 0, i = 0, j = len - 1;
    while (i < j) {
        res =
            height[i] > height[j] ?
                Math.max(res, (j - i) * Math.min(height[i], height[j--])) :
                Math.max(res, (j - i) * Math.min(height[j], height[i++]))
    }
    return res
};
// console.log(maxArea([1,8,6,2,5,4,8,3,7]));