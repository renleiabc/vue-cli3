/*
 * @Author: Liang Liang
 * @Date: 2018-07-11 11:13:31
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-16 11:19:49
 * @Description:
 */
export default {
  storageManagement: {
    fileManagement: {
      title: '文件管理',
      tableFileList: {
        thName: '名称',
        thAction: '操作',
        thSize: '大小',
        thDate: '最后修改时间',
        thEncipher: '加密状态',
        thStateFile: '文件状态',
        btnEdit: '下载',
        btnRemove: '删除',
        tagEncrypted: '已加密',
        tagUnencrypted: '未加密',
        thRecover: '恢复状态'
      },
      seduPathBreadcrumb: {
        backLabel: '返回上一级',
        allFileLabel: '全部文件'
      }
    },
    storage: {
      storageName: '存储空间名称',
      spaceName: '空间名称',
      btnCreatePub: '创建公共存储空间',
      btnCreatePro: '创建项目存储空间',
      btnCreatePer: '创建个人存储空间',
      btnSaveAuthenticate: '保存认证',
      btnFileManege: '文件管理'
    },
    valid: {
      notNullName: '空间名称不能为空',
      notNullDes: '描述不能为空'
    }
  }
}
