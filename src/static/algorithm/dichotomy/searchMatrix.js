/**
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：每行的元素从左到右升序排列。 每列的元素从上到下升序排列。
 * @param {number[][]} nums 
 * @param {number} target 
 * @returns {boolean}
 */
 const searchMatrix = (nums, target) => {
    let rows = nums.length;
    if (rows <= 0) return false;
    let cols = nums[0].length;
    if (cols <= 0) return false;
    let row = rows - 1;
    let col = 0;
    while (row >= 0 && col < cols) {
      if (nums[row][col] > target) {
        row--;
      } else if (nums[row][col] < target) {
        col++;
      } else {
        return true;
      }
    }
    return false;
  }
  
  // console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],5));
  