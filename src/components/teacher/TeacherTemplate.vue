<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-container>
      <el-aside class="nav-bar">
        <teacher-nav-bar />
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import MyHeader from "@/components/UI/Header.vue";
import TeacherNavBar from "@/components/teacher/TeacherNavBar.vue";
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.nav-bar {
  color: #333;
  width: 200px;
  min-height: 100%;
}
</style>
