/*
 * @Author: Liang Liang
 * @Date: 2018-07-11 11:13:31
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-16 11:19:57
 * @Description:
 */
export default {
  storageManagement: {
    fileManagement: {
      title: 'File Management',
      tableFileList: {
        thName: 'Name',
        thAction: 'Actions',
        thSize: 'Size',
        thDate: 'Last-Modified',
        thEncipher: 'Encipher state',
        thStateFile: 'File state',
        btnEdit: 'Download',
        btnRemove: 'Remove',
        tagEncrypted: 'Encrypted',
        tagUnencrypted: 'unencrypted',
        thRecover: 'Recover state'
      },
      seduPathBreadcrumb: {
        backLabel: 'Back',
        allFileLabel: 'All Files'
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
