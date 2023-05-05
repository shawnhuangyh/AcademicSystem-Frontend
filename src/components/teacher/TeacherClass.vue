<template>
  <teacher-template>
    <div>
      <div class="form-buttons-box">
        <el-row>
          <el-col :span="22">
            <div class="form-box">
              <el-form
                label-position="left"
                label-width="30%"
                :model="searchForm"
              >
                <el-row :gutter="20" justify="center">
                  <el-col :span="8">
                    <el-form-item label="课程号">
                      <el-input
                        v-model="searchForm.course__course_id__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="课程名称">
                      <el-input
                        v-model="searchForm.course__name__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学期">
                      <el-select
                        v-model="searchForm.semester__semester_id"
                        @change="refreshTable"
                      >
                        <el-option
                          v-for="semester in semesters"
                          :label="semester.name"
                          :value="semester.semester_id"
                        />
                      </el-select>
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
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="course.course_id" label="课程号" width="180" />
          <el-table-column prop="course.name" label="课程名称" width="180" />
          <el-table-column prop="course.credit" label="学分" />
          <el-table-column prop="teacher.name" label="教师姓名" />
          <el-table-column :formatter="timeFormatter" label="上课时间" />
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
          @current-change="pageChange"
          :current-page="nowSelectedPage"
        />
      </div>
    </div>
  </teacher-template>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
import { get_class_list, get_semester_list } from "@/api";
import TeacherTemplate from "@/components/teacher/TeacherTemplate.vue";
import { getUser } from "@/utils/token";

// search
const searchForm = reactive({
  course__course_id__icontains: "",
  course__name__icontains: "",
  teacher__teacher_id: getUser(),
  semester__semester_id: 1,
});
// select options
const semesters = ref();
// table
const classes = ref();
const slicedClasses = ref();
// pagination
const nowSelectedPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
// loading
const loading = ref();
// axios
const getClassList = async () => {
  openLoading();
  const result = await get_class_list(searchForm);
  totalPage.value = result.data.length;
  if (result.status === 200) {
    classes.value = result.data;
  }
  closeLoading();
};
const sliceClassList = () => {
  slicedClasses.value = classes.value.slice(
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
// table contents
const timeFormatter = (row, col) => {
  return row.time + row.start + "-" + row.end;
};

// mouse events
const pageChange = (param) => {
  nowSelectedPage.value = param;
  sliceClassList();
};
const refreshTable = async () => {
  await getClassList();
  nowSelectedPage.value = 1;
  sliceClassList();
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
