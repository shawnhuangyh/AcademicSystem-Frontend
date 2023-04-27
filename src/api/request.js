import axios from "axios";

import { getToken, rmToken } from "@/utils/token";
import { ElMessage } from "element-plus";
import { router } from "@/router";

const requests = axios.create({
  baseURL: "http://localhost:8000/v1",
  timeout: 5000,
});

requests.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => {
    ElMessage.error(error);
  }
);

requests.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        ElMessage.error("密码错误或登陆失效，请重新登陆!");
        rmToken();
        router.push("/");
        break;
      default:
        ElMessage.error(error);
        break;
    }
  }
);

export default requests;
