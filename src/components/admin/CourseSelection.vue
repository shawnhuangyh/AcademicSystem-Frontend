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
                        v-model="
                          searchForm.class_field__course__course_id__icontains
                        "
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课程名称">
                      <el-input
                        v-model="
                          searchForm.class_field__course__name__icontains
                        "
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" justify="center">
                  <el-col :span="8">
                    <el-form-item label="教师姓名">
                      <el-input
                        v-model="
                          searchForm.class_field__teacher__name__icontains
                        "
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学生姓名">
                      <el-input
                        v-model="searchForm.student__name__icontains"
                        @focusout="refreshTable"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学期">
                      <el-select
                        v-model="searchForm.class_field__semester__semester_id"
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
          :data="slicedCourseSelections"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="handleSelectedRow"
        >
          <el-table-column prop="student.student_id" label="学号" />
          <el-table-column prop="student.name" label="学生姓名" />
          <el-table-column prop="class_field.course.course_id" label="课程号" />
          <el-table-column prop="class_field.course.name" label="课程名" />
          <el-table-column prop="class_field.teacher.name" label="教师姓名" />
          <el-table-column prop="gp" label="平时成绩" />
          <el-table-column prop="exam" label="考试成绩" />
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

      <!--  addDialog-->
      <el-dialog v-model="addDialogFormVisible" title="增加新选课">
        <el-form :model="addForm" ref="addFormRef" :rules="formRules">
          <el-form-item label="学生" label-width="140px" prop="student_id">
            <el-select v-model="addForm.student_id" placeholder="请选择学生">
              <el-option
                v-for="item in students"
                :label="item.name"
                :value="item.student_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学生学号" label-width="140px">
            <el-input
              disabled
              :placeholder="addForm.student_id"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="班级" label-width="140px" prop="class_id">
            <el-select v-model="addForm.class_id" placeholder="请选择班级">
              <el-option
                v-for="item in classes"
                :label="item.course.name + '(' + item.teacher.name + ')'"
                :value="item.class_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="平时成绩" label-width="140px" prop="gp">
            <el-input v-model="addForm.gp" placeholder="请输入学生平时成绩" />
          </el-form-item>
          <el-form-item label="考试成绩" label-width="140px" prop="exam">
            <el-input v-model="addForm.exam" placeholder="请输入学生考试成绩" />
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
      <el-dialog v-model="modifyDialogFormVisible" title="修改学期信息">
        <el-form :model="modifyForm" ref="modifyFormRef" :rules="formRules">
          <el-form-item label="学生" label-width="140px" prop="student_id">
            <el-select v-model="modifyForm.student_id" placeholder="请选择学生">
              <el-option
                v-for="item in students"
                :label="item.name"
                :value="item.student_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学生学号" label-width="140px">
            <el-input
              disabled
              :placeholder="modifyForm.student_id"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="班级" label-width="140px" prop="class_id">
            <el-select v-model="modifyForm.class_id" placeholder="请选择班级">
              <el-option
                v-for="item in classes"
                :label="item.course.name + '(' + item.teacher.name + ')'"
                :value="item.class_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="平时成绩" label-width="140px" prop="gp">
            <el-input
              v-model="modifyForm.gp"
              placeholder="请输入学生平时成绩"
            />
          </el-form-item>
          <el-form-item label="考试成绩" label-width="140px" prop="exam">
            <el-input
              v-model="modifyForm.exam"
              placeholder="请输入学生考试成绩"
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
  get_student_list,
  get_class_list,
  post_course_selection,
  delete_course_selection,
  put_course_selection,
  get_course_selection_list,
  get_semester_list,
} from "@/api";
import AdminTemplate from "@/components/admin/AdminTemplate.vue";

// search
const searchForm = reactive({
  class_field__course__course_id__icontains: "",
  class_field__course__name__icontains: "",
  class_field__teacher__name__icontains: "",
  student__name__icontains: "",
  class_field__semester__semester_id: 1,
});

