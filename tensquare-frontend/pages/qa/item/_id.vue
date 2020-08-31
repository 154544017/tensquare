<template>
  <div class="wrapper qa-content">

    <div class="qa-title">
      <div class="fl title">
        <h2>{{problem.title}}</h2>
        <p>
          <span class="author">{{problem.nickname}}</span>
        </p>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="fl left-list">
      <div class="problem-detail">
        <div class="title-intro">
          <div class="sidebar">

            <button type="button" class="like" data-placement="right" data-toggle="tooltip"
                    title="问题对人有帮助，内容完整，我也想知道答案" @click="thumbup"><i class="fa fa-caret-up" aria-hidden="true"></i></button>
            <span class="count">{{problem.thumbup}}</span>
            <button type="button" class="hate" data-placement="right" data-toggle="tooltip"
                    title="问题没有实际价值，缺少关键内容，没有改进余地" @click="thumbdown"><i class="fa fa-caret-down" aria-hidden="true"></i></button>

          </div>
          <div class="title">
            <div class="detail" v-html="problem.content">
              {{problem.content}}
            </div>
            <div class="clearfix"></div>
            <div class="comment-box">
              <form class="comment-form">
                <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                <button type="submit" class="sui-btn submit-comment">提交评论</button>
              </form>
              <div class="tips">
                <p>评论支持部分 Markdown 语法：**bold**_italic_[link](http://example.com)> 引用`code`- 列表。 同时，被你 @ 的用户也会收到通知</p>
              </div>
            </div>

          </div>

        </div>
        <div class="answer-intro">
          <h4 class="answer-num">{{replies.length}}个回答</h4>

          <ul class="title">
            <li v-for="(item,index) in replies" :key="index">
              <p v-html="item.content">{{item.content}}</p>
              <div class="operate">
                <div class="tool pull-left">
                  <span class="time">回答时间:{{item.createtime}}</span>
                </div>
              </div>
              <hr>
            </li>

          </ul>


          <div class="clearfix"></div>
        </div>
        <div class="edit-answer">
          <h4>撰写答案</h4>
          <div class="editor">
            <div class="quill-editor"
                 :content="content"
                 @change="onEditorChange($event)"
                 v-quill:myQuillEditor="editorOption">
            </div>
            <div class="btns">
              <button class="sui-btn btn-danger btn-release" @click="submit">发布</button>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
    import '~/assets/css/page-sj-qa-detail.css'
    import axios from 'axios'
    import replyApi from "@/api/reply";
    import problemApi from "@/api/problem";
    import authApi from "@/utils/auth";
    import spitApi from "@/api/spit";

    export default {
        name: "_id",
        data() {
            return {
                content: "",
            }
        },
        asyncData({params}) {
            return axios.all([problemApi.getProblem(params.id), replyApi.getReplies(params.id)]).then(
                axios.spread((res1, res2) => {
                    console.log(res2.data)
                    return {
                        problem: res1.data.data,
                        replies: res2.data.data.rows,
                        problemId: params.id
                    }
                })
            )
        },
        methods: {
            onEditorChange({editor, html, text}) {
                console.log('editor change!', editor, html, text);
                this.content = html;
            },
            submit() {
                if (this.content) {
                    replyApi.submit({content: this.content, problemid: this.problemId}).then(response => {
                        this.$message({
                            message: response.data.message,
                            type: (response.data.flag ? 'success' : 'error')
                        });
                        if (response.data.flag) {
                            this.content="";
                            this.$router.go(0);
                        }
                    })
                } else {
                    this.$message({
                        message: "必须写点什么",
                        type: 'error'
                    })
                }
            },
            thumbup() {
              if (authApi.getUser().name === undefined) {
                this.$message({
                  message: "登录后才可以觉得有用哦~",
                  type: 'warning'
                });
                return;
              }
              this.problem.thumbup++;
            },
            thumbdown(){
              if(authApi.getUser().name === undefined){
                this.$message({
                  message: "登录后才可以点踩哦~",
                  type: 'warning'
                });
                return;
              }
              this.problem.thumbup--;
            }
        }
    }
</script>

<style scoped>
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
