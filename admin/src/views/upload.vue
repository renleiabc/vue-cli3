<template>
  <div>
    <quill-editor ref="myTextEditor"
                  v-model="contentValue"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                  class="cfpa-quill-editor"
                  :style="{ 'min-height': quillEditorHeight + 'px' }">
      <div id="toolbar"
           slot="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold"
                title="加粗">Bold</button>
        <button class="ql-italic"
                title="斜体">Italic</button>
        <button class="ql-underline"
                title="下划线">underline</button>
      
        <button class="ql-strike"
                title="删除线">strike</button>
        <button class="ql-blockquote"
                title="引用"></button>
        <button class="ql-code-block"
                title="代码"></button>
        <button class="ql-header"
                value="1"
                title="标题1"></button>
        <button class="ql-header"
                value="2"
                title="标题2"></button>
        <!--Add list -->
        <button class="ql-list"
                value="ordered"
                title="有序列表"></button>
        <button class="ql-list"
                value="bullet"
                title="无序列表"></button>
        <!-- Add font size dropdown -->
        <select class="ql-header"
                title="段落格式">
          <option selected>段落</option>
          <option value="1">标题1</option>
          <option value="2">标题2</option>
          <option value="3">标题3</option>
          <option value="4">标题4</option>
          <option value="5">标题5</option>
          <option value="6">标题6</option>
        </select>
        <select class="ql-size"
                title="字体大小">
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px"
                  selected>16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
        <select class="ql-font"
                title="字体">
          <option value="SimSun"
                  selected="selected"></option>
          <option value="SimHei"></option>
          <option value="Microsoft-YaHei"></option>
          <option value="KaiTi"></option>
          <option value="FangSong"></option>
          <option value="Arial"></option>
          <!-- <option value="Times-New-Roman"></option>
          <option value="sans-serif"></option> -->
        </select>

        <!-- Add subscript and superscript buttons -->
        <select class="ql-color"
                value="color"
                title="字体颜色"></select>
        <select class="ql-background"
                value="background"
                title="背景颜色"></select>
        <select class="ql-align"
                value="align"
                title="对齐"></select>
        <button class="ql-clean"
                title="还原"></button>
        <button class="ql-link"
                title="超链接"></button>
        <!-- You can also add your own -->
        <button id="custom-button"
                @click.prevent="fnOpenUploadImage"
                title="图片"
                class="ql-image">
          <!-- <i class="iconfont icon-tupian"></i> --></button>
        <button id="custom-button"
                @click.prevent="fnOpenUploadVideo"
                title="视频"
                class="ql-video">
          <!-- s<i class="iconfont icon-video2"></i> --></button>
      </div>
    </quill-editor>
    <div :style="wordCount"
         v-if="wordCount"
         class="cfpa-quill-wordCount">
      <div class="cfpa-quill-wordCount-text">当前已经输入<span style="color: red">{{contentLength}}</span>个字符</div>
    </div>
    <el-dialog :title="title"
               width="30%"
               :visible.sync="dialogFnOpenUpload"
               :close-on-click-modal="false">
      <file-upload :accept="accept"
                   :data_extra="data_extra"
                   @fnUploadSucess="fnUploadSucess"
                   @fnCloseDialog="dialogFnOpenUpload = false"
                   ref="fileUpload"></file-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogFnOpenUpload = false">取 消</el-button>
        <el-button type="primary"
                   @click="fnOpenUploadSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// import FileUpload from "@/components/briefFileUpload";
import config from "../../config.js";
import { Quill, quillEditor } from "vue-quill-editor";

// 图片可收缩
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import img from "../assets/images/logo.png";
// 自定义字体大小
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts; // 将字体加入到白名单
Quill.register(Font, true);

