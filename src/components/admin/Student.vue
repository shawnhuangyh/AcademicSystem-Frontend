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
          :data="slicedStudents"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="handleSelectedRow"
        >
          <el-table-column prop="student_id" label="学号" />
          <el-table-column prop="name" label="学生姓名" />
          <el-table-column prop="gpa" label="平均绩点" />
          <el-table-column prop="dept.name" label="学院" />
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
      <el-dialog v-model="addDialogFormVisible" title="增加新学生">
        <el-form :model="addForm" ref="addFormRef" :rules="formRules">
          <el-form-item label="学号" label-width="140px" prop="name">
            <el-input v-model="addForm.student_id" placeholder="请输入学号" />
          </el-form-item>
          <el-form-item label="学生姓名" label-width="140px" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="学院" label-width="140px" prop="name">
            <el-select
              v-model="addForm.dept_id"
              placeholder="请输入学生所在学院"
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
          <el-form-item label="学号" label-width="140px" prop="name">
            <el-input
              v-model="modifyForm.student_id"
              placeholder="请输入学号"
            />
          </el-form-item>
          <el-form-item label="学生姓名" label-width="140px" prop="name">
            <el-input v-model="modifyForm.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="学院" label-width="140px" prop="name">
            <el-select
              v-model="modifyForm.dept_id"
              placeholder="请输入学生所在学院"
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
  get_student_list,
  get_department_list,
  post_student,
  delete_student,
  put_student,
} from "@/api";
import AdminTemplate from "@/components/admin/AdminTemplate.vue";
//add
const addDialogFormVisible = ref(false);
const addFormRef = ref();
const addForm = reactive({
  student_id: "",
  name: "",
  dept_id: "",
});
const formRules = reactive({
  student_id: [{ required: true, message: "请输入学生学号", trigger: "blur" }],
  name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
  dept_id: [{ required: true, message: "请输入学生学院", trigger: "blur" }],
});
const modifyDialogFormVisible = ref(false);
const modifyFormRef = ref();
const modifyForm = reactive({
  student_id: "",
  name: "",
  dept_id: "",
});
// other info
const departments = ref();

// table
const students = ref();
const slicedStudents = ref();
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

const getStudentList = async () => {
  openLoading();
  const result = await get_student_list();
  totalPage.value = result.data.length;
  if (result.status === 200) {
    students.value = result.data;
  }
  closeLoading();
};

const sliceStudentList = () => {
  slicedStudents.value = students.value.slice(
    pageSize.value * (nowSelectedPage.value - 1),
    pageSize.value * nowSelectedPage.value
  );
};

const sliceStudent = async () => {
  openLoading();
  await post_student(addForm);
  await refreshTable();
  closeLoading();
};

const deleteStudent = async () => {
  openLoading();
  await delete_student(nowSelectedRowData.value.student_id);
  await refreshTable();
  closeLoading();
};

const putStudent = async () => {
  openLoading();
  await put_student(modifyForm);
  await refreshTable();
  closeLoading();
};

// mouse events
const pageChange = (param) => {
  nowSelectedPage.value = param;
  sliceStudentList();
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
  getStudentList();
  getDepartmentList();
};

const refreshModifyForm = () => {
  modifyForm.student_id = nowSelectedRowData.value.student_id;
  modifyForm.name = nowSelectedRowData.value.name;
  modifyForm.dept_id = nowSelectedRowData.value.dept.dept_id;
};

const resetForm = (formEl) => formEl.resetFields();

const handleAdd = async (formEl) => {
  await formEl.validate((valid) => {
    if (valid) {
      sliceStudent();
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
  await getStudentList();
  nowSelectedPage.value = 1;
  sliceStudentList();
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
