import { createRound, createDiamond } from "@/utlis/canvasUtlis";
import { ref, onMounted, reactive, onUpdated } from "vue";
import dataStore from "@/store/data";
import type { CoordinateInfo, DataType } from "@/store/data";

interface Calculate {
  x?: number;
  y?: number;
}
interface ComputedCenterPoint {
  left: number;
  top: number;
}
export interface Props {
  w: number;
  h: number;
  txt: string;
  left: number;
  top: number;
  id: string;
  type: DataType;
}
export interface Emit {
  (event: "setLineXY", data: CoordinateInfo, id: string): void;
}

export default function (Dom: any, input: any, props: Props, emit: Emit) {
  const dataState = dataStore();
  let timer = 0;

  const width = ref(100);
  const height = ref(100);
  const data = reactive({
    x: props.left,
    y: props.top,
  });
  const isShowBorder = ref(false);
  const txt = ref(props.txt);
  const isShowTxt = ref(false);
  // let oldLT = {
  //   left: props.left,
  //   top: props.top,
  // };

  // 计算宽高
  const calculate = ({ x, y }: Calculate) => {
    let res = 0;

    x && (res = x - props.h);
    y && (res = y - props.w);

    return res;
  };
  //   修改中心点
  const modifyCenterPoint = ({ left, top }: ComputedCenterPoint) => {
    const x = left + width.value / 2;
    const y = top + height.value / 2;
    dataState.addGraphicalXY(props.id, [x, y]);
  };
  // 失去焦点
  const blur = () => {
    isShowTxt.value = false;
  };

  // 最外层点击事件
  const showBorder = () => {
    clearTimeout(timer); //清除未执行的定时器
    timer = setTimeout(function () {
      isShowBorder.value = !isShowBorder.value;
    }, 250);
  };

  // 结束拖动事件
  const dragend = (e: DragEvent) => {
    data.x = e.clientX - props.h - Dom.value.offsetWidth / 2;
    data.y = e.clientY - props.w - Dom.value.offsetHeight / 2;
    modifyCenterPoint({
      left: data.x,
      top: data.y,
    });

    dataState.updataLineXY(props.id);
  };

  // 双击事件
  const doubleClick = () => {
    clearTimeout(timer);
    isShowTxt.value = true;
    input.value.focus();
  };

  // 右击事件
  const onClickDot = (e: MouseEvent, type: Direction) => {
    // console.log(type);
    let x = calculate({ x: e.clientX });
    let y = calculate({ y: e.clientY });
    let obj: CoordinateInfo = {
      xy: [x, y],
      type,
    };
    emit("setLineXY", obj, props.id);
  };

  // 更新生命周期
  // onUpdated(() => {
  //   createRound(Dom.value!, width.value / 2, height.value / 2, width.value / 2);
  // });

  // 挂载生命周期
  onMounted(() => {
    // 绘制图形
    if (props.type === "round") {
      createRound(Dom.value!, width.value / 2, height.value / 2);
    } else {
      createDiamond(Dom.value, width.value, height.value);
    }
    // 修改中心点
    modifyCenterPoint({ left: props.left, top: props.top });
  });

  return {
    data,
    width,
    height,
    isShowBorder,
    dragend,
    showBorder,
    doubleClick,
    isShowTxt,
    blur,
    onClickDot,
    txt,
  };
}