export default {
  name: "editor",
  components: {
    quillEditor
    //FileUpload
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    editorHeight: {
      type: Number,
      default: 355
    },
    editorWordCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      contentValue: "asdasdadsas",
      preContent: "",
      dialogFnOpenUpload: false,
      accept: "",
      uploadType: "image",
      editorOption: {
        modules: {
          toolbar: "#toolbar",
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        },
        placeholder: "请编写内容..."
      },
      data_extra: {
        parentId: 0,
        fileName: ""
      },
      contentLength: 0,
      wordCount: "",
      title: "添加图片",
      quillEditorHeight: 300
    };
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },
  methods: {
    /**
     * @description [onEditorBlur 失去焦点]
     * @author   zoumiao
     * @param {Object} editor 返回的quill对象
     * @return   {null}   [没有返回]
     */
    onEditorBlur(editor) {
      this.$emit("editorBlur");
    },
    /**
     * @description [onEditorFocus 获取焦点]
     * @author   zoumiao
     * @param {Object} editor 返回的quill对象
     * @return   {null}   [没有返回]
     */
    onEditorFocus(editor) {
      this.$emit("editorFocus");
    },
    /**
     * @description [onEditorReady 可以输入]
     * @author   zoumiao
     * @param {Object} editor 返回的quill对象
     * @return   {null}   [没有返回]
     */
    onEditorReady(editor) {},
    /**
     * @description [onEditorChange 输入文本改变事件]
     * @author   zoumiao
     * @param {Object} editor 返回的编辑对象{html, text, quill}
     * @return   {null}   [没有返回]
     */
    onEditorChange(editor) {
      console.log(editor);
      let html = editor.html;
      this.preContent = html;
      console.log(html);
      this.$emit("input", html);
      console.log(editor.text.replace(/\s*/g, "").length);
      this.contentLength = editor.text.replace(/\s*/g, "").length;
    },
    /**
     * @description [fnOpenUploadImage 上传图片]
     * @author   zoumiao
     * @return   {null}   [没有返回]
     */
    fnOpenUploadImage() {
      this.uploadType = "image";
      //this.accept = config.accept.image;
      this.title = "添加图片";
      this.dialogFnOpenUpload = true;
    },
    /**
     * @description [fnOpenUploadVideo 上传视频]
     * @author   zoumiao
     * @return   {null}   [没有返回]
     */
    fnOpenUploadVideo() {
      this.uploadType = "video";
      //this.accept = config.accept.video;
      this.title = "添加视频";
      this.dialogFnOpenUpload = true;
    },
    /**
     * [fnOpenUploadSubmit 提交上传文件]
     * @author   zoumiao
     * @return   {null}   [没有返回]
     */
    async fnOpenUploadSubmit() {
      await this.$refs.fileUpload.$refs.upload.submit();
    },
    /**
     * [fnUploadSucess 上传文件成功]
     * @author   zoumiao
     * @param {Array} uploadFileUrlList [上传文件返回的url]
     * @return   {null}   [没有返回]
     */
    fnUploadSucess(uploadFileUrlList) {
      this.editor.focus();
      for (let url of uploadFileUrlList) {
        this.editor.insertEmbed(
          this.editor.getSelection().index,
          this.uploadType,
          url
        );
      }
    }
  },
  created() {
    //this.quillEditorHeight = document.body.clientHeight - this.editorHeight;
    this.contentValue = `sadasdas<img src=${img} />`;
    this.contentLength = this.editorWordCount || 0;
  },
  mounted() {
    let toolbar = document.querySelector("div.ql-toolbar.ql-snow");
    if (toolbar) {
      let toolbarHeight = toolbar.offsetHeight;
      this.wordCount = {
        top: `${toolbarHeight}px`
      };
      return;
    }
    this.wordCount = {
      top: "42px"
    };
  },
  watch: {
    // Watch content change
    value(newVal, oldVal) {
      if (newVal && newVal !== this.preContent) {
        this.preContent = newVal;
        this.contentValue = newVal;
      } else if (!newVal) {
        this.contentValue = "";
      }
    }
  }
};
</script>
<style lang="scss">
.cfpa-quill-editor {
  line-height: 24px;
  width: 60%;
  margin: 0 auto;
  height: 300px;
  .ql-snow {
    background-color: #ffffff;
  }
}
.cfpa-quill-wordCount {
  background-color: #ffffff;
  position: relative;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  line-height: 20px;
  font-size: 12px;
  .cfpa-quill-wordCount-text {
    text-align: right;
    margin-right: 10px;
    color: #aaa;
  }
}
</style>
