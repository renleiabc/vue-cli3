import { get } from '../../util/http'
import { Message } from 'element-ui'
const researchForum = {
  state: {
    forumType: '',
    forumData: [],
    loading: true,
    total: 0,
    per: 0,
    type: ''
  },
  mutations: {
    // 请求发帖类型数据处理
    forumaddper (state, res) {
    // console.log(JSON.stringify(res))
      if (res.code === 200) {
        let obj = {}
        obj.data = res.data
        obj.type = res.data[0].value
        state.forumType = obj
        // console.log(JSON.stringify(state.forumType))
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    }
  },
  actions: {
    // 请求发帖类型
    getforumaddper (context) {
      get('/forum/getforumaddper').then(res => {
        context.commit('forumaddper', res)
      })
    }
  },
  getters: {
    postForumaddper: state => state.forumType
  }
}
export default researchForum
