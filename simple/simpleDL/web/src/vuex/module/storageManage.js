import {
  Message
} from 'element-ui'
import {
  get
} from '../../util/http'
const storageMangage = {
  state: {
    storageUserState: {}
  },
  mutations: {
    // 存储的平台信息
    storageUser (state, res) {
      if (res.code === 200) {
        state.storageUserState = {
          ...res.data
        }
        localStorage.setItem('storageUser', JSON.stringify(state.storageUserState))
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    }
  },
  actions: {
    // 存储的平台信息
    getStorageUser (context, obj) {
      get('/storage/storageuser', obj).then(res => {
        context.commit('storageUser', res)
      })
    }
  },
  getters: {
    getterStorageUser: state => {
      if (!state.storageUserState.accessid) {
        state.storageUserState = JSON.parse(localStorage.getItem('storageUser'))
      }
      return state.storageUserState
    }
  }
}
export default storageMangage
