> admin-->admin qwe123；
>
> projectManager-->teacher qwe123；
>
> projectParticipant-->student qwe123

## 确认弹窗封装

封装的公共方法源码：

```
/**
  * url（必填）请求地址  params（可选）参数  message（可选）自定义提示信息
  */
mixinConfirm (url, params, message) {
  let msg = message || this.$t('views.dialogText.deleteConfirm')
  return this.$confirm(msg, this.$t('views.dialogText.tip')).then(() => {
    return this.$post(url, params).then(data => {
      return new Promise((resolve) => {
        if (data.code === 200) {
          // 删除单个行
          this.$message({
            type: 'success',
            message: this.$t('views.notification.succeed')
          })
          resolve(true)
        }
      })
    })
  }).catch(() => {
    return new Promise((resolve, reject) => {
      resolve(false)
    })
  })
}
```

该方法已经绑定到 vue 上，可以直接 this 调用。使用实例：

```
deleteStorage (id) {
/**
  * url（必填）请求地址  params（可选）参数  message（可选）自定义提示信息
  */"
  this.mixinConfirm('/init-pwd-user', { storage_id: id }).then(res => {
    if (res) {
      // 请求成功回调
      this.getActiveTab('tableData')
    }
  })
}
```

## 存储空间

1.存储空间存在 ip 地址写死的问题
