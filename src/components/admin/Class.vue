<template>
  <div class="form-box">
    <el-form label-position="left" label-width="80px" :model="search_form">
      <el-row :gutter="20" justify="center">
        <el-col :span="12">
          <el-form-item label="课程号">
            <el-input v-model="search_form.course_id" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="课程名称">
            <el-input v-model="search_form.course_name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" justify="center">
        <el-col :span="12">
          <el-form-item label="班级号">
            <el-input v-model="search_form.class_id" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="教师姓名">
            <el-input v-model="search_form.teacher_name" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

  <div class="table-box">
    <el-table
      :data="classes"
      stripe
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="course.course_id" label="课程号" width="180" />
      <el-table-column prop="course.name" label="课程名称" width="180" />
      <el-table-column prop="course.credit" label="学分" />
      <el-table-column prop="class_no" label="班级号" />
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
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { classList } from "@/api";

// search
const search_form = reactive({
  course_id: "",
  course_name: "",
  class_id: "",
  teacher_name: "",
});

// table
const classes = ref();
// pagination
const nowSelectedPage = ref(1);
const totalPage = ref(0);

const getClassList = async (pageNum) => {
  const result = await classList(
    pageNum,
    search_form.course_id,
    search_form.course_name,
    search_form.class_id,
    search_form.teacher_name
  );
  totalPage.value = result.data.count;
  if (result.status === 200) {
    classes.value = result.data.results;
  }
};
const pageChange = (param) => {
  nowSelectedPage.value = param;
  getClassList(nowSelectedPage.value);
};
onMounted(() => {
  getClassList(nowSelectedPage.value);
});

watch(search_form, () => {
  getClassList(1);
});
</script>

<style scoped>
.form-box {
  width: 80%;
  margin: 0 auto;
}

.table-box {
  width: 100%;
  margin: 0 auto;
}
</style>
