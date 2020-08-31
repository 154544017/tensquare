<template>
  <div class="right-content">
    <div class="fl middle">
      <div class="carousel">
        <div id="myCarousel" data-ride="carousel" data-interval="4000" class="sui-carousel slide">
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="active item">
              <img :src="this.img[2]"/>
            </div>
            <div class="item">
              <img src="~/assets/img/widget-banner02.png"/>
            </div>
            <div class="item">
              <img src="~/assets/img/widget-banner01.png"/>
            </div>
          </div>
        </div>
      </div>
      <div class="data-list">
        <ul class="headline fixed" id="headline">
          <li class="headline-item" v-for="(item,index) in articles" :key="index">
            <div class="fl indexImg">
              <img :src="item.image"/>
            </div>
            <nuxt-link :to="`/article/item/${item.id}`">
              <div class="words">
                <h3>{{item.title}} <span><img src="" class="vip"/></span></h3>
                <h5 class="author">
                  <div class="fl">
                    <span class="authorName" v-if="item.thumbup !== null"> {{item.thumbup}}人赞了这篇文章 </span>
                    <span>{{item.createtime}}</span>
                  </div>
                </h5>
              </div>
            </nuxt-link>
<!--            <p class="content" v-html="item.content">-->
<!--              {{item.content}}</p></li>-->
            <p v-html="ellipsis(item.content)" class="content mycontent">
              {{item.content.length > 350 ? item.content.substr(0,350)+"...":item.content}}</p></li>
        </ul>
        <ul id="loaded" class="headline">
        </ul>
      </div>
      <!-- <script src="~/assets/data-list.js" type="text/javascript"></script> -->
    </div>
  </div>
</template>

<script>
    import '@/assets/css/page-headline-logined.css'
    import articleApi from "@/api/article";
    import imageApi from "@/api/image";
    import axios from 'axios'

    export default {
        name: "_id",
        data() {
            return {
                curPage: 1,
                busy: false,
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        asyncData({params}) {
            let searchmap={};
            if (params.id == 0) {
                searchmap = {"istop": "1"}
            } else {
                searchmap = {"channelid": params.id.toString()}
            }
            return axios.all([articleApi.getList(1, 10, searchmap), imageApi.getImgs()]).then(
                axios.spread((res, res2) => {
                    return {
                        articles: res.data.data.rows,
                        channelId: params.id,
                        img: res2.data.data
                    }
                })
            )
        },
        methods: {
            handleScroll() {
                let _self = this;
                if (window.scrollY >= document.body.scrollHeight - document.body.clientHeight - 20) {
                    if (!_self.busy) {
                        _self.busy = true;
                        _self.loadMore();
                    }
                }
            },
            loadMore() {
                let searchmap={};
                if (this.channelId == 0) {
                    searchmap = {"istop": "1"}
                } else {
                    searchmap = {"channelid": params.id.toString()}
                }
                this.curPage++;
                articleApi.getList(this.curPage, 10, searchmap).then(response => {
                    this.articles = this.articles.concat(response.data.data.rows);
                    this.busy = false
                })

            },
          ellipsis(value) {
            if (!value) return "";
            if (value.length > 350) {
              return value.slice(0, 350) + "...";
            }
            return value;
          }
        }
    }
</script>

<style scoped>

</style>
