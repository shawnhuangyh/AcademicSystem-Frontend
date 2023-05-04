<template>
  <admin-template>
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
                  <el-col :span="12">
                    <el-form-item label="课程号">
                      <el-input
                        v-model="searchForm.course__course_id__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课程名称">
                      <el-input
                        v-model="searchForm.course__name__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" justify="center">
                  <el-col :span="8">
                    <el-form-item label="教师姓名">
                      <el-input
                        v-model="searchForm.teacher__name__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="容量剩余">
                      <el-input
                        v-model="searchForm.remaining_selection__gte"
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
          <el-col :span="2">
            <div class="buttons-box">
              <el-row class="button-box">
                <el-button
                  @click="
                    addDialogFormVisible = true;
                    refreshDialogData();
                  "
                  >增加
                </el-button>
              </el-row>
              <el-row class="button-box">
                <el-button @click="handleDeleteClick">删除</el-button>
              </el-row>
              <el-row class="button-box">
                <el-button @click="handleModifyClick">修改</el-button>
              </el-row>
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
          @row-click="handleSelectedRow"
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

      <!--  addDialog-->
      <el-dialog v-model="addDialogFormVisible" title="增加新班级">
        <el-form :model="addForm" ref="addFormRef" :rules="formRules">
          <el-form-item label="课程名称" label-width="140px" prop="course_id">
            <el-select v-model="addForm.course_id" placeholder="请选择课程名称">
              <el-option
                v-for="course in courses"
                :label="course.name"
                :value="course.course_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="课程号" label-width="140px">
            <el-input
              disabled
              :placeholder="addForm.course_id"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item label="教师姓名" label-width="140px" prop="teacher_id">
            <el-select
              v-model="addForm.teacher_id"
              placeholder="请选择教师姓名"
            >
              <el-option
                v-for="item in teachers"
                :label="item.name"
                :value="item.teacher_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学期" label-width="140px" prop="semester_id">
            <el-select v-model="addForm.semester_id" placeholder="学期选择">
              <el-option
                v-for="semester in semesters"
                :label="semester.name"
                :value="semester.semester_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上课时间" label-width="140px" prop="time">
            <el-select v-model="addForm.time" placeholder="天">
              <el-option v-for="day in days" :label="day" :value="day" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" label-width="140px" prop="start">
            <el-select v-model="addForm.start" placeholder="开始节">
              <el-option v-for="time in times" :label="time" :value="time" />
            </el-select>
          </el-form-item>
          <el-form-item label="结束时间" label-width="140px" prop="end">
            <el-select v-model="addForm.end" placeholder="结束节">
              <el-option v-for="time in times" :label="time" :value="time" />
            </el-select>
          </el-form-item>
          <el-form-item label="上课教室" label-width="140px" prop="classroom">
            <el-input
              v-model="addForm.classroom"
              placeholder="请输入上课教室"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm(addFormRef)">重置</el-button>
            <el-button
              @click="
                addDialogFormVisible = false;
                resetForm(addFormRef);
              "
              >取消</el-button
            >
            <el-button type="primary" @click="handleAdd(addFormRef)">
              提交
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!--  modifyDialog-->
      <el-dialog v-model="modifyDialogFormVisible" title="修改班级信息">
        <el-form :model="modifyForm" ref="modifyFormRef" :rules="formRules">
          <el-form-item label="课程名称" label-width="140px" prop="course_id">
            <el-select
              v-model="modifyForm.course_id"
              placeholder="请选择课程名称"
            >
              <el-option
                v-for="course in courses"
                :label="course.name"
                :value="course.course_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="课程号" label-width="140px">
            <el-input
              disabled
              :placeholder="modifyForm.course_id"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item label="教师姓名" label-width="140px" prop="teacher_id">
            <el-select
              v-model="modifyForm.teacher_id"
              placeholder="请选择教师姓名"
            >
              <el-option
                v-for="item in teachers"
                :label="item.name"
                :value="item.teacher_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学期" label-width="140px" prop="semester_id">
            <el-select v-model="modifyForm.semester_id" placeholder="学期选择">
              <el-option
                v-for="semester in semesters"
                :label="semester.name"
                :value="semester.semester_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上课时间" label-width="140px" prop="time">
            <el-select v-model="modifyForm.time" placeholder="天">
              <el-option v-for="day in days" :label="day" :value="day" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" label-width="140px" prop="start">
            <el-select v-model="modifyForm.start" placeholder="开始节">
              <el-option v-for="time in times" :label="time" :value="time" />
            </el-select>
          </el-form-item>
          <el-form-item label="结束时间" label-width="140px" prop="end">
            <el-select v-model="modifyForm.end" placeholder="结束节">
              <el-option v-for="time in times" :label="time" :value="time" />
            </el-select>
          </el-form-item>
          <el-form-item label="上课教室" label-width="140px" prop="classroom">
            <el-input
              v-model="modifyForm.classroom"
              placeholder="请输入上课教室"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm(modifyFormRef)">重置</el-button>
            <el-button
              @click="
                modifyDialogFormVisible = false;
                resetForm(modifyFormRef);
              "
              >取消</el-button
            >
            <el-button type="primary" @click="handleModify(modifyFormRef)">
              提交
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </admin-template>
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
} from "@/api";
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import { useRouter } from "vue-router";
import AdminTemplate from "@/components/admin/AdminTemplate.vue";

