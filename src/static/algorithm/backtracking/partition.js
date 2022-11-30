/**
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 */

/**
 * @param {string} s 
 * @returns {string[][]}
 */
 const partition = s => {
    const res = []
    const LEN = s.length

    /**
     * @describe 判断字符串是否是回文字符串
     * @param {string} str 
     * @returns {boolean}
     */
    const isPalindrome = str => {
        let left = 0
        let right = str.length - 1
        while (left < right) {
            if (str[left] !== str[right]) return false
            left++
            right--
        }
        return true
    }

    /**
     * @param {string[]} path 
     * @param {number} start 
     */
    const back = (path, start) => {
        // 只有当前处理的元素为改元素的最后一个位置，才能说明处理完毕了。才能保证是将s拆分为多个回文子序列。
        start === LEN && res.push(path)
        for (let i = start; i < LEN; i++) {
            if (!isPalindrome(s.slice(start, i + 1))) continue;
            path.push(s.slice(start, i + 1))
            back(path.slice(), i + 1)
            path.pop()
        }
    }
    back([], 0)
    return res
}

// console.log(partition('aabb'));
