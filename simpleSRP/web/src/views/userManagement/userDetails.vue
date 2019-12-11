/*
 * @Author: aFei
 * @Date: 2018-07-25 15:36:04
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-10 12:00:16
*/
<template>
    <div class="views-user-management-user-details">
        <div class="row">
            <div class="row-first">
                <span class="tit">{{$t("views.userManagement.username")}}：</span>
                <div class="content">{{msg.username}}</div>
            </div>
            <div class="row-last">
                <span class="tit">{{$t("views.userManagement.name")}}：</span>
                <div class="content">{{msg.name}}</div>
            </div>
        </div>
        <div class="row">
            <div class="row-first">
                <span class="tit">{{$t("views.userManagement.status")}}：</span>
                <div class="content">{{msg.status===1?'开启':'关闭'}}</div>
            </div>
            <div class="row-last">
                <span class="tit">{{$t("views.userManagement.gender")}}：</span>
                <div class="content">{{msg.gender===1?'男':'女'}}</div>
            </div>
        </div>
        <div class="row">
            <div class="row-first">
                <span class="tit">{{$t("views.userManagement.department")}}：</span>
                <div class="content">{{msg.department}}</div>
            </div>
            <div class="row-last">
                <span class="tit">{{$t("views.userManagement.grade")}}：</span>
                <div class="content">{{msg.grade}}</div>
            </div>
        </div>
        <div class="row">
            <div class="row-first">
                <span class="tit">{{$t("views.userManagement.class")}}：</span>
                <div class="content">{{msg.classes_id}}</div>
            </div>
            <div class="row-last">
                <span class="tit">{{$t("views.userManagement.phone")}}：</span>
                <div class="content">{{msg.tel}}</div>
            </div>
        </div>
        <div class="row">
            <div class="row-first">
                <span class="tit">{{$t("views.userManagement.email")}}：</span>
                <div class="content">{{msg.email}}</div>
            </div>
            <div class="row-last">
                <span class="tit">{{$t("views.userManagement.weChatNumber")}}：</span>
                <div class="content">{{msg.weixin}}</div>
            </div>
        </div>
        <div class="row">
            <div class="row-first else">
                <span class="tit">{{$t("views.userManagement.personalProfile")}}：</span>
                <div class="content">{{msg.introduce}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'userDetails',
  data () {
    return {
      msg: {}
    }
  },
  created () {
    this.$post('/user/getuserinfo', {id: this.$route.query.userId}).then(data => {
      this.msg = {...data.data}
    })
  }
}
</script>
