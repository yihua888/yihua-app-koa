/**
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；
 * 否则，返回 false 。单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
 * 同一个单元格内的字母不允许被重复使用。
 */

/**
 * @param {string[][]} board
 * @param {string} word
 * @return {boolean}
 */
 const exist = (board, word) => {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} pos 
     */
    const backtrack = (x, y, pos) => {
        // 已经匹配了最后一个说明单词找到了
        if (pos === word.length - 1) return true
        let temp = board[y][x]
        board[y][x] = false
        if ((x < board[0].length -1 ) && (board[y][x + 1] === word[pos+1] )&& backtrack(x + 1, y, pos + 1)) return true
        if (x && (board[y][x - 1] === word[pos+1] )&& backtrack(x - 1, y, pos + 1)) return true
        if ((y < board.length -1 ) &&( board[y + 1][x] === word[pos+1]) && backtrack(x, y + 1, pos + 1)) return true
        if (y && (board[y - 1][x] === word[pos+1]) && backtrack(x, y - 1, pos + 1)) return true
        board[y][x] = temp
    }

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            if (board[y][x] === word[0] && backtrack(x, y, 0)) return true
        }
    }
    return false
}
// console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], 'ABCCED'));
