/*
 * @Author: 少侠
 * @Date: 2018-08-22 11:23:37
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-22 14:35:24
 * @Description: 图片预测
 */

<template>
  <div class="pictureTrain">
    <div>
      <h6>上传图片</h6>
      <p>图片格式为 jpg，jpeg，png，大小不能超过 10MB</p>
      <el-upload action="//192.168.10.95:18000/api/v1.0/all/"
                 list-type="picture-card"
                 :on-exceed="handleExceed"
                 :limit="1"
                 :on-success="handleAvatarSuccess"
                 :on-error='handleAvatarError'
                 :before-upload="beforeAvatarUpload"
                 :before-remove='beforeAvatarRemove'
                 :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- <el-dialog :visible.sync="dialogVisible"
                 title="图片查看">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </el-dialog> -->
    </div>
    <div>
      <h6>预测结果</h6>
      <p v-if='states === 0'>暂无结果，请上传图片</p>
      <div v-if='states === 1'
           class="working">
        <div class="loader"></div>
        <div class="loaderText">Working......</div>
      </div>
      <div v-if='states === 2'>
        <p>
          <span>性别：</span>{{gender}}</p>
        <p>
          <span>年龄：</span>{{age}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      gender: '',
      age: '',
      dialogImageUrl: '',
      dialogVisible: false,
      states: 0
    }
  },
  created () { },
  mounted () { },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.states = 2
      if (res.gender.length > 0) {
        this.age = res.ages[0].age || '无'
        this.gender = res.gender[0].gender === 0 ? '男' : '女'
      } else {
        this.age = '无'
        this.gender = '无'
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`提供一张图片即可`)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleAvatarError () {
      this.$message.error('上传图片失败，请重试!')
      this.states = 0
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarRemove (file) {
      this.states = 0
    },
    beforeAvatarUpload (file) {
      let isPass = false
      const isJPG = file.type === 'image/jpg'
      const isJPEG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (isJPG || isJPEG || isPNG) {
        isPass = true
      } else {
        isPass = false
        this.$message.error('上传图片格式错误!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      this.states = 1
      return isPass && isLt2M
    }
  },
  components: {},
  computed: {}
}

</script>
