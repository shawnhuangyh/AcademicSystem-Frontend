<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref } from "vue";
import StudentTemplate from "@/components/student/StudentTemplate.vue";
import { get_semester_list, get_student_course_selection_list } from "@/api";
import { ElLoading } from "element-plus";
const myChart = ref();
const initEchart = () => {
  let chartDom = document.getElementById("main");
  myChart.value = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: "category",
      data: courseNames.value,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: courseScores.value,
        type: "bar",
      },
    ],
  };

  option && myChart.value.setOption(option);
};
const changeEchart = () => {
  myChart.value.setOption({
    xAxis: {
      type: "category",
      data: courseNames.value,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: courseScores.value,
        type: "bar",
      },
    ],
  });
};
const semesters = ref();
const selectedSemester = ref(1);
const selectedCourses = ref();
// search
const searchForm = reactive({
  semester_id: 1,
});
// loading
const loading = ref();
const getSemesterList = async () => {
  const result = await get_semester_list();
  if (result.status === 200) {
    semesters.value = result.data;
  }
};
const changeSemester = (param) => {
  selectedSemester.value = param;
};
const getStudentCourseSelectionList = async () => {
  openLoading();
  const result = await get_student_course_selection_list(searchForm);
  if (result.status === 200) {
    selectedCourses.value = result.data;
  }
  console.log(selectedCourses.value);
  closeLoading();
};
const courseNames = ref([]);
const courseScores = ref([]);
const generateEchartData = () => {
  courseScores.value = [];
  courseNames.value = [];
  selectedCourses.value.forEach((item) => {
    courseNames.value.push(item.class_field.course.name);
    courseScores.value.push(item.gpa);
  });
};
const refreshTable = async () => {
  await getStudentCourseSelectionList();
  generateEchartData();
  changeEchart();
};
const openLoading = () => {
  loading.value = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0,0,0,0.5)",
  });
};
const closeLoading = () => {
  loading.value.close();
};
onMounted(() => {
  refreshTable();
  getSemesterList();
  initEchart();
});
</script>

<template>
  <student-template>
    <div class="buttons-box">
      <el-select
        v-model="searchForm.semester_id"
        @change="
          changeSemester($event);
          refreshTable();
        "
      >
        <el-option
          v-for="semester in semesters"
          :label="semester.name"
          :value="semester.semester_id"
        />
      </el-select>
    </div>
    <div style="height: 600px; width: 100%" id="main"></div>
  </student-template>
</template>

<style scoped></style>
