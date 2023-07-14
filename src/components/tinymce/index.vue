<!-- tinymc富文本 -->

   
<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import tinymce from 'tinymce/tinymce'
import 'tinymce/skins/content/default/content.css'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'; //引入编辑器图标icon，不引入则不显示对应图标

import "tinymce/icons/default/icons"
import "tinymce/plugins/image" // 插入上传图片插件
import "tinymce/plugins/media" // 插入视频插件
import "tinymce/plugins/code"; // 代码块插件
import "tinymce/plugins/table" // 插入表格插件
import "tinymce/plugins/lists" // 列表插件
import "tinymce/plugins/charmap";
import "tinymce/plugins/anchor";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/autosave";
import "tinymce/plugins/anchor";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/quickbars";
const props = defineProps({
  statusbar: false,
  value: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  selector: '#tinydemo',
  //插件
  plugins: {
    type: [String, Array],
    default:
      "searchreplace visualblocks visualchars image media code table charmap pagebreak nonbreaking anchor insertdatetime lists autosave quickbars",
  },
  toolbar: {
    type: [String, Array],
    default:
        "code undo redo restoredraft | fullscreen | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript | \
    table image media charmap hr | bdmap indent2em lineheight",
  },
})
const emits = defineEmits(["getContent"])

const myValue = ref(props.value)
const init = reactive({
  //汉化,路径是自定义的，一般放在public或static里面，汉化文件要自己去下载
  language_url: '/tinymce/lang/zh_CN.js',
  language: "zh_CN",
  //皮肤
  skin: "oxide",
  skin_url: 'tinymce/skins/ui/oxide', // skin路径
  content_css: 'tinymce/skins/content/default/content.css',
  //插件
  plugins: props.plugins,
  //工具栏
  toolbar: props.toolbar,
  //高度
  height: 500,
  //图片上传
  images_upload_handler: async (blobInfo, success, failure) => {
    var xhr, formData;
    var file = blobInfo.blob();//转化为易于理解的file对象
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', '/xxxxx');
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText)
      if (json.code === 200) { success(json.data) }
      else { failure(json.message) }
    };
    formData = new FormData();
    formData.append('file', file, file.name);//此处与源文档不一样
    xhr.send(formData);

  },

  file_picker_callback: (callback, value, meta) => {
    const _tath = this;
    var filetype =
      ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
    var materialType = "";
    switch (meta.filetype) {
      case "image":
        filetype = ".jpg, .jpeg, .png, .gif";
        materialType = "1";
        break;
      case "media":
        filetype = ".mp3, .mp4";
        break;
      case "file":
      default:
    }
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", filetype);
    input.click();
    input.onchange = function () {
      var file = this.files[0];
      if (file.type == "video/mp4" || file.type.indexOf("video") != -1) {
        materialType = "3";
      } else if (
        file.type == "audio/mpeg" ||
        file.type == "audio/mp3" ||
        file.type.indexOf("audio") != -1
      ) {
        materialType = "2";
      }
      if (materialType == "1") {
        // 图片上传
        const fileData = new FormData();
        // fileData.append("file", file);
        // request.post("/admin/ajax/uploadweb?user_token=" + getToken(), fileData)
        //   .then((res) => {
        //     callback(res.data.url, { title: file.name });
        //   });
      } else {
        // 音频、视频上传
        // const fileData = new FormData();
        // fileData.append("file", file);
        // request.post("/admin/ajax/uploadweb?user_token=" + getToken(), fileData)
        //   .then((res) => {
        //     callback(res.data.url, { title: file.name });
        //   });
      }
    }
  }
})

onMounted(() => {
  tinymce.init({});
})
//添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
// function clear() {
//   myValue.value = "";
// }
watch(() => myValue.value, () => {
  emits("getContent", myValue.value)
})

defineExpose({
  init
})
</script>

<template>
  <div>
    <Editor id="tinydemo" :init="init" :disabled="disabled" v-model="myValue"></Editor>
  </div>
</template>

<style scoped></style>