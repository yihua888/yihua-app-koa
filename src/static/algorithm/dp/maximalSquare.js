
/** DP 
 * 题目要求最大正方形面积，面积 = 边长 * 边长，也就是求最大正方形的边长
 * 所以也就变成了，在矩阵中找最大正方形，矩阵中只有0｜1两种值，全部为1的才是正方形
 * 如何知道矩阵中哪里是1，哪里是0，只能穷举，但要聪明的穷举，这不就是动态规划的本质嘛！
 * 动态规划第一步，先假象我们创建了一个二维数组dp，用来存储「这个点为右下角的最大正方形的边长」
 * 下面开始找 状态转换方程
 * 思路：假设有如下矩阵
 * 1 0 1 1 1
 * 1 1 1 1 1
 * 1 1 1 1 1
 * 1 0 0 1 1
 * 随便找一个点，直观地，我们先找最右下角的点，设该点的最大正方形边长为 dp[i][j], 我们用肉眼看一下，dp[i][j] 应该等于 2
 * 为什么等于2，是因为我们看了 dp[i-1][j], dp[i-1][j-1], dp[i][j-1] 这三个点都为1，而又因为dp[i][j-2] 为0，所以
 * 我们知道dp[i][j]最大就为2了。也就是我们不能只看dp[i][j]相邻的三个点，而应该看「这三个相邻点为正方形右下角」的边长情况，
 * 取最小边长进行求解 dp[i][j] 的最大正方形边长。（看，我们找到了重叠子问题和最优子结构）
 * 所以，状态转换方程为：dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1
 * 下一步，需要根据矩阵数据，进行选择和明确 base case 即可
 */

/**
 * @describe 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积
 * @param {string[]} arr
 * @returns {number}
 */

 const maximalSquare = (arr) => {
    if (!arr.length) return 0
    let maxLength = 0
    const rowLen = arr.length
    const colLen = arr[0].length
    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            if (arr[i][j] === '1') {
                arr[i][j] = 1
                if (i > 0 && j > 0) {
                    // 一格一格走，当前点如果是1则需要判断已存在的点及当前点看作右下角的点，其余四个能够到达的最小短板决定了当前点的最大边长。
                    arr[i][j] = Math.min(arr[i - 1][j], arr[i - 1][j - 1], arr[i][j - 1]) + 1
                }
                maxLength = Math.max(maxLength, arr[i][j])
            }
        }
    }
    return Math.pow(maxLength, 2)
}

const maximalSquareArr = [
    ['1', '1', '1', '1', '1'],
    ['1', '1', '1', '0', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '1', '1', '1', '1']
]

// console.log(maximalSquare(maximalSquareArr));