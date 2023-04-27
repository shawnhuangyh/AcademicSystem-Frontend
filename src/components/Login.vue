<template>
  <el-form label-position="left" label-width="25%" :model="searchForm">
    <el-row :gutter="20" justify="center">
      <el-col :span="12">
        <el-form-item label="课程号">
          <el-input />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="课程名称">
          <el-input />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup></script>

<style scoped></style>
