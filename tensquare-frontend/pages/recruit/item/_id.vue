<template>
    <div>
      <!--两列布局-->
      <div class="wrapper tag-item">
        <div class="job-intro">
          <div class="left-img">
            <img :src="enterpriseItem.image" alt="" />
          </div>
          <div class="middle-intro">
            <div class="name">
              {{item.jobname}} &middot; {{enterpriseItem.name}}
            </div>
            <div class="intro">
              {{item.salary}} / {{item.mycondition}} / {{item.education}} / {{item.type==="1"?"全职":"兼职"}}
            </div>
            <div class="tag">
              <li v-for="(temp,index) in item.label.split(',')" :key="index">{{temp}}</li>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div class="fl left-list ">
          <div class="tit">
            <span>职位描述</span>
          </div>
          <div class="content">
            <p>{{item.content1}}</p>
          </div>
          <div class="tit">
            <span>职位要求</span>
          </div>
          <div class="content">
            <p>{{item.content2}}</p>
          </div>
          <div class="time">
            {{item.createtime}}
          </div>
        </div>
        <div class="fl right-tag">
          <div class="company-job">
            <div class="intro">
              <img :src="enterpriseItem.image" alt="" />
              <div class="title">
                {{enterpriseItem.name}}
              </div>
              <div class="content">
                {{enterpriseItem.summary}}
              </div>
            </div>
            <div class="tag">
              <li v-for="(label,index) in enterpriseItem.labels.split(',')" :key="index">{{label}}</li>
            </div>
            <div class="btns">
              <a class="sui-btn btn-home" :href="enterpriseItem.url" target="_blank">企业主页</a>
              <a class="sui-btn btn-position">{{enterpriseItem.jobcount}}个职位</a>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import '~/assets/css/page-sj-recruit-detail.css'
  import recruitApi from "@/api/recruit";
  import enterpriseApi from "@/api/enterprise";
    export default {
        name: "_id",
        asyncData({params}) {
            return recruitApi.findById(params.id).then(response=>{
                console.log(response.data.data)
                return enterpriseApi.findById(response.data.data.eid).then(response2=>{
                    return {
                        item: response.data.data,
                        enterpriseItem: response2.data.data
                    }
                })
            })

        },
    }
</script>

<style scoped>

</style>
