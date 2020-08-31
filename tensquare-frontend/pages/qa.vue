<template>
  <div>
    <div class="tab-nav ">
      <div class="wrapper">
        <ul class="fl sui-nav nav-tabs navbar-dark">
          <nuxt-link tag="li" to="/qa/label/0" active-class="active" exact><a>首页</a></nuxt-link>
          <nuxt-link tag="li" :to="`/qa/label/${item.id}`" active-class="active" v-for="(item,index) in labelList" :key="index"><a>{{item.labelname}}</a></nuxt-link>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
    <nuxt-child/>
  </div>
</template>

<script>
    import '~/assets/css/page-sj-qa-logined.css'
    import labelApi from "@/api/label";
    export default {
        name: "index",
        asyncData(){
            return labelApi.getTopList().then(response=>{
                return {
                    labelList:response.data.data
                }
            })
        }
    }
</script>

<style scoped>

</style>
