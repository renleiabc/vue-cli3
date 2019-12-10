const accept = {
  action: "", // 必填参数 图片上传地址
  methods: "POST", // 必填参数 图片上传方式
  token: "", // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: "img", // 必填参数 文件的参数名
  size: 500, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon" // 可选 可上传的图片格式
};
export default accept;