//add
const addDialogFormVisible = ref(false);
const addFormRef = ref();
const addForm = reactive({
  student_id: "",
  class_id: "",
  gp: null,
  exam: null,
});
const formRules = reactive({
  student_id: [{ required: true, message: "请选择学生", trigger: "blur" }],
  class_id: [{ required: true, message: "请选择课程", trigger: "blur" }],
  gp: [{ required: false, message: "请输入学生平时成绩", trigger: "blur" }],
  exam: [{ required: false, message: "请输入学生考试成绩", trigger: "blur" }],
});
const modifyDialogFormVisible = ref(false);
const modifyFormRef = ref();
const modifyForm = reactive({
  course_selection_id: null,
  student_id: "",
  class_id: "",
  gp: null,
  exam: null,
});
// other info
const classes = ref();
const semesters = ref();
const students = ref();

// table
const courseSelections = ref();
const slicedCourseSelections = ref();
const nowSelectedRowData = ref();
// pagination
const nowSelectedPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
// loading
const loading = ref();
// axios
const getSemesterList = async () => {
  const result = await get_semester_list();
  if (result.status === 200) {
    semesters.value = result.data;
  }
};

const getClassList = async () => {
  const result = await get_class_list();
  if (result.status === 200) {
    classes.value = result.data;
  }
  console.log(classes.value);
};

const getStudentList = async () => {
  const result = await get_student_list();
  if (result.status === 200) {
    students.value = result.data;
  }
};

const getCourseSelectionList = async () => {
  openLoading();
  const result = await get_course_selection_list(searchForm);
  totalPage.value = result.data.length;
  if (result.status === 200) {
    courseSelections.value = result.data;
  }
  console.log(courseSelections.value);
  closeLoading();
};

const sliceCourseSelectionList = () => {
  slicedCourseSelections.value = courseSelections.value.slice(
    pageSize.value * (nowSelectedPage.value - 1),
    pageSize.value * nowSelectedPage.value
  );
};

const sliceCourseSelection = async () => {
  openLoading();
  await post_course_selection(addForm);
  await refreshTable();
  closeLoading();
};

const deleteStudent = async () => {
  openLoading();
  await delete_course_selection(nowSelectedRowData.value.course_selection_id);
  await refreshTable();
  closeLoading();
};

const putStudent = async () => {
  openLoading();
  await put_course_selection(
    nowSelectedRowData.value.course_selection_id,
    modifyForm
  );
  await refreshTable();
  closeLoading();
};

// mouse events
const pageChange = (param) => {
  nowSelectedPage.value = param;
  sliceCourseSelectionList();
};

const handleSelectedRow = (param) => {
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
  getCourseSelectionList();
  getClassList();
  getStudentList();
};

const refreshModifyForm = () => {
  modifyForm.course_selection_id = nowSelectedRowData.value.course_selection_id;
  modifyForm.student_id = nowSelectedRowData.value.student.student_id;
  modifyForm.class_id = nowSelectedRowData.value.class_field.class_id;
  modifyForm.gp = nowSelectedRowData.value.gp;
  modifyForm.exam = nowSelectedRowData.value.exam;
};

const resetForm = (formEl) => formEl.resetFields();

const handleAdd = async (formEl) => {
  await formEl.validate((valid) => {
    if (valid) {
      sliceCourseSelection();
      ElMessage({
        type: "success",
        message: "新增学生成功",
      });
      addDialogFormVisible.value = false;
      resetForm(formEl);
    } else {
      ElMessage({
        type: "error",
        message: "请填写完整的学生信息",
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
      deleteStudent();
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
      putStudent();
      ElMessage({
        type: "success",
        message: "修改学生成功",
      });
      modifyDialogFormVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "请填写完整的学生信息",
      });
    }
  });
};

const refreshTable = async () => {
  await getCourseSelectionList();
  nowSelectedPage.value = 1;
  sliceCourseSelectionList();
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
