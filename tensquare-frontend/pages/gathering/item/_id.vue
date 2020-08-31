<template>
    <div>
      <!--中间布局-->
      <div class="wrapper activities">
        <h1>{{item.name}}</h1>
        <div class="img-text">
          <div class="left-img">
            <img :src="item.image" alt="" />
          </div>
          <div class="right-txt">
            <p>开始时间： {{item.starttime}}</p>
            <p>结束时间： {{item.endtime}}</p>
            <p>举办地点： {{item.address}}</p>
            <p>主办方：{{item.sponsor}}</p>
            <p>报名截止： {{item.enrolltime}}</p>
            <div class="join">
              <button class="sui-btn btn-danger" @click="attend">立即报名</button>
              <span class="will"></span>
            </div>
          </div>
        </div>
        <div class="simple-text">
          <div class="left-content">
            <div class="content-item">
              <div class="tit">
                <span>大会介绍</span>
              </div>
              <div class="text">
                <h4></h4>
                <p>{{item.summary}}</p>
              </div>
            </div>
            <div class="content-item">
              <div class="tit">
                <span>议题简介</span>
              </div>
              <div class="text">
                <h4></h4>
                <div v-html="item.detail">{{item.detail}}</div>
              </div>
            </div>
          </div>
          <div class="right-intro">
            <div class="content-item">
              <div class="tit">
                <span>{{item.sponsor}}</span>
              </div>
              <div class="text">
                <p>主办方： {{item.sponsor}}</p>
              </div>
            </div>
            <div class="content-item">
              <div class="tit">
                <span>相关链接</span>
              </div>
              <div class="text">
                <p>活动官网： infoQ.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import '~/assets/css/page-sj-activity-detail.css'
    import gatheringApi from "@/api/gathering";
    import axios from 'axios'
    import authApi from "@/utils/auth";

    export default {
        name: "_id",
        asyncData({params}) {
            return gatheringApi.findById(params.id).then(response=>{
                return {item: response.data.data}
            })

        },
        methods:{
            attend(){
                if (authApi.getUser().name===undefined){
                    this.$message({
                        message: "请先登录才能报名嗷~",
                        type: 'error'
                    })
                    return
                }
                this.$message({
                    message: "报名成功",
                    type: 'success'
                })
            }
        }

    }
</script>

<style scoped>

</style>
