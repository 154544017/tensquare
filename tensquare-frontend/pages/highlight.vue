<template>
  <div class="wrapper">
    <div class="sj-content">
      <div class="left-nav">
        <div class="float-nav" id="float-nav">
          <ul class="sui-nav nav-tabs nav-xlarge tab-navbar tab-vertical">
            <nuxt-link to="/highlight/channel/0" tag="li" active-class="active" exact><a>热门</a></nuxt-link>
            <nuxt-link tag="li" :to="`/highlight/channel/${item.id}`" active-class="active" v-for="(item,index) in channellist" :key="index"><a>{{item.name}}</a></nuxt-link>
          </ul>
        </div>
      </div>
      <nuxt-child></nuxt-child>
      <div class="right-content">
        <div class="fl right">
          <div class="activity">
            <div class="acti">
              <img :src="this.img[0]" alt="活动一"/>
            </div>
            <div class="acti">
              <img :src="this.img[1]" alt="活动二"/>
            </div>
          </div>
          <div class="block-btn">
            <p>今天，有什么好东西要和大家分享么?</p>
            <nuxt-link to="/article/submit"><a class="sui-btn btn-block btn-share">发布分享</a></nuxt-link>
          </div>
          <div class="question-list">
            <h3 class="title">热门回答</h3>
            <div class="lists">
              <ul>
                <li class="list-item" v-for="(item,index) in hotlist" :key="index"><a :href="`/qa/item/${item.id}`"><p class="list-title">{{item.title}}</p></a>
                  <p class="authorInfo"><span class="authorName"><img src="~/assets/img/widget-photo.png"
                                                                      alt=""/>{{item.nickname}}</span> <span>{{item.createtime}}</span></p>
                </li>
              </ul>
              <nuxt-link to="/qa"><a class="sui-btn btn-block btn-bordered btn-more">查看更多</a></nuxt-link>
            </div>
          </div>
          <div class="activity-list">
            <h3 class="title">活动日历</h3>
            <div class="list">
              <ul>
                <li class="list-item" v-for="(item,index) in gatheringlist" :key="index"> <p class="list-time"> {{item.starttime}} {{item.city}}</p>
                  <a :href="`/gathering/item/${item.id}`"><div class="list-content clearfix">
                    <div class="fl img">
                      <img :src="item.image" alt=""/>
                    </div>
                  </div></a>
                  <div>
                    <p>{{item.summary}}</p>
                  </div>
                </li>
              </ul>
              <nuxt-link to="/gathering"><a class="sui-btn btn-block btn-bordered btn-more">查看更多</a></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import '~/assets/css/page-headline-logined.css'
    import channelApi from "@/api/channel";
    import problemApi from "@/api/problem";
    import gatheringApi from "@/api/gathering";
    import imageApi from "@/api/image";
    import axios from 'axios'
    export default {
        asyncData(){
            return axios.all([channelApi.getList(),problemApi.list("hotlist",0,1,5),gatheringApi.search(1,4,{"state":"1"}),imageApi.getImgs()]).then(axios.spread((res1,res2,res3,res4)=>{
                return {
                    channellist:res1.data.data.rows,
                    hotlist:res2.data.data.rows,
                    gatheringlist:res3.data.data.rows,
                    img:res4.data.data
                }
            }))
        },
    }
</script>

