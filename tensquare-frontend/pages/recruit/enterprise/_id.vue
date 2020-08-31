<template>
  <!--两列布局-->
  <div class="wrapper tag-item">
    <div class="job-intro">
      <div class="left-img">
        <img :src="this.logo" alt="" class="img"/>
      </div>
      <div class="middle-intro">
        <div class="name">{{this.name}}</div>
        <div class="tag">
          <li v-for="(item,index) in labels" :key="index">{{item}}</li>
        </div>
        <p class="link"><a :href="this.url">{{this.url}}</a></p>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="company-index">
      <li class="active"><span>企业主页</span></li>
      <li class="active"><span>招聘岗位</span></li>
    </div>
    <div class="fl left-list">
      <div class="tit">关于我们</div>
      <div class="content">
        {{this.summary}}
      </div>
    </div>
    <div class="fl right-tag">
      <div class="tit">招聘岗位</div>
      <div class="job-item" v-for="(item,index) in joblist" :key="index">
        <nuxt-link :to="`/recruit//item/${item.id}`"><p><span class="name">{{item.jobname}}</span></p></nuxt-link><div class="city"><i class="fa fa-map-marker"></i> {{item.address}}</div>
        <p class="need"><span class="money">{{item.salary}}</span>/{{item.mycondition}}/{{item.education}}/{{item.type==="1"?"全职":"兼职"}}</p>
        <p><span class="company">{{name}} · {{item.createtime}}</span></p>
      </div>
      <p class="more"><nuxt-link to="/recruit"><a>查看更多职位 > </a></nuxt-link></p>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '@/assets/css//page-sj-recruit-company.css'
  import axios from 'axios'
  import enterpriseApi from "@/api/enterprise";
  import recruitApi from "@/api/recruit";

  export default {
      name: "_id",
      asyncData({params}) {
          return axios.all([enterpriseApi.findById(params.id), recruitApi.search(1, 5, {"eid": params.id})]).then(
              axios.spread((res1, res2) => {
                  console.log(res1.data)
                  return {
                      name: res1.data.data.name,
                      summary: res1.data.data.summary,
                      address: res1.data.data.address,
                      labels: res1.data.data.labels.split(","),
                      logo: res1.data.data.logo,
                      url: res1.data.data.url,
                      joblist: res2.data.data.rows
                  }
              })
          )
      }
  }
</script>

<style scoped>
.img{
  width: 150px;
  height: 150px;
}
</style>
