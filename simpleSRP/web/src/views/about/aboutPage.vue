<template>
  <div class="about-page">
    <div class="v-line">
      <span class="primary-color">产品信息</span>
    </div>
    <div>
      <h5>SimpleTSM 人工智能科研系统</h5>
      <p>SimpleTSM 是一套通用的人工智能科研平台，它以Tensorflow、Caffe、Torch等主流深度学习框架为基础，通过自研服务和Docker容器技术相结合，帮助老师和学生托管深度学习训练作业和集群管理。 平台可提供模型训练服务、模型开发服务以及模型验证服务，消除了Tensorflow等框架环境安装部署、性能调优的成本和资源管理复杂性，可以使用户不必关注基础架构的管理，⽽更加专注深度学习应⽤本身。学生可以提交深度学习训练任务，该系统可以动态调用整个平台的GPU加速卡进行模型训练。
      </p>
      <p>版权所有：北京西普阳光教育科技股份有限公司</p>
      <p>网站地址：
        <a href="https://www.simpleedu.com.cn"
           target="blank">www.simpleedu.com.cn</a>
      </p>
    </div>
    <div class="v-line">
      <span class="primary-color">联系我们</span>
    </div>
    <div style="margin-top:10px;">
      <p>服务热线：
        <a href="#">400-083-4525</a>
      </p>

      <p>服务邮箱：service@simpleedu.com.cn</p>
    </div>
    <div class='weixin'>
      <span>关注西普教育</span>
      <img :src="mixinGetImage('views/global/', 'er.jpg')"
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'aboutPage'
}
</script>
<style lang="less">
.about-page {
  font-size: 16px;
  .v-line {
    border-bottom: 1px solid #ddd;
    > span {
      display: inline-block;
      font-size: 14px;
      padding: 6px;
      margin-bottom: -1px;
      border-bottom: 2px solid;
    }
  }
  h5 {
    padding: 10px;
    margin: 10px 0;
    background-color: #eabb76;
  }
  p {
    text-indent: 2em;
    line-height: 200%;
  }
  .weixin {
    margin-top: 20px;
    span {
      display: block;
      text-indent: 2em;
      font-size: 14px;
    }
    img {
      margin-left: 18px;
    }
  }
}
</style>
