import { onMounted, reactive, watch, computed ,ref} from "vue";
import { createLine, LineDirection } from "@/utlis/canvasUtlis";
import dataStore, { CoordinateInfo, Line } from "@/store/data";
// type XY = [number, number];
interface Props {
  // lineXY: Array<[number, number]>;
  lineXY: Line;
}

export default function (Dom: any, props: Props) {
  const dataState = dataStore();

  const isShowBorder = ref(false)
  // 宽高
  const wh = reactive({
    w: 100,
    h: 100,
  });

  //
  const styleObj = computed(() => {
    const { lineXY } = props;
    const left =
      lineXY.start.xy[0] > lineXY.end.xy[0]
        ? lineXY.end.xy[0]
        : lineXY.start.xy[0];
    const top =
      lineXY.start.xy[1] > lineXY.end.xy[1]
        ? lineXY.end.xy[1]
        : lineXY.start.xy[1];

    return { left: left + "px", top: top + "px" };
  });

  // 封装绘制方法
  const draw = () => {
    const { lineXY } = props;

    const w = Math.abs(lineXY.start.xy[0] - lineXY.end.xy[0]);
    const h = Math.abs(lineXY.start.xy[1] - lineXY.end.xy[1]);
    wh.w = w;
    wh.h = h;

    const start: XY = lineXY.start.xy;
    const end: XY = lineXY.end.xy;
    let type: LineDirection = "lt-rb";

    // 线的方向
    if (start[0] < end[0] && start[1] < end[1]) {
      type = "lt-rb";
    } else if (start[0] > end[0] && start[1] < end[1]) {
      type = "rt-lb";
    } else if (start[0] < end[0] && start[1] > end[1]) {
      type = "lb-rt";
    } else if (start[0] > end[0] && start[1] > end[1]) {
      type = "rb-lt";
    }

    createLine({
      Dom: Dom.value,
      start: wh.w,
      end: wh.h,
      type,
      color:lineXY.color,
    });
  };

  // 右击事件
  const onLineRightClick=()=>{
    if(!isShowBorder.value)return
    console.log(232);
  }



  watch(props, () => {
    draw();
  });

  onMounted(() => {
    draw();
  });

  return { wh, draw, styleObj ,isShowBorder,onLineRightClick};
}
