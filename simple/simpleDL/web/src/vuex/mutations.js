/*
 * @Author: aFei
 * @Date: 2018-07-10 17:31:55
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-03 15:09:37
 */
export default {
  upDatePermissionList (state, data) {
    state.permissionList = data
    sessionStorage.setItem('permissionList', data)
  },
  upDatePermissionTemplate (state, data) {
    state.permissionTemplate = data
    sessionStorage.setItem('permissionTemplate', JSON.stringify(data))
  },
  upDateUserCharacter (state, data) {
    state.userCharacter = data
    sessionStorage.setItem('userCharacter', data)
  },
  upDateClosePermission (state, data) {
    state.closePermission = data
    sessionStorage.setItem('closePermission', data)
  },
  upDateNavInformation (state, data) {
    state.navInformation = data
    sessionStorage.setItem('navInformation', JSON.stringify(data))
  },
  upDateBreadCrumbs (state, data) {
    state.breadCrumbs = data
    sessionStorage.setItem('breadCrumbs', JSON.stringify(data))
  }
}
