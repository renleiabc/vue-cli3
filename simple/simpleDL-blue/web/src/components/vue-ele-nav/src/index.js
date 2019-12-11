import eleNav from './eleNav'
const comment = {
  install (Vue) {
    Vue.component('eleNav', eleNav)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

export default comment
