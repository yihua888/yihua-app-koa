/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1
 */

/**
 * @describe 最少硬币
 * @param {number[]} coins 
 * @param {number} amount 
 * @returns {number}
 */
 const coinChange = (coins, amount) => {
    let dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i <= amount; i++) {
        for (let coin of coins) {
            // 只有当前比对的面值小于等于当前需要兑换的钱才可以去换
            if (i - coin >= 0) {
                // dp[i-coin]是得到i-coin元需要的最小张数，加上面值为coin的钱一张可以兑换为i元的钱
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}

// console.log(coinChange([1,5,10,20,50,100],99));