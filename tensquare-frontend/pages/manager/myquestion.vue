<template>
  <div class="right-content">
    <div class="questions">
      <h4><span>我的提问</span></h4>
      <ul class="question-list">
        <li v-for="(item,index) in questions" :key="index"> <span class="fl good"><span class="num">{{item.thumbup}}</span> 有用</span> <span class="title"><a :href="`/qa/item/${item.id}`">{{item.title}}</a></span> <span class="fr date">{{item.createtime}}</span> <span class="clearfix"></span> </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-person-myquestion.css'
  import problemApi from "@/api/problem";
    export default {
        name: "myquestion",
        data(){
            return {
                questions:[]
            }
        },
        created() {
            problemApi.getMyQuestion().then(res1=>{
                    this.questions = res1.data.data.rows;
            })
        }
    }
</script>

<style scoped>

</style>
