/*
 * @Author: Liang Liang
 * @Date: 2018-07-06 17:04:49
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-24 18:17:51
 * @Description:
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-03 15:09:21
 */
import i18n from '@/lang'
const getters = {
  templates: () => process.env.THEME_FOLDER,
  language: () => i18n.locale,
  themeColor: state => {
    let color = null
    state.skins.map(key => {
      if (process.env.THEME_FOLDER.includes(key.template)) {
        color = key.color
      }
    })
    return color
  },
  checkPermissionList (state) {
    if (state.permissionList === '') {
      state.permissionList = sessionStorage.getItem('permissionList')
    }
    return state.permissionList
  },
  checkPermissionTemplate (state) {
    if (state.permissionTemplate.length === 0) {
      state.permissionTemplate = JSON.parse(
        sessionStorage.getItem('permissionTemplate')
      )
    }
    return state.permissionTemplate
  },
  checkUserCharacter (state) {
    if (state.userCharacter === '') {
      state.userCharacter = sessionStorage.getItem('userCharacter')
    }
    return state.userCharacter
  },
  checkClosePermission (state) {
    if (state.closePermission === '') {
      const right = JSON.parse(sessionStorage.getItem('closePermission'))
      if (right === true) {
        state.closePermission = true
      } else {
        state.closePermission = false
      }
    }
    return state.closePermission
  },
  checkNavInformation (state) {
    if (state.navInformation.length === 0) {
      state.navInformation = JSON.parse(
        sessionStorage.getItem('navInformation')
      )
    }
    return state.navInformation
  },
  checkBreadCrumbs (state) {
    if (state.breadCrumbs.length === 0) {
      state.breadCrumbs = JSON.parse(
        sessionStorage.getItem('breadCrumbs')
      )
    }
    return state.breadCrumbs
  }
}
export default getters
