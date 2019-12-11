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
    detail: {
      btnUpload: '上传小文件',
      btnDir: '新建文件夹',
      success: '成功',
      loading: '加载中',
      fail: '失败',
      fetch: '获取',
      selectFile: '选择文件',
      fileSize: '注意：文件大小限制为1G。若上传文本文件，为防止出现乱码，请确保其编码格式为UTF-8',
      isEncrypt: '加密',
      encrypt: '加密算法：',
      keys: '密钥：',
      sKeys: '托管密钥',
      myKeys: '自定义密钥',
      placeholderKey1: '请输入KEY值',
      placeholderKey2: '32位KEY-MD5值',
      createKeys: '创建密钥',
      folderName: '文件夹名称',
      ruleName: '命名规则：',
      fetching: '获取中',
      rule1: '1. 名称请以小写英文字母、数字开头，可包含-_.字符，长度在3~30',
      rule2: '2. 文件夹的绝对路径总长度不能超过256字符',
      baseInfo: '基本信息',
      user: '拥有者：',
      createTime: '创建时间：',
      description: '查看空间描述',
      spaceDesc: '空间描述',
      objectNum: '对象数量',
      updateSpaceName: '修改空间名称',
      sizeStorage: '存储用量'
    },
    storage: {
      storageName: '存储空间名称',
      spaceName: '空间名称',
      selectSpace: '所属项目空间',
      belongSpace: '所属项目',
      btnCreatePub: '创建公共存储空间',
      btnCreatePro: '创建项目存储空间',
      btnCreatePer: '创建个人存储空间',
      btnSaveAuthenticate: '保存认证',
      btnFileManege: '文件管理'
    },
    valid: {
      notNullName: '空间名称不能为空',
      notNullPro: '请选择所属项目空间',
      uploadFile: '文件{name}上传失败，请重试',
      delFile: '确定移除 {name} ？',
      folderName: '文件夹命名格式错误',
      fetchFile: '文件获取中，请稍后',
      foldError: '文件夹未创建成功！',
      regStr: '请输入小写英文字母、数字，长度在3~30之间的空间名称',
      notNullDes: '空间描述不能为空'
    }
  }
}
