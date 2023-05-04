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
          :data="slicedSemesters"
          stripe
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="handleSelectedRow"
        >
          <el-table-column prop="name" label="学期名称" />
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
      <el-dialog v-model="addDialogFormVisible" title="增加新学期">
        <el-form :model="addForm" ref="addFormRef" :rules="formRules">
          <el-form-item label="学期名称" label-width="140px" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入学期名称" />
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
          <el-form-item label="学期名称" label-width="140px" prop="name">
            <el-input v-model="modifyForm.name" placeholder="请输入学期名称" />
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
  get_semester_list,
  post_semester,
  delete_semester,
  put_semester,
} from "@/api";
import AdminTemplate from "@/components/admin/AdminTemplate.vue";

//add
const addDialogFormVisible = ref(false);
const addFormRef = ref();
const addForm = reactive({
  name: "",
});
const formRules = reactive({
  name: [{ required: true, message: "请输入学期名称", trigger: "blur" }],
});
const modifyDialogFormVisible = ref(false);
const modifyFormRef = ref();
const modifyForm = reactive({
  semester_id: "",
  name: "",
});

// table
const semesters = ref();
const slicedSemesters = ref();
const nowSelectedRowData = ref();
// pagination
const nowSelectedPage = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
// loading
const loading = ref();
// axios
const getSemesterList = async () => {
  openLoading();
  const result = await get_semester_list();
  totalPage.value = result.data.length;
  if (result.status === 200) {
    semesters.value = result.data;
  }
  closeLoading();
};

const sliceSemesterList = () => {
  slicedSemesters.value = semesters.value.slice(
    pageSize.value * (nowSelectedPage.value - 1),
    pageSize.value * nowSelectedPage.value
  );
};

const sliceSemester = async () => {
  openLoading();
  await post_semester(addForm);
  await refreshTable();
  closeLoading();
};

const deleteSemester = async () => {
  openLoading();
  await delete_semester(nowSelectedRowData.value.semester_id);
  await refreshTable();
  closeLoading();
};

const putSemester = async () => {
  openLoading();
  await put_semester(nowSelectedRowData.value.semester_id, modifyForm);
  await refreshTable();
  closeLoading();
};

// mouse events
const pageChange = (param) => {
  nowSelectedPage.value = param;
  sliceSemesterList();
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
  getSemesterList();
};

const refreshModifyForm = () => {
  modifyForm.name = nowSelectedRowData.value.name;
};

const resetForm = (formEl) => formEl.resetFields();

const handleAdd = async (formEl) => {
  await formEl.validate((valid) => {
    if (valid) {
      sliceSemester();
      ElMessage({
        type: "success",
        message: "新增学期成功",
      });
      addDialogFormVisible.value = false;
      resetForm(formEl);
    } else {
      ElMessage({
        type: "error",
        message: "请填写完整的学期信息",
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
      deleteSemester();
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
      putSemester();
      ElMessage({
        type: "success",
        message: "修改学期成功",
      });
      modifyDialogFormVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "请填写完整的学期信息",
      });
    }
  });
};

const refreshTable = async () => {
  await getSemesterList();
  nowSelectedPage.value = 1;
  sliceSemesterList();
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
