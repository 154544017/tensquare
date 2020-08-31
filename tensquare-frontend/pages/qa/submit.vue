<template>
  <div class="wrapper">
  <div class="qa-submit-form">
    <form action="" class="sui-form">
      <div class="input-title">
        <input v-model="title" type="text" placeholder="标题：一句话说清问题，用问号结尾" class="input-xfat input-xxlarge title">
      </div>
      <div class="tags-area">
        <div class="input-tags">
          <input v-model="labellist" type="text" placeholder="标签，如:java可使用逗号，分号； 来分隔" class="input-xfat input-xxlarge" id="tags">
        </div>
        <div class="tags-box">
          <ul class="sui-tag tag-bordered">
            <li class="tag-item">javascript</li>
            <li class="tag-item">php</li>
            <li class="tag-item">css</li>
            <li class="tag-item">html</li>
            <li class="tag-item">java</li>
            <li class="tag-item">python</li>
            <li class="tag-item">html5</li>
            <li class="tag-item">node.js</li>
            <li class="tag-item">c++</li>
          </ul>
        </div>
      </div>

      <div class="editor">
        <div class="quill-editor"
             :content="content"
             @change="onEditorChange($event)"
             v-quill:myQuillEditor="editorOption">
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="submit">
        <span>已保存草稿</span>
        <span><a class="sui-btn btn-release" @click="submit">发布问题</a></span>
      </div>
      <div class="clearfix"></div>
    </form>
  </div>
  </div>
</template>

<script>
  import problemApi from "@/api/problem";
  import '@/assets/css/page-sj-qa-submit.css'
  import authApi from "@/utils/auth";
    export default {
        name: "submit",
        data(){
            return {
                content: "",
                title: "",
                labellist:"",
            }
        },
        methods:{
            onEditorChange({ editor, html, text }) {
                this.content=html;
            },
            submit(){
                if (authApi.getUser().name===undefined){
                    this.$message({
                        message:"登陆后才能发布问题嗷~",
                        type: "error"
                    })
                    return
                }
                if (this.content){
                    problemApi.submit({title: this.title, content: this.content,labellist: this.labellist+",problem"}).then(response => {
                        this.$message({
                            message: response.data.message,
                            type: (response.data.flag ? 'success' : 'error')
                        });
                        if (response.data.flag){
                            this.$router.push("/qa");
                        }
                    })
                }else {
                    this.$message({
                        message: "必须写点什么",
                        type: 'error'
                    })
                }
            }
        }

    }
</script>

<style scoped>
  .quill-editor {
    min-height: 200px;
    max-height: 800px;
    overflow-y: auto;
  }
</style>
