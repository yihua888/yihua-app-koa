import Graph from './index'
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = (numCourses, prerequisites) => {
    let list = new Graph(numCourses, prerequisites).list;
    // 先找出入度为0的节点，因为入度为0的不依赖其他节点，有向无序图（拓扑排序）
    let stack = [], res = [];
    list.forEach(node => node.in === 0 && stack.push(node))
    while (stack.length) {
        let node = stack.pop();
        res.push(node.value);
        while (node.next) {
            //当前节点被插入之后，下一个节点的入度需要减一，当下一个节点的入度为0的时候也可以添加到入度为0的数组中
            (--list[node.next.value].in) === 0 && stack.push(list[node.next.value]);
            node = node.next;
        }
    }
    return numCourses !== res.length ? [] : res
}