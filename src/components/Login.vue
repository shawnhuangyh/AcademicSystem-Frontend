<template>
  <div class="login-form">
    <el-form :model="loginForm" :rules="loginRules" ref="Form">
      <el-form-item label="用户名" label-width="20%" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="20%" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
    </el-form>
    <span class="center">
      <el-button type="primary" @click="login()">登录</el-button>
    </span>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { get_user_role, user_login } from "@/api";
import { setToken } from "@/utils/token";
import { router } from "@/router";
import { AxiosError } from "axios";

const loginForm = reactive({
  username: "shawn",
  password: "admin",
});

const loginRules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const login = async () => {
  const result = await user_login(loginForm);
  if (!(result instanceof AxiosError)) {
    setToken(result.data.access);
    ElMessage.success("登录成功");
    const role = await get_user_role();
    if (role.data["is_superuser"] === true) {
      // 进入管理员后台
      await router.push("/admin/class");
    } else if (role.data["is_staff"] === true) {
      // 进入教师后台
    } else {
      // 进入学生后台
    }
  }
};
</script>
<style scoped>
.login-form {
  border: 1px solid #dccfcf;
  width: 350px;
  margin: 180px auto;
  padding: 20px 50px 20px 50px;
  border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color: rgba(255, 255, 255, 0.7);
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
