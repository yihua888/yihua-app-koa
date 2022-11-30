
export default {}
/**
 * HW0-1（机试）
 * 第一行输入一个字符串以逗号分隔，第二行输入一个目标值。找出字符串中连续字串之和等于目标值，
 * 符合该条件的最大字串。输出最大字串的长度。如果没有返回-1。
 * eg: ‘1,2,3,4,5,6,7,1,2,4,5,6’ ‘6’ => 3 解释(1,2,3)
 * eg: ‘1,2,3,4,5,6,7,1,1,1,1,1,1,1,1’ ‘6’ => 6 解释(1,1,1,1,1,1)
 */
{
    const arr = [2, 3, 1, 2, 4, 3]
    const target = 7
    const minSubArrayLen = function (target, nums) {
        let left = 0, right = 0, len = -Infinity, sum = 0;
        while (right < nums.length) {
            sum += nums[right]
            while(sum >= target){
                sum === target && (len = Math.max(len, right - left + 1))
                sum -= nums[left]
                left++
            }

            right++
        }
        return len === -Infinity ? -1 : len;
    };

    // console.log('---------------HW0-1----------------');
    // console.log(minSubArrayLen(target, arr));
}

/**
 * HW0-2
 * 给一段话很长的句子，第二行输入一个前缀，找出以以这个为前缀的单词并进行排序，如果没有返回-1。注意don’t看成don 和 t
 * eg：'Happiness is like a pebble dropped into a pool to set in motion an ever-widening circle of ripples As Stevenson has said, being happy is a duty ’
 * 前缀：dr 输出 dropped
 * (建立字典是为了后续查找)
 * 建立字典快，空间需要比法二少，查询效率低于法二
 */

// 法一：建立字典快，空间需要比法二少，查询效率低于法二
{
    const str = "adf abc aef bf ab don't"
    const per = 'a'
    const searchSuggest = (str) => {
        const dict = {}
        const handleDict = (str, dict) => {
            const arr = str.split(' ')
            const createDict = (word, dict) => {
                if (word.length === 1) {
                    if (!dict[word]) {
                        // 根单词添加标识
                        dict[word] = { isRootWord: true }
                        return dict
                    } else {
                        // 根单词添加标识
                        return Object.assign(dict[word], { isRootWord: true })
                    }
                }
                if (dict[word[0]]) {
                    // 给当前层继续挂载属性
                    createDict(word.slice(1), dict[word[0]])
                } else {
                    dict[word[0]] = createDict(word.slice(1), {})
                }
                return dict
            }

            // 因为涉及到某些单词可能是词根单词，所以需要把长度大的放在前面，这样后续处理词根单词会方便一点
            arr.forEach(word => {
                if (word.includes("'")) {
                    word.split("'").forEach(w => {
                        createDict(w, dict)
                    })
                } else {
                    createDict(word, dict)
                }
            })
        }

        const searchWordInDict = (per, dict) => {
            // 找出前缀树
            const findPerTree = (per, dict) => {
                if (per.length === 1) {
                    return dict[per]
                }
                if (dict[per[0]]) {
                    return findPerTree(per.slice(1), dict[per[0]])
                }
            }

            const joinStr = (per, obj) => {
                const rstArr = []
                for (let key in obj) {
                    // 如果key是根单词说明要拼接
                    if (key === 'isRootWord') {
                        rstArr.push(`${per}`)
                    } else {
                        rstArr.push(...joinStr(`${per}${key}`, obj[key]))
                    }
                }
                return rstArr
            }
            const obj = findPerTree(per, dict)
            let strArr = []
            // 遍历树形成word
            if (obj) {
                strArr = joinStr(per, obj)
            }

            // 排序
            const sortFun = (a, b) => {
                if (!a) return -1
                if (!b) return 1
                if (a.charCodeAt() === b.charCodeAt()) {
                    return sortFun(a.slice(1), b.slice(1))
                }
                return a.charCodeAt() - b.charCodeAt()
            }
            strArr.sort(sortFun)
            return strArr.length > 0 ? strArr : -1
        }

        handleDict(str, dict)
        return function (per = '') {
            return searchWordInDict(per, dict)
        }
    }
    // console.log('---------------HW0-2----------------');
    // console.log(searchSuggest(str)(per));

    //建立字典慢，空间占用大，当单词达到100万，会卡住。
    const searchSuggestion = (sentence) => {
        const keywords = sentence.split(' ')
        const letterMap = new Map()
        const buildDictionary = (keyword, parentMap = new Map(), index = 0) => {
            let letterGroup = keyword[index]
            let letterGroupSuggestion = parentMap.get(letterGroup)
            // 当前字母组合有无推荐列表
            if (!letterGroupSuggestion) {
                letterGroupSuggestion = { suggestionList: [keyword] }
            } else {
                const suggestionList = letterGroupSuggestion.suggestionList
                !suggestionList.includes(keyword) && suggestionList.push(keyword)
            }
            // 后续还有字母,递归建立字典
            if ((index < keyword.length - 1)) {
                const childMap = letterGroupSuggestion.childMap || new Map()
                letterGroupSuggestion.childMap = childMap
                buildDictionary(keyword, childMap, index + 1)
            }
            parentMap.set(letterGroup, letterGroupSuggestion)
        }
        keywords.forEach(keyword => {
            buildDictionary(keyword, letterMap)
        })
        return function (letterGroup = '') {
            const getSuggestionList = (letterGroup, parentMap, index = 0) => {
                const letterSuggestion = parentMap.get(letterGroup[index])
                if (!letterSuggestion) return -1
                if (index === letterGroup.length - 1) return letterSuggestion.suggestionList
                return getSuggestionList(letterGroup, letterSuggestion.childMap, index + 1)
            }
            return getSuggestionList(letterGroup, letterMap)
        }
    }

    // console.log(searchSuggestion(str)(per))
}




