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
    <!--      课表-->
    <div>
      <div class="content">
        <div class="class-table">
          <div class="table-wrapper">
            <div class="tabel-container">
              <table align="center">
                <thead>
                  <tr>
                    <th colspan="2" width="48" class="fw">课时</th>
                    <th
                      class="fw"
                      v-for="(item, index) in datelist"
                      :key="index"
                    >
                      <p>{{ item.week }}</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="4" class="wd amtdstyle">
                      <div class="fw">上</div>
                      <div class="amstle">午</div>
                    </td>
                    <td class="wd fw">1</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][0] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][0] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][0] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">2</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][1] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][1] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][1] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">3</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][2] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][2] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][2] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">4</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][3] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][3] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][3] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="4" class="wd pmtdstyle">
                      <div class="fw">下</div>
                      <div class="amstle">午</div>
                    </td>
                    <td class="wd fw">5</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][4] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][4] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][4] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">6</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][5] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][5] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][5] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">7</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][6] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][6] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][6] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">8</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][7] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][7] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][7] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="4" class="wd nitdstyle">
                      <div class="fw">晚</div>
                      <div class="amstle">上</div>
                    </td>
                    <td class="wd fw">9</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][8] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][8] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][8] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">10</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][9] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][9] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][9] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">11</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][10] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][10] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][10] }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="wd fw">12</td>
                    <td v-for="idx of 5">
                      <h1>{{ courseNames[idx - 1][11] }}</h1>
                      <p style="color: #909399">
                        {{ courseTeacherNames[idx - 1][11] }}
                      </p>
                      <p style="color: #909399">
                        {{ courseClassrooms[idx - 1][11] }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--      课程-->
    <div>
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
  get_semester_list,
  get_student_course_selection_list,
  delete_student_course_selection,
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
// pagination
const nowSelectedPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
// loading
const loading = ref();
// axios

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
  sliceStudentCourseSelectionList();
};
const handleSelectedRow = (param) => {
  nowSelectedRowData.value = param;
};

const changeSemester = (param) => {
  selectedSemester.value = param;
};
const refreshTable = async () => {
  searchForm.semester_id = selectedSemester.value;
  searchFormSelect.semester__semester_id = selectedSemester.value;
  await getStudentCourseSelectionList();
  nowSelectedPage.value = 1;
  sliceStudentCourseSelectionList();
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

// 课表相关
const courseNames = ref([[], [], [], [], []]);
const courseTeacherNames = ref([[], [], [], [], []]);
const courseClassrooms = ref([[], [], [], [], []]);
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
  courseNames.value = [[], [], [], [], []];
  courseTeacherNames.value = [[], [], [], [], []];
  courseClassrooms.value = [[], [], [], [], []];
  console.log(selectedCourses.value);
  selectedCourses.value.forEach((item) => {
    const day = weekDic[item.class_field.time];
    const startTime = item.class_field.start;
    const endTime = item.class_field.end;
    for (let i = startTime - 1; i < endTime; i++) {
      courseNames.value[day - 1][i] = item.class_field.course.name;
      courseClassrooms.value[day - 1][i] = item.class_field.classroom;
      courseTeacherNames.value[day - 1][i] = item.class_field.teacher.name;
    }
  });
};
const datelist = ref([
  {
    id: "1",
    week: "星期一",
  },
  {
    id: "2",
    week: "星期二",
  },
  {
    id: "3",
    week: "星期三",
  },
  {
    id: "4",
    week: "星期四",
  },
  {
    id: "5",
    week: "星期五",
  },
  {
    id: "6",
    week: "星期六",
  },
  {
    id: "7",
    week: "星期日",
  },
]);

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
<style lang="less" scoped>
.Micro_top {
  background-color: #fff;
  width: 1200px;
  margin: 0 auto;
  border-radius: 4px;

  padding-top: 24px;
  height: 120px;
  margin-bottom: 25px;
  .searchs,
  .searchd,
  .title {
    padding: 0 24px;
  }
  .searchs,
  .searchd,
  .versionbox {
    display: flex;
    font-size: 14px;
    color: #333333;
    margin-bottom: 24px;
    height: 24px;

    span {
      display: inline-block;
      font-weight: 600;

      font-size: 16px;
      color: #282d30;
      line-height: 24px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;

      // padding-top: 14px;
      padding-left: 26px;
      li {
        cursor: pointer;
        padding: 0 12px;
        font-size: 16px;
        color: #36363a;
        line-height: 24px;
        margin-right: 36px;
        min-width: 56px;
        height: 24px;
        line-height: 24px;
      }
      .active {
        background-color: #00c15d;
        border-radius: 5px;
        color: rgba(255, 255, 255, 1);
      }
    }
    em {
      line-height: 54px;
      font-style: normal;
      color: #00c15d;
      cursor: pointer;
      img {
        margin-left: 8px;
      }
    }
  }
}

+ .content {
  width: 1200px;
  margin: 0 auto;

  background-color: #fff;
}
</style>

<style lang="less" scoped>
.class-table {
  padding: 24px;
  background: #fff;
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
.wd {
  width: 48px !important;
}
table {
  border: 1px solid #f3f3f3;
  border-collapse: collapse;
  text-align: center;
}
tr,
th,
td {
  width: 150px;
  height: 80px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #f3f3f3;
}
td:hover {
  background: #ececec;
  .dis {
    display: block;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
  }
}
.wd:hover {
  background-color: #fff;
}
.amtdstyle:hover {
  background: #fce6bc;
}
.pmtdstyle:hover {
  background: #f7e7f6;
}
.nitdstyle:hover {
  background: #bcd6fc;
}
.fw {
  font-size: 14px;
  font-weight: 600;
}
.dis {
  display: none;
}
.fonts {
  font-weight: 400;
  font-size: 14px;
  color: #9899a1;
}
.amstle {
  padding-top: 200px;
  font-size: 16px;
  font-weight: 600;
}
.amtdstyle {
  background: #fce6bc;
  color: #ff7844;

  border-right: 0;
}
.pmtdstyle {
  background: #f7e7f6;
  color: #442e87;
  border-right: 0;
}
.nitdstyle {
  background: #bcd6fc;
  color: #447fff;
  border-right: 0;
}
/deep/ .el-button {
  width: 128px;
  height: 38px;
  background: #00c15d;
  border-radius: 8px;
}
td {
  height: 50px;
}
</style>
