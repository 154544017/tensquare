<template>
  <div class="wrapper tc-detail">
    <div class="fl left-list">
      <div class="tc-detail">
        <!-- 标题区 -->
        <div class="detail-tit">
          <div class="detail-author">
            <a href="javascript:;">{{pojo.nickname}}</a> 发布
          </div>
          <div class="detail-content">
            <p>{{pojo.content}}</p>
            <img src="~/assets/img/widget-tc-detail.png" alt="" />
          </div>
          <div class="detail-tool">
            <ul>
              <li><i class="fa fa-share-alt" aria-hidden="true"></i> </li>
              <li><a data-toggle="modal" data-target="#remarkModal"><i class="fa fa-commenting" aria-hidden="true" @click="showDialog"></i> </a></li>
            </ul>
          </div>
        </div>
        <!-- 评论区 -->
        <div class="comment-area">
          <div class="comment-tit">
            <span>评论</span>
          </div>
          <ul class="comment-list">
            <li v-for="(item,index) in commentList" :key="index">
              <div class="item-photo">
                <img src="~/assets/img/widget-widget-photo.png" alt="~/assets/img/widget-widget-photo.png" />
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">{{item.nickname}}</a> 发布</p>
                <div class="content" v-html="item.content">{{item.content}}</div>
              </div></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="block-btn">
        <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
        <nuxt-link to="/spit/submit"><a class="sui-btn btn-block btn-share" target="_blank">发吐槽</a></nuxt-link>
      </div>
    </div>
    <div class="clearfix"></div>

    <el-dialog
      title="发表评论"
      :visible.sync="dialogVisible"
      width="40%">
      <div class="quill-editor"
           :content="content"
           @change="onEditorChange($event)"
           v-quill:myQuillEditor="editorOption">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitComment">发 布</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-spit-detail.css'
  import axios from 'axios'
  import spitApi from "@/api/spit";
  import auth from "@/utils/auth";
    export default {
        name: "index",
        data(){
          return {
              dialogVisible:false,
              content: "",
              editorOption: {
                  // some quill options
                  modules: {
                      toolbar: [
                          ['bold', 'italic', 'underline', 'strike'],
                          ['blockquote', 'code-block']
                      ]
                  }
              }
          }
        },
        asyncData({params}){
            return axios.all([spitApi.findById(params.id),spitApi.findCommentsById(params.id)]).then(
                axios.spread((res1,res2)=>{
                    return {
                        pojo: res1.data.data,
                        commentList: res2.data.data.rows
                    }
                })
            )
        },
        methods:{
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            showDialog(){
                if (auth.getUser().name === undefined){
                    this.$message({
                        message: "要先登录才能评论嗷~~",
                        type:'error'
                    });
                    return
                }
                this.dialogVisible=true;
                this.content="";
            },
            submitComment(){
                if (!this.content){
                    this.$message({
                        message: "必须要写点东西嗷~",
                        type:'error'
                    });
                    return
                }
                spitApi.submitSpit({content:this.content,parentid:this.pojo._id}).then(response=>{
                      this.$message({
                          message: response.data.message,
                          type: response.data.flag? "success" : 'error'
                      });
                      if(response.data.flag){
                          this.dialogVisible=false;
                          spitApi.findCommentsById(this.pojo._id).then(response=>{
                              this.commentList=response.data.data.rows
                          })
                      }
                })
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
