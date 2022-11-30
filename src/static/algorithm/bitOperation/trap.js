const trap = (arr) => {
    if (!arr.length) return 0;
    let left = 0, right = arr.length - 1, res = 0 , leftHeight = 0 , rightHeight = 0;
    while(left < right){
        if(arr[left] < arr[right]){
            // 如果右边有高于左边的柱子时，则可以知道短板最小为当前的左柱子，
            // 那么当前柱子能接到的雨水为leftHeight - arr[left]，leftHeight代表左柱子最高的
            leftHeight = Math.max(leftHeight , arr[left])
            res += leftHeight - arr[left]
            left++
        }else{
            // 如果右边有低于左边的柱子时，则可以知道右边短板最小为当前的右柱子，
            // 那么当前柱子能接到的雨水为rightHeight, arr[right]，rightHeight代表左柱子最高的
            rightHeight = Math.max(rightHeight, arr[right])
            res += rightHeight - arr[right]
            right--
        }
    }
    return res
}
// console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))