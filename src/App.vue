<script setup>
import { onMounted } from "vue";
import { setToken } from "@/utils/token";
import SelectCourse from "@/components/admin/SelectClass.vue";
import StudentClass from "@/components/student/StudentClass.vue";
import Department from "@/components/admin/Department.vue";

onMounted(() => {
  setToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNDkxMDc0LCJpYXQiOjE2ODI0MDQ2NzQsImp0aSI6IjBhNTBlNTNhNTZmNTQyYTY5ZDdmYzFmYzUxMDYxNzRlIiwidXNlcl9pZCI6MX0.fuvg4hvY9HpXHx7NeP6TE-xMst55MoXa_BGsVUee6nE"
  );
});
</script>

<template>
  <department></department>
  <!--  <select-course />-->
  <!--  <student-class />-->
</template>

<style>
.pagination-box {
  width: 100%;
  margin: 5px auto;
}
.el-pagination {
  justify-content: center;
}
</style>
