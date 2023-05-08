<template>
  <student-template>
    <div>
      <div class="buttons-box">
        <el-select
          v-model="searchFormSelect.semester__semester_id"
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
        <el-button style="margin: 15px" @click="handleAddClick"
          >选课
        </el-button>
      </div>

      <div class="form-buttons-box">
        <el-row>
          <el-col :span="22">
            <div class="form-box">
              <el-form
                label-position="left"
                label-width="30%"
                :model="searchFormSelect"
              >
                <el-row :gutter="20" justify="center">
                  <el-col :span="12">
                    <el-form-item label="课程号">
                      <el-input
                        v-model="searchFormSelect.course__course_id__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课程名称">
                      <el-input
                        v-model="searchFormSelect.course__name__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" justify="center">
                  <el-col :span="12">
                    <el-form-item label="教师姓名">
                      <el-input
                        v-model="searchFormSelect.teacher__name__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="容量剩余">
                      <el-input
                        v-model="searchFormSelect.remaining_selection__gte"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="table-box">
        <el-table
          :data="slicedClasses"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="handleSelectedRowSelect"
        >
          <el-table-column prop="course.course_id" label="课程号" />
          <el-table-column prop="course.name" label="课程名称" />
          <el-table-column prop="course.credit" label="学分" />
          <el-table-column prop="teacher.name" label="教师姓名" />
          <el-table-column :formatter="timeFormatterSelect" label="上课时间" />
          <el-table-column prop="classroom" label="上课地点" />
          <el-table-column prop="max_selection" label="容量" />
          <el-table-column prop="current_selection" label="人数" />
        </el-table>
      </div>

      <div class="pagination-box">
        <el-pagination
          align="center"
          layout="prev, pager, next"
          :total="totalPage"
          :page-size="pageSize"
          @current-change="pageChangeSelect"
          :current-page="nowSelectedPageSelect"
        />
      </div>
    </div>
    <el-divider></el-divider>
    <div>
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
          <el-table-column prop="class_field.course.name" label="课程名称" />
          <el-table-column prop="class_field.course.credit" label="学分" />
          <el-table-column prop="class_field.teacher.name" label="教师姓名" />
          <el-table-column :formatter="timeFormatter" label="上课时间" />
          <el-table-column prop="class_field.classroom" label="上课地点" />
          <el-table-column prop="class_field.max_selection" label="容量" />
          <el-table-column prop="class_field.current_selection" label="人数" />
          <!--          <el-table-column prop="grade" label="综合成绩" />-->
          <!--          <el-table-column prop="gpa" label="绩点" />-->
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
  select_student_course_selection,
  get_user_info,
} from "@/api";
import { useRouter } from "vue-router";
import StudentTemplate from "@/components/student/StudentTemplate.vue";

// search
const selectedSemester = ref(1);
const semesters = ref();
// search
const searchForm = reactive({
  semester_id: 1,
});
const searchFormSelect = reactive({
  course__course_id__icontains: "",
  course__name__icontains: "",
  teacher__name__icontains: "",
  remaining_selection__gte: "",
  semester__semester_id: 1,
});
// select options
const days = ref(["一", "二", "三", "四", "五"]);
const times = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
// table
const classes = ref();
const slicedClasses = ref();
const selectedCourses = ref();
const slicedSelectedCourses = ref();
const nowSelectedRowData = ref();
const nowSelectedRowDataSelect = ref();
// pagination
const nowSelectedPageSelect = ref(1);
const nowSelectedPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
// loading
const loading = ref();
// userId
const userInfo = ref();
// axios
const getClassList = async () => {
  openLoading();
  console.log(searchFormSelect.semester__semester_id);
  const result = await get_class_list(searchFormSelect);
  totalPage.value = result.data.length;
  if (result.status === 200) {
    classes.value = result.data;
  }
  closeLoading();
};
const sliceClassList = () => {
  slicedClasses.value = classes.value.slice(
    pageSize.value * (nowSelectedPageSelect.value - 1),
    pageSize.value * nowSelectedPageSelect.value
  );
};
const getUserInfo = async () => {
  openLoading();
  const result = await get_user_info();
  if (result.status === 200) {
    userInfo.value = result.data;
  }
  console.log(userInfo.value);
  closeLoading();
};
const getStudentCourseSelectionList = async () => {
  openLoading();
  const result = await get_student_course_selection_list(searchForm);
  totalPage.value = result.data.length;
  if (result.status === 200) {
    selectedCourses.value = result.data;
  }
  closeLoading();
};
const sliceStudentCourseSelectionList = () => {
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
  const temp = {
    student_id: nowSelectedRowData.value.student.student_id,
    class_id: nowSelectedRowData.value.class_field.class_id,
  };
  await delete_student_course_selection(temp);
  await refreshTable();
  closeLoading();
};
const selectCourse = async () => {
  openLoading();
  const temp = {
    student_id: userInfo.value.student_id,
    class_id: nowSelectedRowDataSelect.value.class_id,
  };
  await select_student_course_selection(temp);
  await refreshTable();
  closeLoading();
};
// table contents

