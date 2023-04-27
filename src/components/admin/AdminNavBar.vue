<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :default-openeds="['0', '1', '2']"
    :router="true"
    :default-active="activeIndex"
  >
    <el-sub-menu index="0">
      <template #title>
        <span>教学管理</span>
      </template>
      <el-menu-item index="/admin">班级管理</el-menu-item>
      <el-menu-item index="course">课程管理</el-menu-item>
      <el-menu-item index="semester">学期管理</el-menu-item>
      <el-menu-item index="course_selection">选课管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="1">
      <template #title>
        <span>用户管理</span>
      </template>
      <el-menu-item index="student">学生管理</el-menu-item>
      <el-menu-item index="teacher">教师管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <span>学校管理</span>
      </template>
      <el-menu-item index="department">学院管理</el-menu-item>
      <el-menu-item index="major">专业管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
</script>

<style scoped>
.el-menu-vertical {
  width: 200px;
  min-height: 100%;
}
</style>
