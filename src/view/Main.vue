<template>
  <div class="main">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.main {
  .el-header {
    background-color: #c6e2ff;
  }
  .el-aside {
    background-color: #d9ecff;
  }
  .el-main {
    background-color: #ecf5ff;
  }
}
</style>
