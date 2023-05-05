<template>
  <student-template>
    <div>
      <div class="buttons-box">
        <el-select v-model="searchForm.semester_id" @change="refreshTable">
          <el-option
            v-for="semester in semesters"
            :label="semester.name"
            :value="semester.semester_id"
          />
        </el-select>
        <el-button style="margin: 15px" @click="handleDeleteClick"
          >退课</el-button
        >
      </div>

      <div class="table-box">
        <el-table
          :data="slicedSelectedCourses"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="handleSelectedRow"
        >
          <el-table-column prop="class_field.course.course_id" label="课程号" />
          <el-table-column prop="class_field.course.name" label="课程名" />
          <el-table-column prop="class_field.course.credit" label="学分" />
          <el-table-column prop="class_field.teacher.name" label="教师姓名" />
          <el-table-column :formatter="timeFormatter" label="上课时间" />
          <el-table-column prop="class_field.classroom" label="上课地点" />
          <el-table-column prop="class_field.max_selection" label="容量" />
          <el-table-column prop="class_field.current_selection" label="人数" />
          <el-table-column prop="grade" label="综合成绩" />
          <el-table-column prop="gpa" label="绩点" />
        </el-table>
      </div>

      <div class="pagination-box">
        <el-pagination
          align="center"
          layout="prev, pager, next"
          :total="totalPage"
          :page-size="pageSize"
          @current-change="pageChange"
          :current-page="nowSelectedPage"
        />
      </div>
    </div>
  </student-template>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
import {
  get_class_list,
  delete_class,
  get_teacher_list,
  get_course_list,
  get_semester_list,
  post_class,
  put_class,
  get_student_course_selection_list,
  delete_student_course_selection,
} from "@/api";
import { useRouter } from "vue-router";
import StudentTemplate from "@/components/student/StudentTemplate.vue";

// search
const semesters = ref();
// search
const searchForm = reactive({
  semester_id: 1,
});
// select options
const days = ref(["一", "二", "三", "四", "五"]);
const times = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
// table

const selectedCourses = ref();
const slicedSelectedCourses = ref();
const nowSelectedRowData = ref();
// pagination
const nowSelectedPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
// loading
const loading = ref();
// axios
const getSelectedCourseList = async () => {
  openLoading();
  const result = await get_student_course_selection_list(searchForm);
  totalPage.value = result.data.length;
  if (result.status === 200) {
    selectedCourses.value = result.data;
  }
  closeLoading();
};
const sliceSelectedCourseList = () => {
  slicedSelectedCourses.value = selectedCourses.value.slice(
    pageSize.value * (nowSelectedPage.value - 1),
    pageSize.value * nowSelectedPage.value
  );
};
const getSemesterList = async () => {
  const result = await get_semester_list();
  if (result.status === 200) {
    semesters.value = result.data;
  }
};
const deleteSelectedCourse = async () => {
  openLoading();
  await delete_student_course_selection(
    nowSelectedRowData.value.course_selection_id
  );
  await refreshTable();
  closeLoading();
};
// table contents
const timeFormatter = (row, col) => {
  return (
    row.class_field.time + row.class_field.start + "-" + row.class_field.end
  );
};

// mouse events
const pageChange = (param) => {
  nowSelectedPage.value = param;
  sliceSelectedCourseList();
};
const handleSelectedRow = (param) => {
  nowSelectedRowData.value = param;
  console.log(nowSelectedRowData.value);
};
const handleDeleteClick = () => {
  if (!nowSelectedRowData.value) {
    ElMessage({
      type: "error",
      message: "未选中行",
    });
  } else {
    handleDelete();
  }
};
const handleDelete = () => {
  // 确认框
  ElMessageBox.confirm("是否确认退课?", "", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteSelectedCourse();
      ElMessage({
        type: "success",
        message: "退课操作成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "退课操作取消",
      });
    });
};
const refreshTable = async () => {
  await getSelectedCourseList();
  nowSelectedPage.value = 1;
  sliceSelectedCourseList();
};

// loading
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
});
</script>

<style scoped>
.form-buttons-box {
  width: 80%;
  margin: 0 auto;
  height: 120px;
}

.form-box {
  margin: 15px 0;
}

.table-box {
  width: 100%;
  margin: 0 auto;
}

.button-box {
  margin: 5px 0 5px 20px;
}

.small-input-box {
  width: 60%;
}
</style>
