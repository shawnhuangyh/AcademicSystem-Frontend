<script setup>
import { computed, reactive, ref } from "vue";
import { router } from "@/router";
import { getRole, getUser, rmToken } from "@/utils/token";
import { ElMessage } from "element-plus";
import { change_password } from "@/api";

const userSettingVisible = ref(false);

const formRef = ref();

const userForm = reactive({
  new_password: "",
  new_password_repeat: "",
});

const userForm_send = reactive({
  username: getUser(),
  password: "",
});

const username = computed(() => {
  return getUser();
});

const role = computed(() => {
  switch (getRole()) {
    case "ADMIN":
      return "管理员";
    case "TEACHER":
      return "教师";
    case "STUDENT":
      return "学生";
  }
});

const validatePassword = (rule, value, callback) => {
  if (userForm.new_password !== userForm.new_password_repeat) {
    callback(new Error("密码输入不一致！"));
  } else {
    callback();
  }
};

const formRules = reactive({
  new_password: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  new_password_repeat: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: validatePassword, trigger: "blur", required: true },
  ],
});

const handleCommand = async (command) => {
  switch (command) {
    case "setting":
      showSettings();
      break;
    case "exit":
      await logout();
      break;
  }
};

const logout = async () => {
  rmToken();
  await router.push("/");
};

const showSettings = () => {
  userSettingVisible.value = true;
};

const resetForm = (formEl) => {
  userSettingVisible.value = false;
  formEl.resetFields();
};

const submitForm = async (formEl) => {
  await formEl.validate((valid) => {
    if (valid) {
      if (userForm.new_password === userForm.new_password_repeat) {
        userForm_send.password = userForm.new_password;
        change_password(userForm_send, getUser());
        ElMessage({
          type: "success",
          message: "密码修改成功！",
        });
        resetForm(formEl);
      } else {
        ElMessage({
          type: "error",
          message: "密码输入不一致！",
        });
      }
    } else {
      ElMessage({
        type: "error",
        message: "密码输入不正确！",
      });
    }
  });
};
</script>

<template>
  <el-row>
    <el-col :span="4">
      <div style="line-height: 60px">{{ role }}</div>
    </el-col>
    <el-col :span="20">
      <div style="text-align: right; font-size: 12px; padding: 20px">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <font-awesome-icon :icon="['fas', 'gear']" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>

  <el-dialog v-model="userSettingVisible" title="修改用户信息">
    <el-form :model="userForm" ref="formRef" :rules="formRules">
      <el-form-item label="新密码" label-width="140px" prop="new_password">
        <el-input
          v-model="userForm.new_password"
          placeholder="请输入新密码"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="再次输入新密码"
        label-width="140px"
        prop="new_password_repeat"
      >
        <el-input
          v-model="userForm.new_password_repeat"
          placeholder="请再次输入新密码"
          type="password"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(formRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
