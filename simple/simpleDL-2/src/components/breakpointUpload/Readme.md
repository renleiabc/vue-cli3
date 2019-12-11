## 断点续传插件 BreakpointUpload

基于[simple-uploader.js](https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md)封装，参数传递及方法调用参考这个插件。

> 不需要安装，已把源码集成到项目中

##### 使用示例：

```
<BreakpointUpload :params="para" v-on:resultUploader="uploadResult" language="zh" v-on:deleteFiles="deleteFile"></BreakpointUpload>

...
para: {
    target: "//192.168.201.17:3000/upload",// 后台上传地址
    token: "1231231",//
    typeArr: [], //文件后缀类型 ['iso','mp4']
    // 断点上传位置查询
    checkChunkUploadedByResponse: function(chunk, message) {
      var objMessage = {};
      try {
        objMessage = JSON.parse(message);
      } catch (e) {}
      // fake response
      // objMessage.uploaded_chunks = [2, 3, 4, 5, 8, 10, 11, 12, 13, 17, 20, 21]
      // check the chunk is uploaded
      // return (objMessage.uploaded_chunks || []).indexOf(chunk.offset + 1) >= 0
      return (objMessage.index || 0) > chunk.offset;
    },
    chunkSize: 1 * 1024 * 1024 //分段大小
},

...

 methods: {
    // 上传结果
    uploadResult: function(data) {
      console.log("后台返回", data);
    },
    // 删除回调
    deleteFile: function(res) {
      console.log("删除", res);
    }
  },
```

params 参数配置 Object；

resultUploader 上传结果的回调方法；

deleteFiles 删除上传文件的方法回调；
