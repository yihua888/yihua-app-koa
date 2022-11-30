// 二进制中1的个数
const hammingWeight = n => {
    let count = 0
    while (n) {
        count++
        // n & n-1会消除n中的一个1
        n = n & (n - 1)
    }
    return count
}
