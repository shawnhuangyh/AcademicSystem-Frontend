import axios from "axios";

import {getToken} from "@/utils/token";
import {ElMessage} from "element-plus";

const requests = axios.create({
  baseURL: "http://localhost:8000/v1",
  timeout: 1000,
});

requests.interceptors.request.use(
  (config) => {
    //配置对象,在发送请求之前做些什么
    //配置用户登录信息
    if (getToken()) {
      config.headers.TOKEN = getToken();
    }
    return config;
  },
  (error) => {
    ElMessage.error(error);
  }
);
//响应拦截器
requests.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    ElMessage.error(error);
  }
);

//暴露axios
export default requests;
