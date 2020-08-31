<template>
    <div>
      <!--两列布局-->
      <div class="wrapper tag-item">
        <div class="fl left-list">
          <div class="tc-data-list">
            <div class="tc-list">
              <ul class="detail-list">
                <li class="qa-item" v-for="(item,index) in items" :key="index">
                  <div class="fl record">
                    <div class="number">
                      <div class="border useful">
                        <p class="usenum" @click="thumbup(item._id, index)"><a class="zan"><i :class="'fa fa-thumbs-up '+item.zan" aria-hidden="true"></i></a></p>
                        <p class="zannum"> {{item.thumbup}} </p>
                      </div>
                      <div class="border answer">
                        <a href="#" class="star"><i class="fa fa-star-o" aria-hidden="true"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="info">
                    <p class="text"> <nuxt-link :to="`/spit/${item._id}`"><a><div v-html="item.content">{{item.content}}</div></a></nuxt-link> </p>
                    <div class="other">
                      <div class="fl date">
                        <span>{{item.publishtime}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="clearfix"></div> </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="fl right-tag">
          <div class="block-btn">
            <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
            <nuxt-link to="/spit/submit"><a class="sui-btn btn-block btn-share">发吐槽</a></nuxt-link>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>

</template>

<script>
  import '~/assets/css/page-sj-spit-index.css'
  import spitApi from "@/api/spit";
  import authApi from "@/utils/auth";
    export default {
        name: "index",
        data(){
            return {
                busy: false,
                curPage: 1,
            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        asyncData(){
            return spitApi.search(1,10,{state: '1'}).then(response=>{
                let temp = response.data.data.rows.map(item=>{
                    return {
                        ...item,
                        zan:""}
                });
                return {items: temp}
            })
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
                this.pageNo++;
                spitApi.search(this.pageNo, 10, {state: '1'}).then(response => {
                    let temp = response.data.data.rows.map(item=>{
                        return {
                            ...item,
                            zan:""}
                    });
                    this.items = this.items.concat(temp, this.items);
                    this.busy = false;
                })
            },
            thumbup(id,index){
                if(authApi.getUser().name === undefined){
                    this.$message({
                        message: "登录后才可以点赞哦~",
                        type: 'warning'
                    });
                    return;
                }
                if(this.items[index].zan === 'color'){
                    this.$message({
                        message: "不可以重复点赞哦~",
                        type: 'warning'
                    });
                    return;
                }
                spitApi.thumbup(id).then(response=>{
                    if (response.data.flag){
                        this.items[index].thumbup++;
                        this.items[index].zan = 'color';
                    }else {
                        this.$message({
                            message: response.data.message,
                            type: 'error'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
