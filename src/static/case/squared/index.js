/**
 * @param {Number} x 圆的中心的x坐标
 * @param {Number} y 圆的中心的y坐标
 * @param {Number} radius 圆的半径。
 * @param {Number} startAngle 	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
 * @param {Number} endAngle 结束角，以弧度计。
 * @param {Number} lineWidth 粗细
 * @param {string} color 颜色
 */
 export function CircleObj(
  x,
  y,
  radius,
  startAngle,
  endAngle,
  lineWidth,
  color
) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.lineWidth = lineWidth;
  this.color = color;
}

/**
 * @param {String} font
 * @param {String} text
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @param {Array | String} colors
 */
function TextObj(
  font = "",
  text = "",
  startX = "0",
  startY = "0",
  colors = "#1890FF",
  endX = null,
  endY = null
) {
  this.font = font;
  this.text = text;
  this.startX = startX;
  this.endX = endX;
  this.startY = startY;
  this.endY = endY;
  this.colors = colors;
}

class CanvasUtils {
  /**
   * @param {HTMLCanvasElement} cDOM
   * @param {Number} cWidth
   * @param {Number} cHeight
   */
  constructor(cDOM, cWidth, cHeight) {
    cDOM.height = cHeight;
    cDOM.width = cWidth;
    this.DOM = cDOM;
    this.ctx = cDOM.getContext("2d");
  }

  // 清空画布
  clear() {
    this.ctx.clearRect(0, 0, this.DOM.width, this.DOM.height);
  }

