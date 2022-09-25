<template>
  <!-- 最外层 -->
  <div
    class="canvas_box"
    draggable="true"
    :style="{
      top: data.y + 'px',
      left: data.x + 'px',
      width: width + 'px',
      height: height + 'px',
      borderColor: isShowBorder ? '#000' : 'transparent',
    }"
    @dragend="dragend($event)"
    @click="showBorder()"
    @dblclick="doubleClick"
  >
    <!-- @contextmenu.prevent="contextmenu($event)" -->
    <!-- 文本 -->
    <div class="txt" @dblclick="doubleClick">
      <span v-show="!isShowTxt">{{ txt }}</span>
      <el-input v-show="isShowTxt" ref="input" v-model="txt" @blur="blur()" />
    </div>
    <!-- 图形 -->
    <canvas
      ref="canvas"
      :class="props.type==='diamond'?'diamond':''"
      :width="width"
      :height="height"
    ></canvas>

    <!-- 4个圆点 -->
    <ul v-if="isShowBorder">
      <li
        v-for="(item, index) in dot"
        :key="index"
        @contextmenu.prevent.stop="onClickDot($event,item)"
      ></li>
    </ul>
  </div>
  <!-- <button @click="enlarge">放大</button> -->
</template>
<script setup lang="ts">
import { ref } from "vue";
import useGraphical from "./useGraphical";
import type {CoordinateInfo,DataType} from '@/store/data'
interface Props {
  w: number;
  h: number;
  txt: string;
  left: number;
  top: number;
  id: string;
  type:DataType
}

 interface Emit {
  (event: "setLineXY", data:CoordinateInfo,id:string): void;
}

const props = withDefaults(defineProps<Props>(), {
  w: 0,
  h: 0,
  txt: "",
  id: "",
});
const emit = defineEmits<Emit>();

const canvas = ref();
const input = ref();
const dot:Direction[] = ['top','right','bottom','left']

const {
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
} = useGraphical(canvas, input, props, emit);
</script>

<style lang="less" scoped>
.canvas_box {
  border: 1px solid #000;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    position: absolute;
    
    &.diamond{
      transform: rotate(45deg) scale(0.7);
      
    }
  }

  .txt {
    z-index: 999;
  }

  ul {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    // 圆点
    li {
      list-style: none;
      width: 5px;
      height: 5px;
      border: 1px solid #000;

      &:nth-child(1) {
        background-color: red;
        position: absolute;
        left: 50% - 7px;
        top: -5px;
      }
      &:nth-child(2) {
        background-color: red;
        position: absolute;
        right: -5px;
        top: 50% - 7px;
      }
      &:nth-child(3) {
        background-color: red;
        position: absolute;
        left: 50% - 7px;
        bottom: -5px;
      }
      &:nth-child(4) {
        background-color: red;
        position: absolute;
        left: -5px;
        top: 50% - 7px;
      }
    }
  }
}
</style>
