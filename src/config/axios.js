import axios from 'axios';

const axiosInstance = axios.create({
  //在跨域请求中携带身份凭据(比如cookies和session)
  withCredentials: true,
  // 其他自定义配置
});

export default {
  install(Vue) {
    Vue.prototype.$axios = axiosInstance;
  },
};