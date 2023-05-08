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
        <span>常用功能</span>
      </template>
      <el-menu-item index="/student/select">选课管理</el-menu-item>
      <el-menu-item index="/student/drop">退课管理</el-menu-item>
      <el-menu-item index="/student/course">查看课程</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical {
  width: 200px;
  min-height: 100%;
}
</style>
