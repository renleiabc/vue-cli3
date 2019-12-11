/*
* @Author: 633
* @Date: 2018-08-10 15:06:23
* @Description: 镜像详情弹窗
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-14 11:35:35
*/
<template>
  <div class="views-user-management-user-details">
    <div class="row">
      <div class="row-first">
        <span class="tit">{{$t("views.imageManagement.mirrorName")}}：</span>
        <div class="content">{{detailData.name}}</div>
      </div>
      <div class="row-last">
        <span class="tit">{{$t("views.imageManagement.mirrorId")}}：</span>
        <div class="content">{{detailData.uuid}}</div>
      </div>
    </div>
    <div class="row">
      <div class="row-first">
        <span class="tit">{{$t("views.imageManagement.status")}}：</span>
        <div class="content">{{detailData.status==0?'上传中':detailData.status==1?'可用':'失败'}}</div>
      </div>
      <div class="row-last">
        <span class="tit">{{$t("views.imageManagement.operatingSystem")}}：</span>
        <div class="content">{{detailData.imageOs.name}}</div>
      </div>
    </div>
    <div class="row">
      <div class="row-first">
        <span class="tit">{{$t("views.imageManagement.creationTime")}}：</span>
        <div class="content">{{detailData.created_at}}</div>
      </div>
      <div class="row-last"
           v-if='detailData.project_name'>
        <span class="tit">所属项目空间：</span>
        <div class="content">{{detailData.project_name}}</div>
      </div>
    </div>
    <div class="row">
      <div class="row-first else">
        <span class="tit">{{$t("views.imageManagement.description")}}：</span>
        <div class="content">{{detailData.describe}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imageDetail',
  props: {
    detailData: {
      type: Object,
      required: true
    }
  },
  created () {
    console.log(this.detailData)
  }
}
</script>
