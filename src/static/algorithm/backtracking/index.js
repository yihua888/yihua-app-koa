export default {}

/**
 * 回溯模板
let res = [];   //存储结果
function backtrack(path,condition,...){
    if(judge(condition)){  //满足条件
        res.push(path);
        return;
    }
    for(let select of selectList){
        if(剪枝条件) break;
        path.push(select);  // 走某条路
        backtrack(path,newSelectList);
        path.pop(); //返回上一个十字路口
    }
}
 */