/**
 * HW0-3
 * 第一行输入一串字符串，请计算结果。其中sub( a b) 表示 a-b , add(a b) 表示 a + b ， mult(a b)表示 a * b, div(a b)表示 a / b 。
 * 如果被除数是0，则输出error eg:
 * add(3 div(4 0)) => error
 * add(3 mult(2 6)) => 15.0
 * add(1 div(1 2)) => 1.5
 */
{
    const str = '(add 3 (sub 4 1))'
    const handlekh = str => {
        let rst = ''
        const len = str.length
        for (let i = 0; i < len; i++) {
            if (str[i] === '(') {
                rst += '( '
            } else if (str[i] === ')') {
                rst += ' )'
            } else {
                rst += str[i]
            }
        }
        return rst
    }
    const arr = handlekh(str).split(' ')
    const stack = []
    const getRst = (f, left, right) => {
        left = Number(left)
        right = Number(right)
        if (f === 'add') return left + right
        if (f === 'sub') return left - right
        if (f === 'div') {
            if (right === 0) {
                return false
            }
            return Math.floor(left / right)
        }
        if (f === 'mul') return left * right
    }
    arr.forEach(item => {
        if (item[0] !== ')') {
            stack.push(item)
        } else {
            const right = stack.pop()
            const left = stack.pop()
            const f = stack.pop()
            // 把'（'移出去
            stack.pop()
            const rst = getRst(f, left, right)
            if (rst === false) {
                return console.log('error')
            }
            stack.push(rst)
        }
    })
    // console.log('---------------HW0-3----------------');
    // console.log(stack[0]);
}

/**
 * HW1-1
 * 有效的括号，给定一个字符串只包含(){}[]，请判断是否为有效字符串
 * eg:[] => true
 * [{] => false
 */
{
    /**
     * 是否匹配
     * @param {string} left 
     * @param {string} right 
     * @returns {boolean}
     */
    const isMatching = (left, right) => {
        if (left === '(' && right === ')') return true
        if (left === '{' && right === '}') return true
        if (left === '[' && right === ']') return true
        return false
    }
    /**
     * @param {string} str 
     * @returns {boolean}
     */
    const bracket = str => {
        const len = str.length
        if (len % 2) return false
        const stank = []
        const leftBracket = '([{'
        const rightBracket = ')]}'
        let index = 0
        while (index < str.length) {
            if (leftBracket.includes(str[index])) {
                stank.push(str[index])
            } else {
                if (!isMatching(stank.pop(), str[index])) {
                    return false
                }
            }
            index++
        }
        return stank.length === 0
    }
    // console.log('---------------HW1-1----------------');
    // console.log(bracket('[{]'));
    // console.log(bracket('[]'));
    // console.log(bracket('[{()}]'));
    // console.log(bracket('[{(})]'));
}

