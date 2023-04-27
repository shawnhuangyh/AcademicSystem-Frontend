<script setup>
import { onMounted } from "vue";
import { setToken } from "@/utils/token";
import SelectCourse from "@/components/admin/Class.vue";
import StudentClass from "@/components/student/StudentClass.vue";
import Department from "@/components/admin/Department.vue";

onMounted(() => {
  setToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNTcyMTI3LCJpYXQiOjE2ODI0ODU3MjcsImp0aSI6ImVjNzRiYzIyMGM1ZDQ1ZmNiMzc4Mjc1Yzg4NTQ5YmE3IiwidXNlcl9pZCI6MX0.BZ8hSD1KtFFj271msMhjmqYOXwLPpYa1BXTuKNNC-34"
  );
});
</script>

<template>
  <department></department>
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
