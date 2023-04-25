<template>
  {{ data }}
</template>

<script setup>
import {departmentList} from "@/api";
import {onMounted, ref} from "vue";

const data = ref()

const getDepartmentList = async () => {
    const result = await departmentList({})
    if (result.status === 200) {
        data.value = result.data.results
    }
    console.log(data.value)
}

onMounted(() => {
    getDepartmentList();
})
</script>

<style scoped>

</style>