/**
 * HW1-2
 * 找出连续最长非重复字序列的长度
 * eg:abcabcat => 4
 * abcabcefabc => 5
 */
{
    /**
     * @param {string} str 
     * @returns {string}
     */
    const longestSubsequence = str => {
        const len = str.length
        let left = 0
        let right = 0
        let maxCount = 0
        let map = new Map()
        while (right < len) {
            if (map.get(str[right])) {
                // 证明存在,移动左指针
                map.delete(str[left])
                left++
            } else {
                map.set(str[right], 1)
                right++
            }
            maxCount = Math.max(maxCount, right - left)
        }
        return maxCount
    }
    // console.log('---------------HW1-2----------------');
    // console.log(longestSubsequence("abcabcat"));
    // console.log(longestSubsequence("abcaceaaaa"));
    // console.log(longestSubsequence("abcabcefabc"));
}

/**
 * HW2-1
 * 输入一个数字，转换为二进制字符串，统计其连续相同的元素的最多个数。
 * eg:3 => 11 => 2
 * eg:1 => 1 => 1
 * eg:0 => 0 => 1
 * eg:7 => 111 => 3
 * eg:17 => 10001 => 3
 */

{
    /**
     * @param {number} num 
     * @returns {number}
     */
    const maximum = num => {
        const numStr = num.toString(2)
        let count = 0
        let left = 0
        let right = 0
        const len = numStr.length
        while (left < len && right < len) {
            if (numStr[left] === numStr[right]) {
                count = Math.max(count, right - left + 1)
            } else {
                left = right
            }
            right++
        }
        return count
    }
    // console.log('---------------HW2-1----------------');
    // console.log(maximum(1));
    // console.log(maximum(0));
    // console.log(maximum(7));
    // console.log(maximum(3));
    // console.log(maximum(17));
    // console.log(maximum(99));

}
/**
 * HW2-2
 * 输入英文求中文输入中文求英文，英文可包含Double。
 * 英文：One Two Three Four Five Six Seven Eight Nine Zero Double
 * 中文：
 * 如果出现DoubleDouble，则表示不合法输出ERROR，输入其余不符合的同样认为是不合法。
 * eg:YiErSanSan => OneTwoThreeThree
 * eg:OneTwoDoubleThree => YiErSanSan
 * eg:OneTwoDoubleDoubleThree => ERROR
 * eg:OneTwoDoubleYiThree => ERROR
 * eg:YiErDoubleSanSan => ERROR
 * eg:OneTwoThreeDouble => ERROR
 */

{
    /**
     * @param {string} str 
     * @returns {string}
     */
    const chEnTranslate = str => {
        const ch = "Yi Er San Si Wu Liu Qi Ba Jiu Ling".split(' ')
        const en = "One Two Three Four Five Six Seven Eight Nine Zero".split(' ')
        const enMap = new Map()
        const chMap = new Map()
        // 建立映射关系
        ch.forEach((key, index) => {
            chMap.set(key, en[index])
            enMap.set(en[index], key)
        })
        const CAPITAL = 97
        // 最后增加一个结束标志
        str += 'E'
        const len = str.length
        let left = 0
        let right = 1
        let rst = ''
        let isEn = false
        let doubleNum = 0
        while (left < len && right < len) {
            if (str[right].charCodeAt() < CAPITAL) {
                // 大写字母出现
                const cur = str.slice(left, right)
                // Double不能放最后
                if (right === (len - 1) && cur === 'Double') return 'ERROR'
                // 判断是中文还是英文，英文可以有'Double'
                if (!rst && (en.includes(cur) || cur === 'Double')) {
                    isEn = true
                }
                if (!isEn) {
                    // 中文
                    if (!chMap.has(cur)) return 'ERROR'
                    rst += chMap.get(cur)
                } else {
                    // 英文
                    if (!enMap.has(cur) && cur !== 'Double') return 'ERROR'
                    // 处理Double
                    if (doubleNum) {
                        if (cur === 'Double') return 'ERROR'
                        rst += (enMap.get(cur) + enMap.get(cur))
                        doubleNum = 0 //重置doubleNum
                    } else if (cur !== 'Double') {
                        rst += enMap.get(cur)
                    } else {
                        doubleNum = 1
                    }
                }
                left = right
            }
            right++
        }
        return rst
    }
    // console.log('---------------HW2-2----------------');
    // console.log(chEnTranslate('YiErSanSan'));
    // console.log(chEnTranslate('OneTwoDoubleThree'));
    // console.log(chEnTranslate('OneTwoDoubleDoubleThree'));
    // console.log(chEnTranslate('OneTwoDoubleYiThree'));
    // console.log(chEnTranslate('YiErDoubleSanSan'));
    // console.log(chEnTranslate('OneTwoThreeDouble'));
    // console.log(chEnTranslate('DoubleOneTwoThree'));
    // console.log(chEnTranslate('DoubleOneDoubleTwoDoubleThreeDoubleSix'));
    // console.log(chEnTranslate('SiSiSiErSan'));
}

