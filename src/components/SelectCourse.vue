<template>
    <el-table :data="classes" stripe style="width: 100%">
        <el-table-column prop="course.course_id" label="课程号" width="180"/>
        <el-table-column prop="course.name" label="课程名称" width="180"/>
        <el-table-column prop="course.credit" label="学分"/>
        <el-table-column prop="teacher.name" label="教师姓名"/>
        <el-table-column prop="time" label="上课时间"/>
        <el-table-column prop="classroom" label="上课地点"/>
        <el-table-column prop="max_selection" label="容量"/>
        <el-table-column prop="current_selection" label="人数"/>
    </el-table>
    <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" :total="totalPage" @current-change="pageChange" />
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {classList} from "@/api";

const classes = ref();
const nowSelectedPage = ref(1);
const totalPage = ref(0);

const getClassList = async (pageNum) => {
    const result = await classList(pageNum)
    console.log(result)

    totalPage.value = result.data.count
    if (result.status === 200) {
        classes.value = result.data.results
    }
    console.log(classes.value)
}
const pageChange = (param) => {
    nowSelectedPage.value = param;
    getClassList(nowSelectedPage.value)
}
onMounted(() => {
    getClassList(nowSelectedPage.value);
})
</script>

<style scoped>
.example-pagination-block + .example-pagination-block {
    margin-top: 10px;
}
</style>