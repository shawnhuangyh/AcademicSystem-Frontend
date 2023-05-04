<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-container>
      <el-aside class="nav-bar">
        <admin-nav-bar />
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import MyHeader from "@/components/UI/Header.vue";
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
