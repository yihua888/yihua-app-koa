//给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素
const singleNumber = function (nums) {
    let num = nums[0];
    for (let i = 1; i < nums.length; i++) {
        // n*n = 0 , 0 ^n = n
        num ^= nums[i];
    }
    return num;
};