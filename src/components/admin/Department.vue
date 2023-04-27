<template>
  <div class="table-box">
    <el-table
      :data="departments"
      stripe
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="name" label="学院名称" width="180" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="phone" label="联系电话" />
    </el-table>
  </div>

  <div class="pagination-box">
    <el-pagination
      align="center"
      layout="prev, pager, next"
      :total="totalPage"
      @current-change="pageChange"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { departmentList } from "@/api";

// table
const departments = ref();
// pagination
const nowSelectedPage = ref(1);
const totalPage = ref(0);

const getDepartmentList = async () => {
  const result = await departmentList();
  // console.log(result);

  // totalPage.value = result.data.count;
  if (result.status === 200) {
    departments.value = result.data;
  }
  // console.log(departments.value);
};
const pageChange = (param) => {
  nowSelectedPage.value = param;
  getDepartmentList(nowSelectedPage.value);
};
onMounted(() => {
  getDepartmentList(nowSelectedPage.value);
});
</script>

<style scoped></style>