const timeFormatterSelect = (row, col) => {
  return row.time + row.start + "-" + row.end;
};
const timeFormatter = (row, col) => {
  return (
    row.class_field.time + row.class_field.start + "-" + row.class_field.end
  );
};

// mouse events
const pageChangeSelect = (param) => {
  nowSelectedPageSelect.value = param;
  sliceClassList();
};
const pageChange = (param) => {
  nowSelectedPage.value = param;
  sliceStudentCourseSelectionList();
};
const handleSelectedRowSelect = (param) => {
  nowSelectedRowDataSelect.value = param;
  console.log(nowSelectedRowDataSelect.value);
};
const handleSelectedRow = (param) => {
  nowSelectedRowData.value = param;
  console.log(nowSelectedRowData.value);
};
const handleAddClick = () => {
  if (!nowSelectedRowDataSelect.value) {
    ElMessage({
      type: "error",
      message: "未选中行",
    });
  } else {
    handleAdd();
  }
};
const handleAdd = () => {
  // 确认框
  ElMessageBox.confirm("是否确认选课?", "", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      console.log(haveSelectClass());
      if (!haveSelectClass()) {
        if (timeIsEmpty()) {
          selectCourse();
          ElMessage({
            type: "success",
            message: "选课操作成功",
          });
        } else {
          ElMessage({
            type: "warning",
            message: "与已选课程时间冲突，选课操作失败",
          });
        }
      } else {
        ElMessage({
          type: "warning",
          message: "已经选择该课程，选课操作失败",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "选课操作取消",
      });
    });
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
      if (nowSelectedRowData.value.can_drop) {
        deleteSelectedCourse();
        ElMessage({
          type: "success",
          message: "退课操作成功",
        });
      } else {
        ElMessage({
          type: "warning",
          message: "课程已有成绩，退课操作失败",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "退课操作取消",
      });
    });
};

const changeSemester = (param) => {
  selectedSemester.value = param;
};
const refreshTable = async () => {
  searchForm.semester_id = selectedSemester.value;
  searchFormSelect.semester__semester_id = selectedSemester.value;
  await getClassList();
  await getStudentCourseSelectionList();
  nowSelectedPage.value = 1;
  nowSelectedPageSelect.value = 1;
  sliceStudentCourseSelectionList();
  sliceClassList();
  generateClassesInfo();
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

// 避免同时间选课
const courseLabels = ref([[], [], [], [], []]);
const weekDic = reactive({
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
});
const generateClassesInfo = () => {
  courseLabels.value = [[], [], [], [], []];
  console.log(selectedCourses.value);
  selectedCourses.value.forEach((item) => {
    const day = weekDic[item.class_field.time];
    const startTime = item.class_field.start;
    const endTime = item.class_field.end;
    for (let i = startTime - 1; i < endTime; i++) {
      courseLabels.value[day - 1][i] = 1;
    }
  });
};
const timeIsEmpty = () => {
  const day = weekDic[nowSelectedRowDataSelect.value.time];
  const startTime = nowSelectedRowDataSelect.value.start;
  const endTime = nowSelectedRowDataSelect.value.end;
  for (let i = startTime - 1; i < endTime; i++) {
    if (courseLabels.value[day - 1][i] === 1) return false;
  }
  return true;
};
const haveSelectClass = () =>
  selectedCourses.value.filter(
    (item) =>
      item.class_field.course.course_id ===
      nowSelectedRowDataSelect.value.course.course_id
  ).length > 0;
onMounted(() => {
  getUserInfo();
  getSemesterList();
  refreshTable();
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
