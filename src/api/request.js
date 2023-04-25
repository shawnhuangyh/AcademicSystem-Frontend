import axios from "axios";

import {getToken} from "@/utils/token";
import {ElMessage} from "element-plus";

const requests = axios.create({
  baseURL: "http://localhost:8000/v1",
  timeout: 1000,
});

requests.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken();
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

//暴露axios
export default requests;
