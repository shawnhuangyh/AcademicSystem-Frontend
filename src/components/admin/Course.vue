<template>
  <admin-template>
    <div>
      <div class="button-box">
        <el-button
          @click="
            addDialogFormVisible = true;
            refreshDialogData();
          "
          >增加
        </el-button>
        <el-button @click="handleDeleteClick">删除</el-button>
        <el-button @click="handleModifyClick">修改</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="slicedCourses"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="handleSelectedRow"
        >
          <el-table-column prop="course_id" label="课程号" width="180" />
          <el-table-column prop="name" label="课程名" width="180" />
          <el-table-column prop="credit" label="课程学分" />
          <el-table-column prop="gp_percentage" label="平时分占比" />
          <el-table-column prop="dept.name" label="开课学院" />
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
      <el-dialog v-model="addDialogFormVisible" title="增加新课程">
        <el-form :model="addForm" ref="addFormRef" :rules="formRules">
          <el-form-item label="课程编号" label-width="140px" prop="course_id">
            <el-input
              v-model="addForm.course_id"
              placeholder="请输入课程编号"
            />
          </el-form-item>
          <el-form-item label="课程名" label-width="140px" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入课程名" />
          </el-form-item>
          <el-form-item label="学分" label-width="140px" prop="credit">
            <el-input v-model="addForm.credit" placeholder="请输入课程学分" />
          </el-form-item>
          <el-form-item
            label="平时成绩占比"
            label-width="140px"
            prop="gp_percentage"
          >
            <el-input
              v-model="addForm.gp_percentage"
              placeholder="请输入平时成绩占比"
            />
          </el-form-item>
          <el-form-item label="开课学院" label-width="140px" prop="dept_id">
            <el-select v-model="addForm.dept_id" placeholder="请输入开课学院">
              <el-option
                v-for="item in departments"
                :label="item.name"
                :value="item.dept_id"
              />
            </el-select>
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
      <el-dialog v-model="modifyDialogFormVisible" title="修改学院信息">
        <el-form :model="modifyForm" ref="modifyFormRef" :rules="formRules">
          <el-form-item label="课程编号" label-width="140px" prop="course_id">
            <el-input
              v-model="modifyForm.course_id"
              placeholder="请输入课程编号"
            />
          </el-form-item>
          <el-form-item label="课程名" label-width="140px" prop="name">
            <el-input v-model="modifyForm.name" placeholder="请输入课程名" />
          </el-form-item>
          <el-form-item label="学分" label-width="140px" prop="credit">
            <el-input
              v-model="modifyForm.credit"
              placeholder="请输入课程学分"
            />
          </el-form-item>
          <el-form-item
            label="平时成绩占比"
            label-width="140px"
            prop="gp_percentage"
          >
            <el-input
              v-model="modifyForm.gp_percentage"
              placeholder="请输入平时成绩占比"
            />
          </el-form-item>
          <el-form-item label="开课学院" label-width="140px" prop="dept_id">
            <el-select
              v-model="modifyForm.dept_id"
              placeholder="请输入开课学院"
            >
              <el-option
                v-for="item in departments"
                :label="item.name"
                :value="item.dept_id"
              />
            </el-select>
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
  get_department_list,
  post_course,
  delete_course,
  put_course,
  get_course_list,
} from "@/api";
import AdminTemplate from "@/components/admin/AdminTemplate.vue";

//add
const addDialogFormVisible = ref(false);
const addFormRef = ref();
const addForm = reactive({
  course_id: "",
  name: "",
  credit: "",
  gp_percentage: "",
  dept_id: "",
});
const formRules = reactive({
  course_id: [{ required: true, message: "请输入课程编号", trigger: "blur" }],
  name: [{ required: true, message: "请输入课程名", trigger: "blur" }],
  credit: [{ required: true, message: "请输入课程学分", trigger: "blur" }],
  gp_percentage: [
    { required: true, message: "请输入平时成绩占比", trigger: "blur" },
  ],
  dept_id: [{ required: true, message: "请输入开课学院", trigger: "blur" }],
});
const modifyDialogFormVisible = ref(false);
const modifyFormRef = ref();
const modifyForm = reactive({
  course_id: "",
  name: "",
  credit: "",
  gp_percentage: "",
  dept_id: "",
});
// other info
const departments = ref();
// table
const courses = ref();
const slicedCourses = ref();
const nowSelectedRowData = ref();
// pagination
const nowSelectedPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
// loading
const loading = ref();
// axios
const getDepartmentList = async () => {
  const result = await get_department_list();
  if (result.status === 200) {
    departments.value = result.data;
  }
};
const getCourseList = async () => {
  openLoading();
  const result = await get_course_list();
  totalPage.value = result.data.length;
  if (result.status === 200) {
    courses.value = result.data;
  }
  closeLoading();
};
const sliceCourseList = () => {
  slicedCourses.value = courses.value.slice(
    pageSize.value * (nowSelectedPage.value - 1),
    pageSize.value * nowSelectedPage.value
  );
};

const postCourse = async () => {
  openLoading();
  await post_course(addForm);
  await refreshTable();
  closeLoading();
};
const deleteCourse = async () => {
  openLoading();
  await delete_course(nowSelectedRowData.value.course_id);
  await refreshTable();
  closeLoading();
};
const putCourse = async () => {
  openLoading();
  await put_course(modifyForm);
  await refreshTable();
  closeLoading();
};

// mouse events
const pageChange = (param) => {
  nowSelectedPage.value = param;
  sliceCourseList();
};
const handleSelectedRow = (param) => {
  console.log(param);
  nowSelectedRowData.value = param;
  console.log(nowSelectedRowData.value);
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
  getCourseList();
  getDepartmentList();
};
const refreshModifyForm = () => {
  console.log(nowSelectedRowData.value);
  modifyForm.course_id = nowSelectedRowData.value.course_id;
  modifyForm.name = nowSelectedRowData.value.name;
  modifyForm.credit = nowSelectedRowData.value.credit;
  modifyForm.gp_percentage = nowSelectedRowData.value.gp_percentage;
  modifyForm.dept_id = nowSelectedRowData.value.dept.dept_id;
};
const resetForm = (formEl) => formEl.resetFields();
const handleAdd = async (formEl) => {
  await formEl.validate((valid) => {
    if (valid) {
      postCourse();
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
      deleteCourse();
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
      putCourse();
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
  await getCourseList();
  nowSelectedPage.value = 1;
  sliceCourseList();
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
