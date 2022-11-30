import Graph from './index'
const  canFinish =  (numCourses, prerequisites) => {
    let list = new Graph(numCourses, prerequisites).list;
    let stack = [];
    list.forEach(node => node.in === 0 && stack.push(node))
    let count = 0
    while(stack.length){
        let node = stack.pop();
        count++
        while (node.next) {
            (--list[node.next.value].in) === 0 && stack.push(list[node.next.value]);
            node = node.next;
        }
    }

    return count === numCourses
};

console.log(canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]]));
console.log(canFinish(4, [[1, 0], [0, 1], [3, 1], [3, 2]]));