<template></template>

<script setup>
import { onMounted, ref } from "vue";
import { courseSelectionList } from "@/api";

const selectedClasses = ref();

const getSelectedClassesList = async (pageNum) => {
  const result = await courseSelectionList();
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
