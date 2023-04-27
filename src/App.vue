<script setup>
import { onMounted } from "vue";
import { setToken } from "@/utils/token";
import SelectCourse from "@/components/admin/Class.vue";
import StudentClass from "@/components/student/StudentClass.vue";
import Department from "@/components/admin/Department.vue";

onMounted(() => {
  setToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNjYxOTczLCJpYXQiOjE2ODI1NzU1MzUsImp0aSI6IjA5NzYzZTgwZDNhZTQyMWFhY2Q4YWQ2Mjk5NGVkYmMyIiwidXNlcl9pZCI6MX0.A_OE5TcFPS7d8OSMXWrNDPC6wbs5nxebVPyOnocdklU"
  );
});
</script>

<template>
  <!--  <department></department>-->
  <select-course />
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
