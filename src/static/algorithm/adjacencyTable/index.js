//这里是一个简单的邻接表（面向试题编程），该结构在练习题部分有
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.in = 0;	//记录入度
    }
}

class Graph {
    constructor(nodeNum, edges) {
        this.list = []
        for (let i = 0; i < nodeNum; i++) {
            this.list.push(new Node(i))
        }

        let n1, n2, newNode = null;
        for (let edge of edges) {
            [n1, n2] = edge
            // n2是n1的先绝条件,n2->n1
            newNode = new Node(n1)
            // 将创建的节点插入n2和n2.next中间
            newNode.next = this.list[n2].next
            this.list[n2].next = newNode
            this.list[n1].in++
        }

    }
}

export default Graph

