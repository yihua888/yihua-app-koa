/**
 * 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。
 * 你从其中的一个加油站出发，开始时油箱为空。如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1
 * 1. gas - cost >= 0才能绕场一周，以此思想判断能否行驶一周
 * 2. 从正确初始位置开始，拥有的汽油总是比消耗的汽油多,以此思想寻找初始位置
 */

/**
 * @param {number[]} gas 
 * @param {number[]} cost 
 * @returns {number}
 */
const canCompleteCircuit = (gas, cost) => {
  let cur = 0, total = 0,start = 0
  for (let i = 0; i < gas.length; i++) {
    total += gas[i] - cost[i]
    if (cur < 0) {
      start = i
      cur = gas[i] - cost[i]
    }else cur += gas[i] - cost[i]
  }
  return total >= 0 ? start : -1
}

// console.log(canCompleteCircuit([3,4,5,6,7,8,9],[4,8,3,6,7,9,4]))
