<template>
  <div class="line">
    <canvas
      :width="wh.w"
      :height="wh.h"
      ref="canvas"
      :style="styleObj"
      :class="isShowBorder ? 'border' : ''"
      @click="isShowBorder = !isShowBorder"
      @contextmenu.prevent.stop="onLineRightClick()"
    ></canvas>
   
  </div>
  <!-- :style="{ left: wh.h + 'px', top: wh.w + 'px' }" -->
</template>

<script setup lang="ts">
import { reactive, ref, onUpdated } from "vue";
import useLine from "./useLine";
interface Props {
  lineXY: any;
}
const canvas = ref();

const props = withDefaults(defineProps<Props>(), {});

const { styleObj, wh, draw, onLineRightClick, isShowBorder } = useLine(
  canvas,
  props
);

onUpdated(() => {
  draw();
});
</script>

<style scoped lang="less">
canvas {
  position: absolute;
  border: 1px solid transparent;

  &.border {
    border: 1px solid #000;
  }
}
</style>
