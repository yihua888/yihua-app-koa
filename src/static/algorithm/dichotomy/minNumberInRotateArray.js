/**
 * 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素
 * @param {number[]} rotateArray 
 * @returns {number}
 */
 const minNumberInRotateArray = rotateArray => {
    if (!rotateArray.length) return 0;
    let left = 0, right = rotateArray.length - 1;
    while (left < right) {
      let mid = (right + left) >> 1
      if (rotateArray[left] <= rotateArray[right]) {
        return rotateArray[left]
      }
  
      if (rotateArray[left] < rotateArray[mid]) {
        left = mid + 1
      } else if (rotateArray[left] > rotateArray[mid]) {
        right = mid
      } else {
        left++
      }
    }
  }
  // console.log(minNumberInRotateArray([3,4,5,1,2]));