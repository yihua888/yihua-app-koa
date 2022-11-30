/**
 * 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），
 * 每段绳子的长度记为 k[0],k[1]...k[m] 。请问 k[0]k[1]...*k[m] 可能的最大乘积是多少？
 * 例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
 */

/**
 * @param {number} num 
 * @returns {number}
 */
const cuttingRope = (num) => {
    if (num < 4) return num - 1
    const a = num % 3
    const b = parseInt(num / 3)
    if (a === 0) return 3 ** b
    if (a === 1) return 2 * 2 * (3 ** (b - 1))
    if (a === 2) return 2 * (3 ** b)
}


// console.log(cuttingRope(8));