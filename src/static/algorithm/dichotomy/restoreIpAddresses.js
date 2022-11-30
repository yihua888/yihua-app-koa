

/**
 * 复原IP地址
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。有效的 IP 地址正好由四个整数（每个整数位于 0 到 255 之间组成），整数之间用 '.' 分隔。
 */

/**
 * 复原IP地址
 * @param {string} s 
 * @returns 
 */
 const restoreIpAddresses = s => {
    const res = []
    const LEN = s.length
    if(LEN > 12 || LEN < 4) return []
    /**
     * @param {string} cur 
     * @param {number} pos 
     * @param {number} index 
     */
    const back = (cur,pos,index) => {
      if(pos === LEN && index === 4) res.push(cur.slice(1)) //去除第一个.。最开始走的''cur加上.之后变成.cur，所以最后需要去除.
      if(pos === LEN || index === 4) return ; //pos走到了没有元素的位置，或者index已经集满了4个IP段则需要结束
      // 只考虑一个
      back(`${cur}.${s.slice(pos,pos+1)}`,pos+1,index+1)
      // slice是起始位置到一个结束位置且不包含结束位置，所以如果到LEN - 1 ,end应该是END。所以下面小于LEN -1则可以取到LEN -2 到 LEN -1这两个元素
      if(s[pos] !== '0' && pos < LEN-1){
        // 假设两个，两个或者三个0都不能作为开始位置
        back(`${cur}.${s.slice(pos,pos+2)}`,pos+2,index+1)
        // 假设三个
        if(Number(s.slice(pos,pos+3)) <= 255 && pos < LEN-2){
          back(`${cur}.${s.slice(pos,pos+3)}`,pos+3,index+1)
        }
      }
    }
    back('',0,0)
    return res
  }
  
  // console.log(restoreIpAddresses('19216830'));