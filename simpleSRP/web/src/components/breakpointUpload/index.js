import BreakpointUpload from './VUploader'

BreakpointUpload.install = function (Vue) {
  Vue.component(BreakpointUpload.name, BreakpointUpload)

  // Vue.prototype.$uploadplugin = {};// 添加实例方法
}

export default BreakpointUpload
