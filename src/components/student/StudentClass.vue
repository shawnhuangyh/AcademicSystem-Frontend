<template></template>

<script setup>
import { onMounted, ref } from "vue";
import { get_course_selection_list } from "@/api";

const selectedClasses = ref();

const getSelectedClassesList = async (pageNum) => {
  const result = await get_course_selection_list();
  console.log(result);

  if (result.status === 200) {
    selectedClasses.value = result.data.results;
  }
  console.log(selectedClasses.value);
};
onMounted(() => {
  getSelectedClassesList();
});
</script>

<style scoped></style>
