<template>
  <div class="wrapper headline-content">
    <div class="fl left-list">
      <div class="problem-detail">
        <!-- title area  -->
        <div class="title-intro">
          <h2>{{this.title}}</h2>
          <div class="operate">
            <span class="fl author">{{this.publisher}}发布　　<span class="time">{{this.createtime}}</span></span>
          </div>
          <div class="clearfix"></div>
          <div class="content">
            {{this.content}}
          </div>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="focus similar-problem">
        <div class="img-title">
          <div class="fl img">
            <img :src="this.avatar" alt="">
          </div>
          <div class="fl btn-focus">
            <button class="sui-btn btn-info btn-attention" @click="follow">关注</button>
          </div>
          <div class="clearfix"></div>
        </div>
        <ul class="problem-list">
          <li class="list-item">
            {{this.interest}}
          </li>
        </ul>
      </div>
      <div class="similar-problem">
        <h3 class="title">热门吐槽</h3>
        <ul class="problem-list">
          <li class="list-item" v-for="(item,index) in spitlist" :key="index">
            <p class="list-title">{{item.content}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
    import '@/assets/css/page-sj-headline-detail.css'
    import articleApi from "@/api/article";
    import userApi from "@/api/user";
    import spitApi from "@/api/spit";
    import axios from 'axios'
    import authApi from "@/utils/auth";

    export default {
        name: "_id",
        asyncData({params}) {
            return articleApi.getArticle(params.id).then(res => {
                    return axios.all([userApi.getUserInfo(res.data.data.userid), spitApi.search(1, 5, {"state": 1})]).then(
                        axios.spread((res1, res2) => {
                            return {
                                title: res.data.data.title,
                                content: res.data.data.content,
                                publisher: res1.data.data.nickname,
                                avatar: res1.data.data.avatar,
                                interest: res1.data.data.interest,
                                createtime: res.data.data.createtime,
                                spitlist: res2.data.data.rows
                            }
                        })
                    )
                }
            )
        },
        methods:{
            follow(){
                if(authApi.getUser().name === undefined){
                    this.$message({
                        message: "请先登录再关注嗷~",
                        type: "error"
                    })
                    return
                }
                this.$message({
                    message: "已关注",
                    type: "success"
                })
            }
        }
    }

</script>

<style scoped>

</style>
