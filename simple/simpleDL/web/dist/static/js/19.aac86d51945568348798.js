webpackJsonp([19],{FYWr:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a("4YfN"),i=a.n(e),n={name:"userDetails",data:function(){return{msg:{}}},created:function(){var s=this;this.$post("/user/getuserinfo",{id:this.$route.query.userId}).then(function(t){s.msg=i()({},t.data)})}},v={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"views-user-management-user-details"},[a("div",{staticClass:"row"},[a("div",{staticClass:"row-first"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.username"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.username))])]),s._v(" "),a("div",{staticClass:"row-last"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.name"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.name))])])]),s._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"row-first"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.status"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(1===s.msg.status?"开启":"关闭"))])]),s._v(" "),a("div",{staticClass:"row-last"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.gender"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(1===s.msg.gender?"男":"女"))])])]),s._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"row-first"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.department"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.department))])]),s._v(" "),a("div",{staticClass:"row-last"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.grade"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.grade))])])]),s._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"row-first"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.class"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.classes_id))])]),s._v(" "),a("div",{staticClass:"row-last"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.phone"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.tel))])])]),s._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"row-first"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.email"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.email))])]),s._v(" "),a("div",{staticClass:"row-last"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.weChatNumber"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.weixin))])])]),s._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"row-first else"},[a("span",{staticClass:"tit"},[s._v(s._s(s.$t("views.userManagement.personalProfile"))+"：")]),s._v(" "),a("div",{staticClass:"content"},[s._v(s._s(s.msg.introduce))])])])])},staticRenderFns:[]},r=a("C7Lr")(n,v,!1,null,null,null);t.default=r.exports}});