  /**
   * 九宫格图片
   * @param {string} originUrl 图片原地址
   * @param {number} top 第一条切割线距离原图片顶部的距离
   * @param {number} bottom 第二条切割线距离原图片底部的距离
   * @param {number} left 第三条切割线距离原图片左侧的距离
   * @param {number} right 第四条切割线距离原图片右侧的距离
   * @param {Function} successCb 成功回调函数，参数为dom
   * @param {Function} errorCb 失败回调函数，参数为error对象
   */
  drawSquaredImg(
    originUrl,
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
    successCb = () => {},
    errorCb = () => {}
  ) {
    const img = new Image();
    img.src = originUrl;
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const cw = this.DOM.width;
      const ch = this.DOM.height;
      const ctx = this.ctx;
      // 第一块;
      ctx.drawImage(img, 0, 0, left, top, 0, 0, left, top);
      // 第二块
      ctx.drawImage(
        img,
        left,
        0,
        w - right - left,
        top,
        left,
        0,
        cw - right - left,
        top
      );
      // 第三块
      ctx.drawImage(img, w - right, 0, right, top, cw - right, 0, right, top);
      // 第四块;
      ctx.drawImage(
        img,
        0,
        top,
        left,
        h - top - bottom,
        0,
        top,
        left,
        ch - bottom - top
      );
      // 第五块
      ctx.drawImage(
        img,
        left,
        top,
        w - right - left,
        h - top - bottom,
        left,
        top,
        cw - left - right,
        ch - top - bottom
      );
      // 第六块
      ctx.drawImage(
        img,
        w - right,
        top,
        right,
        h - top - bottom,
        cw - right,
        top,
        right,
        ch - top - bottom
      );
      // 第七块
      ctx.drawImage(
        img,
        0,
        h - bottom,
        left,
        bottom,
        0,
        ch - bottom,
        left,
        bottom
      );
      // 第八块
      ctx.drawImage(
        img,
        left,
        h - bottom,
        w - right - left,
        bottom,
        left,
        ch - bottom,
        cw - left - right,
        bottom
      );
      // 第九块
      ctx.drawImage(
        img,
        w - right,
        h - bottom,
        right,
        bottom,
        cw - right,
        ch - bottom,
        right,
        bottom
      );
      successCb(this.DOM);
    };
    img.onerror = (err) => errorCb(err);
  }
  /**
   * @param {CircleObj} circleObj
   */
  drawCircle(circleObj) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(
      circleObj.x,
      circleObj.y,
      circleObj.radius,
      circleObj.startAngle,
      circleObj.endAngle
    );
    //设定曲线粗细度
    ctx.lineWidth = circleObj.lineWidth;
    //给曲线着色
    ctx.strokeStyle = circleObj.color;
    //连接处样式
    ctx.lineCap = "round";
    //给环着色
    ctx.stroke();
    ctx.closePath();
  }

  createLinearGrad(startX, startY, endX, endY, colors) {
    const gradient = this.ctx.createLinearGradient(startX, startY, endX, endY);
    colors.forEach((grd) => {
      gradient.addColorStop(grd.offset, grd.color);
    });
    return gradient;
  }

  /**
   * @param {TextObj} textObj
   */
  drawText(textObj) {
    const ctx = this.ctx;
    ctx.font = textObj.font;
    if (typeof textObj.colors === "object") {
      ctx.fillStyle = this.createLinearGrad(
        textObj.startX,
        textObj.startY,
        textObj.endX,
        textObj.endY,
        textObj.colors
      );
      ctx.fillText(textObj.text, textObj.startX, textObj.startY);
    } else {
      ctx.fillStyle = textObj.colors;
      ctx.fillText(textObj.text, textObj.startX, textObj.startY);
    }
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} r
   * @param {Number} startAngle
   * @param {Number} endAngle
   * @param {Number} lineWidth
   * @param {String } bgColor
   * @param {String } color
   * @param {Number} percentage
   * @param {Array<TextObj>} textConfig
   */
  drawAnnularProgress(
    x,
    y,
    r,
    startAngle,
    endAngle,
    lineWidth,
    bgColor,
    color,
    percentage,
    textConfig = []
  ) {
    // 绘制底图
    const bgCircle = new CircleObj(
      x,
      y,
      r,
      startAngle,
      endAngle,
      lineWidth,
      bgColor
    );
    this.drawCircle(bgCircle);
    // 绘制进度
    const perEnd = percentage * (endAngle - startAngle) + startAngle;
    const perCircle = new CircleObj(
      x,
      y,
      r,
      startAngle,
      perEnd,
      lineWidth,
      color
    );
    this.drawCircle(perCircle);
    // 绘制文本
    textConfig.forEach((text) => {
      this.drawText(text);
    });
  }

  /**
   * 画线
   * @param {Number} startX 
   * @param {Number} startY 
   * @param {Number} endX 
   * @param {Number} endY 
   * @param {Number} lineWidth 
   * @param {Array | String} colors 
   */
  drawLine(startX, startY, endX, endY, lineWidth, colors) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.lineCap = "round";
    if (typeof colors === "string") {
      ctx.strokeStyle = colors;
    } else {
      ctx.strokeStyle = this.createLinearGrad(
        startX,
        startY,
        endX,
        endY,
        colors
      );
    }
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  /**
   * @param {Number} startX 背景起始x
   * @param {Number} startY 背景起始y
   * @param {Number} endX 背景结束x
   * @param {Number} endY 背景结束y
   * @param {Number} lineWidth 进度条粗细
   * @param {String | Array} bgColors 背景颜色
   * @param {String | Array} colors 进度颜色
   * @param {Number} percentage 进度
   * @param {Array} textConfig 文本配置
   */
  drawProgress(
    startX,
    startY,
    endX,
    endY,
    lineWidth,
    bgColors,
    colors,
    percentage,
    textConfig = []
  ) {
    // 绘制底部
    this.drawLine(startX, startY, endX, endY, lineWidth, bgColors);
    const perEndY = percentage * (endY - startY) + startY;
    const perEndX = percentage * (endX - startX) + startX;
    // 绘制进度
    this.drawLine(startX, startY, perEndX, perEndY, lineWidth, colors);
    // 绘制文本
    textConfig.forEach((text) => {
      this.drawText(text);
    });
  }

}

export default CanvasUtils;
