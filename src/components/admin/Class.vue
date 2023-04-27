<template>
  <div class="form-buttons-box">
    <el-row>
      <el-col :span="22">
        <div class="form-box">
          <el-form label-position="left" label-width="80px" :model="searchForm">
            <el-row :gutter="20" justify="center">
              <el-col :span="12">
                <el-form-item label="课程号">
                  <el-input v-model="searchForm.course_id" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程名称">
                  <el-input v-model="searchForm.course_name" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" justify="center">
              <el-col :span="12">
                <el-form-item label="班级号">
                  <el-input v-model="searchForm.class_id" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教师姓名">
                  <el-input v-model="searchForm.teacher_name" />
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
              >增加</el-button
            >
          </el-row>
          <el-row class="button-box">
            <el-button @click="handleDelete">删除</el-button>
          </el-row>
          <el-row class="button-box">
            <el-button @click="handleModify">修改</el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>

  <div class="table-box">
    <el-table
      :data="classes"
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
      <el-table-column prop="time" label="上课时间" />
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
      @current-change="pageChange"
    />
  </div>

  <!--  addDialog-->
  <el-dialog v-model="addDialogFormVisible" title="增加新班级">
    <el-form :model="addForm">
      <el-form-item label="课程名称" label-width="140px">
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

      <el-form-item label="教师姓名" label-width="140px">
        <el-select v-model="addForm.teacher_id" placeholder="请选择教师姓名">
          <el-option
            v-for="teacher in teachers"
            :label="teacher.name"
            :value="teacher.teacher_id"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="学期" label-width="140px">-->
      <!--        <el-select v-model="addForm.semester_id" placeholder="学期选择">-->
      <!--          <el-option-->
      <!--            v-for="semester in semesters"-->
      <!--            :label="semester.name"-->
      <!--            :value="semester.semester_id"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="上课时间" label-width="140px">-->
      <!--        <el-select v-model="addForm.time" placeholder="天">-->
      <!--          <el-option v-for="day in days" :label="day" :value="day" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="开始时间" label-width="140px">-->
      <!--        <el-select v-model="addForm.start" placeholder="开始节">-->
      <!--          <el-option v-for="time in times" :label="time" :value="time" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="结束时间" label-width="140px">-->
      <!--        <el-select v-model="addForm.end" placeholder="结束节">-->
      <!--          <el-option v-for="time in times" :label="time" :value="time" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="
            addDialogFormVisible = false;
            postClass();
          "
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  get_class_List,
  delete_class,
  get_teacher_list,
  get_course_ist,
  get_semester_ist,
  post_class,
} from "@/api";

// search
const searchForm = reactive({
  course_id: "",
  course_name: "",
  class_id: "",
  teacher_name: "",
});
//add
const addDialogFormVisible = ref(false);
const addForm = reactive({
  course_id: "",
  teacher_id: "",
  // semester_id: "",
  // classroom: "erer",
  // time: "",
  // start: "",
  // end: "",
});
// select options
const courses = ref();
const teachers = ref();
const semesters = ref();
const days = ref(["一", "二", "三", "四", "五"]);
const times = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
// table
const classes = ref();
const nowSelectedRowData = ref();
// pagination
const nowSelectedPage = ref(1);
const totalPage = ref(0);

// axios
const getClassList = async () => {
  const result = await get_class_List(
    nowSelectedPage.value,
    searchForm.course_id,
    searchForm.course_name,
    searchForm.class_id,
    searchForm.teacher_name
  );
  totalPage.value = result.data.count;
  if (result.status === 200) {
    classes.value = result.data.results;
  }
};
const postClass = async () => {
  console.log(JSON.stringify(addForm));
  const result = await post_class(JSON.stringify(addForm));
  if (result.status === 200) {
    classes.value = result.data.results;
  }
};
const getTeacherList = async () => {
  const result = await get_teacher_list();
  if (result.status === 200) {
    teachers.value = result.data.results;
  }
};
const getCourseList = async () => {
  const result = await get_course_ist();
  if (result.status === 200) {
    courses.value = result.data.results;
  }
};
const getSemesterList = async () => {
  const result = await get_semester_ist();
  if (result.status === 200) {
    semesters.value = result.data.results;
  }
};
const deleteClass = async () => {
  // console.log(nowSelectedRowData.value.class_id);
  await delete_class(nowSelectedRowData.value.class_id);
};

// mouse events
const pageChange = (param) => {
  nowSelectedPage.value = param;
  getClassList();
};
const handleSelectedRow = (param) => {
  console.log(param);
  nowSelectedRowData.value = param;
};
const refreshDialogData = () => {
  getTeacherList();
  getCourseList();
  getSemesterList();
};
const handleAdd = () => {};
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
      getClassList();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除操作取消",
      });
    });
};
const handleModify = () => {
  //
};

onMounted(() => {
  getClassList(nowSelectedPage.value);
  // setInterval(() => {
  //   console.log(addForm);
  // }, 5000);
});

watch(searchForm, () => {
  getClassList(1);
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
  margin: 5px 0px 5px 20px;
}
</style>
