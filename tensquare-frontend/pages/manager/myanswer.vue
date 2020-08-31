<template>
  <div class="right-content">
    <div class="answers">
      <h4><span>我的回答</span></h4>
      <ul class="answer-list">
        <li v-for="(item,index) in answers" :key="index"> <span class="fl good"> <span class="num">{{item.thumbup}}</span> 有用</span> <span class="title"><a :href="`/qa/item/${item.id}`">{{item.title}}</a></span> <span class="fr date">{{item.createtime}}</span> <span class="clearfix"></span> </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-person-myanswer.css'
  import problemApi from "@/api/problem";
    export default {
        name: "myanswer",
        data(){
          return {
              answers:[]
          }
        },
        created() {
            problemApi.getMyAnswer().then(res=>{
                this.answers=res.data.data
            })
        }
    }
</script>

<style scoped>

</style>
