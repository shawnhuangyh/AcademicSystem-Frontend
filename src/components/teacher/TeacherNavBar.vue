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
      <el-menu-item index="/teacher/class">课程查询</el-menu-item>
      <el-menu-item index="/teacher/score">登记成绩</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical {
  width: 200px;
  min-height: 100%;
}
</style>
