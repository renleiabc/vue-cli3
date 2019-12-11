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
        <div class="content">{{detailData.hb_image_uid}}</div>
      </div>
    </div>
    <div class="row">
      <div class="row-first">
        <span class="tit">{{$t("views.imageManagement.status")}}：</span>
        <div class="content">未生成</div>
        <!--{{detailData.image_status===1?'未生成':detailData.image_status===2?'可用':'停用'}}-->
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