// HW3-1
// 给定N个队伍，每次选两个最高的队伍出来比赛，如果人数相等则消亡两个队伍，否则将两队比赛的结果产生的新队伍放入总队伍中，
// 依次这样比赛，求最后比赛结果。
{
    /**
     * @param {number[]} arr 
     * @returns {number[]}
     */
    const match = arr => {
        if (arr.length < 2) return arr
        arr.sort((x, y) => y - x)
        const rst = arr[0] - arr[1]
        // 此处可以考虑上面已经做了排序，只需要把新的数据插入到数组中合适的位置，
        // 那么递归就不需要从match开始，在内部实现后续的arr[1]和arr[0]的比较
        if (rst === 0) return match(arr.slice(2))
        return match(arr.slice(2).concat(rst))
    }
    // console.log(match([1,2,3,4,5,1]));
}

/**
 * HW0-phf
 * 输入一个二维数组，0代表通过，1代表障碍，2代表人，3代表餐厅，问这些人可以选择几个餐厅聚餐
 */
{
    /**
     * @param {number[][]} arr 
     * @returns {number}
     */
    const dinnerParty = arr => {
        const row = arr.length
        if (row === 0) return 0
        const col = arr[0].length
        if (col === 0) return 0
        const parents = new Array(col * row).fill(0).map((v, i) => i)

        const find = p => {
            p !== parents[p] && (parents[p] = find(parents[p]))
            return parents[p]
        }

        const union = (p1, p2) => {
            p1 = find(p1)
            p2 = find(p2)
            p1 !== p2 && (parents[p1] = p2)
        }

        const unionCondition = num => {
            return num === 0 || num === 2 || num === 3
        }

        const pArr = []
        const cArr = []

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (arr[i][j] === 2) {
                    pArr.push(i * col + j)
                } else if (arr[i][j] === 3) {
                    cArr.push(i * col + j)
                }
                if (unionCondition(arr[i][j])) {
                    i < row - 1 && unionCondition(arr[i + 1][j]) && union(i * col + j, (i + 1) * col + j);
                    j < col - 1 && unionCondition(arr[i][j + 1]) && union(i * col + j, i * col + j + 1);
                }
            }
        }

        const isUnicom = (p1, p2) => {
            return find(p1) === find(p2)
        }

        const plast = pArr.pop()
        let flag = true
        pArr.some(p => {
            if (!isUnicom(p, plast)) {
                flag = false
                return true
            }
        })

        if (!flag) return 0

        let conunt = 0
        cArr.forEach(c => {
            if (isUnicom(c, plast)) {
                conunt++
            }
        })

        return conunt
    }

    const arr = [
        [2, 0, 1, 0, 3],
        [0, 0, 1, 1, 1],
        [1, 0, 0, 0, 2],
        [3, 1, 1, 0, 0]
    ]
    // console.log('---------------phf-------------');
    // console.log(dinnerParty(arr));
}