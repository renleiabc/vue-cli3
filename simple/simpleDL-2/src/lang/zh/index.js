/*
 * @Author: Liang Liang
 * @Date: 2018-07-06 17:04:09
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-01 10:41:40
 * @Description:
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-13 14:15:10
 */
import main from './views/main'
import storageManagement from './views/storageManagement'
import systemManagement from './views/systemManagement'
import login from './views/login'
import utli from './utli'
import projectSpace from './views/projectSpace'
import projectHome from './views/projectHome'
import systemMonitoring from './views/systemMonitoring'
import userManagement from './views/userManagement'
import clusterMonitoring from './views/clusterMonitoring'
import casecenter from './views/casecenter'
import researchForum from './views/researchForum'
import publics from './views/public'
import personalSpace from './views/personalSpace'
import help from './views/help'
import keyManagement from './views/keyManagement'
import imageManagement from './views/imageManagement'
export default {
  // 路由
  views: {
    ...main,
    ...publics,
    ...storageManagement,
    ...projectSpace,
    ...systemManagement,
    ...login,
    ...projectHome,
    ...userManagement,
    ...systemMonitoring,
    ...clusterMonitoring,
    ...casecenter,
    ...personalSpace,
    ...researchForum,
    ...help,
    ...keyManagement,
    ...imageManagement
  },
  utli: {
    ...utli
  },
  components: {}
}