// search
const searchForm = reactive({
  course__course_id__icontains: "",
  course__name__icontains: "",
  teacher__name__icontains: "",
  remaining_selection__gte: "",
  semester__semester_id: 1,
});
//add
const addDialogFormVisible = ref(false);
const addFormRef = ref();
const addForm = reactive({
  course_id: "",
  teacher_id: "",
  semester_id: "",
  time: "",
  start: "",
  end: "",
  classroom: "",
});
const formRules = reactive({
  course_id: [{ required: true, message: "请选择课程名称", trigger: "blur" }],
  teacher_id: [{ required: true, message: "请选择教师", trigger: "blur" }],
  semester_id: [{ required: true, message: "请选择学期", trigger: "blur" }],
  time: [{ required: true, message: "请选择上课时间", trigger: "blur" }],
  start: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
  end: [{ required: true, message: "请选择结束时间", trigger: "blur" }],
  classroom: [{ required: true, message: "请输入上课教室", trigger: "blur" }],
});
const modifyDialogFormVisible = ref(false);
const modifyFormRef = ref();
const modifyForm = reactive({
  class_id: "",
  course_name: "",
  course_id: "",
  teacher_id: "",
  semester_id: "",
  classroom: "",
  time: "",
  start: "",
  end: "",
});
// select options
const courses = ref();
const teachers = ref();
const semesters = ref();
const days = ref(["一", "二", "三", "四", "五"]);
const times = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
// table
const classes = ref();
const slicedClasses = ref();
const nowSelectedRowData = ref();
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
const postClass = async () => {
  openLoading();
  await post_class(addForm);
  await refreshTable();
  closeLoading();
};
const getTeacherList = async () => {
  const result = await get_teacher_list();
  if (result.status === 200) {
    teachers.value = result.data;
  }
};
const getCourseList = async () => {
  const result = await get_course_list();
  if (result.status === 200) {
    courses.value = result.data;
  }
};
const getSemesterList = async () => {
  const result = await get_semester_list();
  if (result.status === 200) {
    semesters.value = result.data;
  }
};
const deleteClass = async () => {
  openLoading();
  await delete_class(nowSelectedRowData.value.class_id);
  await refreshTable();
  closeLoading();
};
const putClass = async () => {
  openLoading();
  await put_class(modifyForm);
  await refreshTable();
  closeLoading();
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
const handleSelectedRow = (param) => {
  console.log(param);
  nowSelectedRowData.value = param;
};
const handleModifyClick = () => {
  if (!nowSelectedRowData.value) {
    ElMessage({
      type: "error",
      message: "未选中行",
    });
  } else {
    modifyDialogFormVisible.value = true;
    refreshDialogData();
    refreshModifyForm();
  }
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
const refreshDialogData = () => {
  getTeacherList();
  getCourseList();
  getSemesterList();
};
const refreshModifyForm = () => {
  modifyForm.class_id = nowSelectedRowData.value.class_id;
  modifyForm.course_id = nowSelectedRowData.value.course.course_id;
  modifyForm.course_name = nowSelectedRowData.value.course.course_name;
  modifyForm.teacher_id = nowSelectedRowData.value.teacher.teacher_id;
  modifyForm.semester_id = nowSelectedRowData.value.semester.semester_id;
  modifyForm.classroom = nowSelectedRowData.value.classroom;
  modifyForm.time = nowSelectedRowData.value.time;
  modifyForm.start = nowSelectedRowData.value.start;
  modifyForm.end = nowSelectedRowData.value.end;
};
const resetForm = (formEl) => formEl.resetFields();
const handleAdd = async (formEl) => {
  await formEl.validate((valid) => {
    if (valid) {
      postClass();
      ElMessage({
        type: "success",
        message: "新增课程成功",
      });
      addDialogFormVisible.value = false;
      resetForm(formEl);
    } else {
      ElMessage({
        type: "error",
        message: "请填写完整的课程信息",
      });
    }
  });
};
const handleDelete = () => {
  // 确认框
  ElMessageBox.confirm("是否删除当前选中行记录?", "", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteClass();
      ElMessage({
        type: "success",
        message: "删除操作成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除操作取消",
      });
    });
};
const handleModify = async (formEl) => {
  await formEl.validate((valid) => {
    if (valid) {
      putClass();
      ElMessage({
        type: "success",
        message: "修改课程成功",
      });
      modifyDialogFormVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "请填写完整的课程信息",
      });
    }
  });
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
  // setInterval(() => {
  //   console.log(totalPage.value);
  // }, 5000);
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
