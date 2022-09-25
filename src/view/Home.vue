<template>
  <div class="container" ref="container">
    <!-- <template > -->
      <Ggraphical
        :w="wh.width"
        :h="wh.height"
        @setLineXY="setLineXY"
        :txt="item.txt"
        :left="index * 120"
        :top="index * 120"
        :id="item.id"
        :type="item.type"
        v-for="(item, index) in dataState.data" :key="item.id"
      />

      <!-- <template v-for="(key, i) in item.son" :key="i"> -->
        <Line :lineXY="item" v-for="item in dataState.line" :key="item.id" />
      <!-- </template> -->
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
import Ggraphical from "@/components/Graphical/Graphical.vue";
import Line from "@/components/Line/Line.vue";
import { ref, reactive, onMounted,toRaw } from "vue";
import dataStore from "@/store/data";
import type {CoordinateInfo} from '@/store/data'
const dataState = dataStore();

const container = ref();
// 外面盒子的宽高
const wh = reactive({
  width: 0,
  height: 0,
});
// 线父级id
let fatherId=''


// 线的坐标
const lineXY: Array<CoordinateInfo> = reactive([]);

const setLineXY = (data: CoordinateInfo, id: string) => {
  lineXY.push(toRaw(data));
  if (lineXY.length === 3) lineXY.splice(0,2);
  if (lineXY.length === 2) {
    dataState.addLineXY(toRaw(lineXY), fatherId,id);
  }else{
    fatherId=id
  }
};

onMounted(() => {
  wh.width = container.value.offsetTop;
  wh.height = container.value.offsetLeft;
});
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
