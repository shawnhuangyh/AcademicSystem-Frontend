import axios from "axios";

import { getToken } from "@/utils/token";
import { ElMessage } from "element-plus";

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
    ElMessage.error(error);
  }
);

export default requests;
