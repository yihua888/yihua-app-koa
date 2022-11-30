/**
 * 统计一个数字在排序数组中出现的次数
 * @param {number[]} arr
 * @param {number} target
 * @returns {number}
 */
const GetNumberOfK = (arr, target) => {
  let left = 0,
    right = arr.length - 1;
  let pos,
    count = 0;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (arr[mid] === target) {
      pos = mid;
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (pos !== undefined) {
    count++;
    right = left = pos;
    while (left--) {
      if (arr[left] === target) {
        count++;
      } else {
        break;
      }
    }

    while (right++) {
      if (arr[right] === target) {
        count++;
      } else {
        break;
      }
    }
  }

  return count;
};

// console.log(GetNumberOfK([1,2,2,2,2,4,5,6,7,8,9,10],2));
