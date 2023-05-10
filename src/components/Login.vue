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
import {
  get_teacher_info,
  get_user_info,
  get_user_role,
  user_login,
} from "@/api";
import {
  getRole,
  getUser,
  setRole,
  setToken,
  setUserGPA,
  setUserName,
} from "@/utils/token";
import { router } from "@/router";
import { AxiosError } from "axios";

const loginForm = reactive({
  username: "admin",
  password: "password",
});

const loginRules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const login = async () => {
  const result = await user_login(loginForm);
  if (!(result instanceof AxiosError)) {
    setToken(result.data.access);
    const role = await get_user_role();
    setRole(role);
    let userName;
    switch (getRole()) {
      case "ADMIN":
        setUserName(role.data.username);
        break;
      case "TEACHER":
        userName = await get_teacher_info();
        setUserName(userName.data.name);
        break;
      case "STUDENT":
        userName = await get_user_info();
        let gpa = Number(userName.data.gpa).toFixed(3);
        setUserName(userName.data.name);
        setUserGPA(gpa);
        break;
    }
    if (!(role instanceof AxiosError)) {
      ElMessage.success("登录成功");
      switch (getRole()) {
        case "ADMIN":
          await router.push("/admin/class");
          break;
        case "TEACHER":
          await router.push("/teacher/class");
          break;
        case "STUDENT":
          await router.push("/student/select");
          break;
      }
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
