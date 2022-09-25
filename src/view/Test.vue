<template>
  <!-- <div
    class="txt"
    draggable="true"
    @dragstart="dragstart($event)"
    @dragend="dragend($event)"
  >
    测试一下 {{ store.num }}
  </div>
  <button @click="onClick">点一下</button> -->

  <div
    class="box"
    draggable="true"
    ref="box"
    @dragend="dragend($event)"
    :style="{ top: data.y + 'px', left: data.x + 'px' }"
  >
    区域
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, HTMLAttributes } from "vue";

const data = reactive({
  x: 92,
  y: 82,
});

const box = ref();

const dragend = (e: DragEvent) => {
  console.log("结束拖动了", e);
  data.x = e.clientX - box.value.offsetWidth / 2;
  data.y = e.clientY - box.value.offsetHeight / 2;
};
</script>

<style>
.box {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  position: absolute;
  /* left: 0;
  top: 0; */
}
.txt {
  border: 1px solid #000;
}
</style>