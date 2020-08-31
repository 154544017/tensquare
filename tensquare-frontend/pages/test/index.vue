<template>
    <div>
      {{this.resp}}
    </div>
</template>

<script>
  import problemApi from "@/api/problem";
  import articleApi from "@/api/article";
  import channelApi from "@/api/channel";
  import enterprise from "@/api/enterprise";
  import recruitApi from "@/api/recruit";
  import gatheringApi from "@/api/gathering";
  import labelApi from "@/api/label";
  import replyApi from "@/api/reply";
  import spitApi from "@/api/spit";
  import userApi from "@/api/user";

    export default {
        name: "index",
        asyncData(){
            return userApi.login("123","123456").then(res=>{
                return {
                    resp: res.data
                }
            })
        }
    }
</script>

<style scoped>

</style>
