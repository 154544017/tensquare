<template>
  <!--两列布局-->
  <div class="wrapper">
    <div class="submit-headline">
      <div class="left-box">
        <h3 class="tit">
          <span>发布头条</span>
        </h3>
        <form class="sui-form form-horizontal">
          <div class="control-group">
            <div class="controls title-input">
              <input v-model="pojo.title" type="text" id="inputEmail" placeholder="标题：不超过30个字符">
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
            <span><a class="sui-btn btn-release btn-xlarge" @click="submit">发布头条</a></span>
          </div>
        </form>
      </div>
      <div class="right-tips">
        <h3>发帖指南</h3>
        <ul>
          <li>独立思考、自由探索</li>
          <li>发布的内容和互联网、编程开发、产品设计有关</li>
          <li>标题能准确描述的内容，不要发重复的内容</li>
          <li>客观投票，确保你看过这篇内容</li>
          <li>如果你遇到了具体的编程难题，请到 问答平台 提问</li>
          <li>保持友善，禁止任何形式的广告、SEO 推广</li>
          <li>遵循 用户服务条款</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/css/page-sj-headline-submit.css'
  import articleApi from "@/api/article";
  import authApi from "@/utils/auth";
    export default {
        name: "submit",
        data(){
            return{
                content:"",
                pojo:{},
                editorOption:''
            }
        },
        methods:{
            onEditorChange({ editor, html, text }) {
                this.content=html;
            },
            submit(){
                if (authApi.getUser().name == undefined){
                    this.$message({
                        message: "必须登录才能发表文章嗷~",
                        type:  'error'
                    });
                    return
                }
                if (this.content){
                    this.pojo.content = this.content;
                    articleApi.postArticle(this.pojo).then(response => {
                        this.$message({
                            message: response.data.message,
                            type: (response.data.flag ? 'success' : 'error')
                        });
                        if (response.data.flag){
                            this.$router.push("/highlight");
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
    max-height: 1000px;
    overflow-y: auto;
  }
</style>
