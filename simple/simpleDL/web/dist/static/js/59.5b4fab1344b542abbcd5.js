webpackJsonp([59],{Rfif:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("transition",{attrs:{name:"fade-transform",mode:"out-in"}},[t("router-view")],1)},staticRenderFns:[]},a=n("C7Lr")({name:"index",methods:{showNavigate:function(e){-1!==[].join(",").indexOf(e)?this.$emit("showNavigate",!0):this.$emit("showNavigate",!1)}},created:function(){this.showNavigate(this.$route.name)},beforeRouteUpdate:function(e,t,n){this.showNavigate(e.name),n()}},i,!1,null,null,null);t.default=a.exports}});