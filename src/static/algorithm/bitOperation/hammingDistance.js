// 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
const hammingDistance = (x, y) => {
    let ans = x ^ y, count = 0;
    while (ans) {
        count++
        ans = ans & (ans - 1)
    }
    return count
}
// console.log(hammingDistance(1,4));