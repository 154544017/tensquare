<template>
  <div>
    <!--两列布局-->
    <div class="wrapper tag-item">
      <div class="fl left-list">

        <div class="job-position">
          <div class="job-type reco-job">
            <div class="head">
              <h4 class="title pull-left">推荐职位</h4>
              <div class="clearfix"></div>
            </div>
            <ul class="yui3-g job-list" style="display:block;">
              <li class="yui3-u-1-2 job-item" v-for="(item,index) in recommendList" :key="index">
                <p><span class="name"><nuxt-link :to="`/recruit/item/${item.id}`">{{item.jobname}}</nuxt-link></span><span class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p> <p class="need"><span class="money">{{item.salary}}</span>{{item.mycondition}}/{{item.education}}/{{item.type==="1"?"全职":"兼职"}}</p> <p><span class="company">{{item.createtime}}</span></p>
              </li>
            </ul>
          </div>
          <div class="job-type latest-job">
            <div class="head">
              <h4 class="title pull-left">最新职位</h4>
              <div class="clearfix"></div>
            </div>
            <ul class="yui3-g job-list" style="display:block;">
             <li class="yui3-u-1-2 job-item"  v-for="(item,index) in newList" :key="index"> <p><span class="name"><nuxt-link :to="`/recruit/item/${item.id}`">{{item.jobname}}</nuxt-link></span><span class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p> <p class="need"><span class="money">{{item.salary}}</span>{{item.mycondition}}/{{item.education}}/{{item.type==="1"?"全职":"兼职"}}</p> <p><span class="company">{{item.createtime}}</span></p> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="hot-company">
          <p class="mail">提交收录请发邮件至wxn@wxn.com</p>
          <div class="company">
            <div class="head">
              <h4>热门企业</h4>
            </div>
            <ul class="yui3-g company" style="display:block;">
                <li class="yui3-u-1-3 company-item" v-for="(item,index) in hotList" :key="index"> <p><img :src="item.logo" alt="" class="enterprise"/></p> <nuxt-link :to="`/recruit/enterprise/${item.id}`"><p class="title">{{item.name}}</p></nuxt-link> <p class="position">{{item.jobcount}}个职位</p> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/page-sj-recruit-index.css'
  import recruitApi from "@/api/recruit";
  import enterpriseApi from "@/api/enterprise";
  import axios from 'axios'
    export default {
        name: "recruit",
        asyncData(){
           return  axios.all([recruitApi.recommend(),recruitApi.newList(),enterpriseApi.hotList()])
                .then(axios.spread((recommendList,newList,hotList)=>{
                    return {
                        recommendList: recommendList.data.data,
                        newList: newList.data.data,
                        hotList: hotList.data.data
                    }
                }))
        }
    }
</script>

<style scoped>
.enterprise{
  width:80px;
  height:80px
}
</style>
