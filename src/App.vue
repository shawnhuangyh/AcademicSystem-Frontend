<script setup>
import { onMounted } from "vue";
import { setToken } from "@/utils/token";
import SelectCourse from "@/components/SelectClass.vue";
import StudentClass from "@/components/StudentClass.vue";

onMounted(() => {
  setToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNDkxMDc0LCJpYXQiOjE2ODI0MDQ2NzQsImp0aSI6IjBhNTBlNTNhNTZmNTQyYTY5ZDdmYzFmYzUxMDYxNzRlIiwidXNlcl9pZCI6MX0.fuvg4hvY9HpXHx7NeP6TE-xMst55MoXa_BGsVUee6nE"
  );
});
</script>

<template>
  <select-course />
  <student-class />
</template>

<style scoped></style>
