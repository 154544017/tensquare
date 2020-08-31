<template>
  <!--中间布局-->
  <div class="wrapper activities">
    <div class="activity-card-list">
      <div class="top-title">
        <h4 class="latest">最新活动</h4>
        <div class="clearfix"></div>
      </div>
      <div class="activity-list">
        <ul class="activity" >
          <li class="activity-item" v-for="(item,index) in items" :key="index">
            <div class="activity-inner">
              <a href="http://"></a>
              <div class="img">
                <a :href="`/gathering/item/${item.id}`" target="_blank"><img :src="item.image" alt="" /></a>
              </div>
              <div class="text">
                <p class="title">{{item.name}}</p>
                <div class="fl goin">
                  <p>时间：{{item.starttime}}</p>
                  <p>城市：{{item.city}}</p>
                </div>
                <div class="fr btn">
                  <span class="sui-btn btn-bao" @click="attend">立即报名</span>
                </div>
                <div class="clearfix"></div>
              </div>
            </div> </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
    import '~/assets/css/page-sj-activity-index.css'
    import gatheringApi from "@/api/gathering";
    import authApi from "@/utils/auth";
    export default {
        data(){
            return {
                busy: false,
                pageNo: 1
            }
        },
        asyncData() {
            return gatheringApi.search(1, 12, {state: '1'}).then(response => {
                return {items: response.data.data.rows}
            })
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
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
                gatheringApi.search(this.pageNo, 12, {state: '1'}).then(response => {
                    this.items = this.items.concat(response.data.data.rows, this.items);
                    this.busy = false;
                })
            },
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
