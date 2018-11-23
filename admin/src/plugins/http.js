import axios from "axios";
// 创建axios实例
const service = axios.create({
  baseURL: "http://rap2api.taobao.org/app/mock/118538",
  timeout: 15000 // 请求超时时间
});

// 添加request拦截器

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 添加respone拦截器

service.interceptors.response.use(
  response => {
    let res = {};

    res.status = response.status;

    res.data = response.data;

    return res;
  },

  error => {
    if (error.response && error.response.status == 404) {
      // router.push("/blank.vue");
    }

    return Promise.reject(error.response);
  }
);

export default service;
