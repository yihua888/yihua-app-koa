/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 问总共有多少条不同的路径
 */
/**
 * @param {number} m 
 * @param {number} n 
 * @returns {number}
 */
 const uniquePaths = (m, n) => {
    if (m === 1 || n === 1) return 1
    let row = new Array(n).fill(1)
    let data = new Array(m).fill([1])
    data[0] = row
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            data[i][j] = data[i][j - 1] + data[i - 1][j]
        }
    }
    return data[m - 1][n - 1]
}

// console.log(uniquePaths(3,3));