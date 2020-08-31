<template>
<div>
  <div class="wrapper qa-content">
    <div class="fl left-list">
      <div class="tab-content">
        <div id="index" class="tab-pane active">
          <div class="tab-bottom-line">
            <ul class="sui-nav nav-tabs">
              <li :class="type === 'new'?'active':''"><a @click="type='new'" data-toggle="tab">最新</a></li>
              <li :class="type === 'hot'?'active':''"><a @click="type='hot'"  data-toggle="tab">热门</a></li>
              <li :class="type === 'wait'?'active':''"><a @click="type='wait'" data-toggle="tab">待回答</a></li>
            </ul>
            <div class="qa-list">
              <div class="tab-content">
                <div id="new" :class="'tab-pane ' +  (type==='new'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in newlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="title"><nuxt-link :to="`/qa/item/${item.id}`"><a  target="_blank"><div v-html="item.title">{{item.title}}</div></a></nuxt-link></p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <li v-for="(l,index) in item.labellist.split(',')" :key="index">{{l}}</li>
                          </ul>
                          <div class="fr brower">
                            <p>浏览量 {{item.visits}} | {{item.createtime}} 来自 <a href="#">{{item.nickname}} </a></p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div> </li>
                  </ul>
                </div>
                <div id="hot" :class="'tab-pane ' +  (type==='hot'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in hotlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="title"><nuxt-link :to="`/qa/item/${item.id}`"><a  target="_blank"><div v-html="item.title">{{item.title}}</div></a></nuxt-link></p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <li v-for="(l,index) in item.labellist.split(',')" :key="index">{{l}}</li>
                          </ul>
                          <div class="fr brower">
                            <p>浏览量 {{item.visits}} | {{item.createtime}} 来自 <a href="#">{{item.nickname}} </a></p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div> </li>
                  </ul>
                </div>
                <div id="wait" :class="'tab-pane ' +  (type==='wait'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in waitlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="title"><nuxt-link :to="`/qa/item/${item.id}`"><a  target="_blank"><div v-html="item.title">{{item.title}}</div></a></nuxt-link></p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <li v-for="(l,index) in item.labellist.split(',')" :key="index">{{l}}</li>
                          </ul>
                          <div class="fr brower">
                            <p>浏览量 {{item.visits}} | {{item.createtime}} 来自 <a href="#">{{item.nickname}} </a></p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="php" class="tab-pane">
          php
        </div>
        <div id="js" class="tab-pane">
          Javascript
        </div>
        <div id="python" class="tab-pane">
          python
        </div>
        <div id="java" class="tab-pane">
          java
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="block-btn">
        <p>今天，有什么好东西要和大家分享么?</p>
        <nuxt-link to="/qa/submit"><a class="sui-btn btn-block btn-share" target="_blank">发布问题</a></nuxt-link>
      </div>
      <div class="hot-tags">
        <div class="head">
          <h3 class="title">热门标签</h3>
        </div>
        <div class="tags">
          <ul class="sui-tag">
            <li>Php</li>
            <li>Javascript</li>
            <li>Gif</li>
            <li>Java</li>
            <li>C#</li>
            <li>iOS</li>
            <li>C++</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</div>
</template>

<script>
    import '~/assets/css/page-sj-qa-logined.css'
    import problemApi from "@/api/problem";
    import axios from 'axios'
    export default {
        name: "_label",
        data(){
          return {
              type: "new",
              busy: false,
              page_new: 1,
              page_hot: 1,
              page_wait: 1,
          }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        asyncData({params}){
            return axios.all([problemApi.list('newlist',params.label,1,10),problemApi.list('hotlist',params.label,1,10),problemApi.list('waitlist',params.label,1,10)])
                .then(axios.spread((newlist,hotlist,waitlist)=>{
                    return {
                        newlist:newlist.data.data.rows,
                        hotlist:hotlist.data.data.rows,
                        waitlist:waitlist.data.data.rows,
                        label: params.label
                    }
                }))
        },
        methods:{
            handleScroll(){
                let _self = this;
                if (window.scrollY >= document.body.scrollHeight - document.body.clientHeight - 20) {
                    if (!_self.busy) {
                        _self.busy = true;
                        _self.loadMore();
                    }
                }
            },
            loadMore(){
                if (this.type === 'new'){
                    this.page_new++;
                    problemApi.list("newlist",this.label,this.page_new,10).then(response=>{
                        this.newlist=this.newlist.concat(response.data.data.rows)
                        this.busy=false
                    })
                }else if (this.type === 'hot'){
                    this.page_hot++;
                    problemApi.list("hotlist",this.label,this.page_hot,10).then(response=>{
                        this.hotlist=this.hotlist.concat(response.data.data.rows)
                        this.busy=false
                    })
                }else {
                    this.page_wait++;
                    problemApi.list("waitlist",this.label,this.page_wait,10).then(response=>{
                        this.waitlist=this.waitlist.concat(response.data.data.rows)
                        this.busy=false
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
