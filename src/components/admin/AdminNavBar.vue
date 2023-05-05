<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :default-openeds="['0', '1', '2']"
    router
    :default-active="$route.path"
  >
    <el-sub-menu index="0">
      <template #title>
        <span>教学管理</span>
      </template>
      <el-menu-item index="/admin/class">班级管理</el-menu-item>
      <el-menu-item index="/admin/course">课程管理</el-menu-item>
      <el-menu-item index="/admin/semester">学期管理</el-menu-item>
      <el-menu-item index="/admin/course_selection">选课管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="1">
      <template #title>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/admin/student">学生管理</el-menu-item>
      <el-menu-item index="/admin/teacher">教师管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <span>学校管理</span>
      </template>
      <el-menu-item index="/admin/department">学院管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical {
  width: 200px;
  min-height: 100%;
}
</style>
