<template>
  <div>
    <div class="myhome-personinfo" style="background-color:#AEDD81">
      <div class="wrapper">
        <div class="person-baseinfo">
          <!--头像信息-->
          <div class="photo">
            <img :src="avatar" alt="" class="person" />
            <div class="share">
              <div class="social-share" data-sites="weibo,wechat,qq" data-title="coderhub-manager"></div>
            </div>
          </div>
          <!--文字信息-->
          <div class="info">
            <br>
            <h1><span class="allinfo">{{userInfo.nickname}}</span></h1>
            <h1><span class="allinfo">{{userInfo.sex}}</span></h1>
          </div>
        </div>
        <!--右侧编辑-->
        <div class="edit-info">
          <h4>个人介绍<span class="addedit"><img src="~/assets/img/widget-edit.png" width="12" height="12" @click="open"/><span @click="open">编辑</span></span></h4>
          <div class="info-box">
            <div class="edit-intro">
              {{ this.intro }}
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!--两列布局-->
    <div class="wrapper  myhome">
      <div class="left-list">
        <div class="myhome-list">
          <ul class="home-list">
            <nuxt-link to="/manager" tag="li" active-class="active" exact><a>我的主页</a></nuxt-link>
            <nuxt-link to="/manager/myquestion" tag="li" active-class="active"><a>我的提问</a></nuxt-link>
            <nuxt-link to="/manager/myanswer" tag="li" active-class="active"><a>我的回答</a></nuxt-link>
            <nuxt-link to="/manager/account" tag="li" active-class="active"><a>账户设置</a></nuxt-link>
          </ul>
          <ul class="home-list bottom">
          </ul>
        </div>
      </div>
      <div class="right-content">
        <nuxt-child/>
      </div>
      <div class="clearfix"></div>
    </div>

  </div>
</template>

<script>
    import '~/assets/css/page-sj-person-homepage.css'
    import authApi from "@/utils/auth";
    import userApi from "@/api/user";
    export default {
        name: "index",
        data(){
            return {
                userInfo:{},
                intro:""
            }
        },
        created() {
            if(authApi.getUser().name===undefined){
                this.$router.push("/login");
            }
            this.avatar=authApi.getUser().avatar;
            userApi.getMyInfo().then(res=>{
                console.log(res.data.data)
                this.userInfo=res.data.data
                this.intro = this.userInfo.interest
            })
        },
        head:{
            script:[
                {src: 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js'}
            ],
            link:[
                {rel:'stylesheet',href:' https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css'}
            ]
        },
        methods: {
            open() {
                this.$prompt('请输入个人介绍', '个人介绍', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    userApi.modifyInfo({"interest":value}).then(res=>{
                        this.$message({
                            type: res.data.flag == true? "success":"error",
                            message: res.data.message
                        });
                        if (res.data.flag){
                            this.intro = value;
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
