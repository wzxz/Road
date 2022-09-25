// 圆
export const createRound = (
  Dom: any,
  x: number = 0,
  y: number = 0,
  size: number = 50
) => {
  const ctx = Dom.getContext("2d");
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
};

// 菱形
export const createDiamond = (Dom: any, w: number, h: number) => {
  const context = Dom.getContext("2d");
  // 无填充正方形
  // console.log(w, h);
  context.strokeRect(0, 0, w, h);
};

interface Line {
  Dom: any; //
  start: number; // 开始点
  end: number; // 结束点
  type: LineDirection; // 方向
  color?: string; // 颜色
}
// 线的四个方向
export type LineDirection = "lt-rb" | "rt-lb" | "rb-lt" | "lb-rt";

// 线
export const createLine = ({ Dom, start, end, type, color }: Line) => {
  const ctx = Dom.getContext("2d");
  ctx.clearRect(0, 0, start, end);
  let angle = 0;
  let moveTo: XY = [0, 0];
  let lineTo: XY = [0, 0];
  console.log(type);
  switch (type) {
    case "lt-rb":
      lineTo = [start, end];
      angle = 30;
      break;
    case "rt-lb":
      moveTo = [0, end];
      lineTo = [start, 0];
      angle = -180;
      break;
    case "lb-rt":
      moveTo = [0, end];
      lineTo = [start, 0];
      angle = -60;
      break;
    case "rb-lt":
      moveTo = [start, end];
      lineTo = [0, 0];
      angle = -130;
      break;
  }

  // 直线
  ctx.strokeStyle = color;
  ctx.moveTo(moveTo[0], moveTo[1]);
  ctx.lineTo(lineTo[0], lineTo[1]);
  ctx.stroke();
  ctx.save();
  // 画箭头
  ctx.translate(start / 2, end / 2); // 偏移
  ctx.rotate((angle * Math.PI) / 180);
  ctx.fillText("> > > >", 0, 0);
  ctx.restore();

  return ctx;
};
