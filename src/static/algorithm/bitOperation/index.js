export default {}

// 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号

const Add = (num1, num2) => num2 ? Add(num1 ^ num2, (num1 & num2) << 1) : num1
// console.log(Add(2,3));


/**
 * @param {number[]} arr 
 * @returns 
 */



