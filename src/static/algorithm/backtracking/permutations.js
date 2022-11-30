/**
 * 字符串全排列（回溯）
 * @param { string } str 
 * @returns {string[]}
 */
 const permutations = str => {
    const res = [];
    const len = str.length
    const back = (path, used) => {
        if (path.length === len && !res.includes(path)) {
            res.push(path)
            return;
        }

        for (let i = 0; i < len; i++) {
            if (!used[i]) {
                path += str[i]
                used[i] = true
                back(path.slice(), used.slice())
                used[i] = false
                path = path.slice(0, -1)
            }
        }
    }
    back('', [])
    return res
}

/**
 * 字符串全排列（插入）
 * @param {string} string 
 * @returns {string[]}
 */
 const permutations1 = string => {
    const result = [];
    if (string.length === 1) {
        return [string];
    } else {
        // 递归思想，最后返回的是一个不重复对于当前的字符串进行排序的所有组合
        // 下面的for循环往这个组合中随意位置插入最开始不包含在内的元素
        let pre = permutations1(string.slice(1));
        for (let j = 0; j < pre.length; j++) {
            // k < pre[j].length + 1是因为当前元素可以放到最后
            for (let k = 0; k < pre[j].length + 1; k++) {
                let temp = pre[j].slice(0, k) + string[0] + pre[j].slice(k);
                result.push(temp);
            }
        }
        return [...new Set(result)];
    }
}
