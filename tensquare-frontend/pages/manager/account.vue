<template>
  <div class="right-content">
    <div class="home-content">

      <div class="activities account-type">
        <h4 class="tit"><span>账户设置</span></h4>
        <div class="account-main">


          <div class="account-person">
            <h3>个人账号</h3>
            <ul class="account-info">
              <li> <span class="gray index">名字</span> <span class="info">{{nickname}}</span>
                <span @click="open('nickname')"><span class="gray edit"><i class="fa fa-pencil" aria-hidden="true"></i> 编辑</span></span></li>
              <li> <span class="gray index">个性网址</span> <span class="info">{{url}}</span>
                <span @click="open('personality')"><span class="gray edit"><i class="fa fa-pencil" aria-hidden="true"></i> 编辑</span></span> </li>
              <li> <span class="gray index">Email </span> <span class="info">{{email}}</span>
                <span @click="open('email')"><span class="gray edit"><i class="fa fa-pencil" aria-hidden="true"></i> 编辑</span></span> </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import '~/assets/css/page-sj-person-account.css'
  import userApi from "@/api/user";
    export default {
        name: "account",
        data(){
            return {
                nickname:"",
                url:"personality",
                email:"email"
            }
        },
        created() {
            userApi.getMyInfo().then(res=>{
                console.log(res.data.data)
                this.nickname=res.data.data.nickname;
                this.url=res.data.data.personality;
                this.email=res.data.data.email
            })
        },
        methods: {
            open(info) {
                this.$prompt('请输入'+info, info, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    userApi.modifyInfo({[info]:value}).then(res=>{
                        this.$message({
                            type: res.data.flag == true? "success":"error",
                            message: res.data.message
                        });
                        if (res.data.flag){
                            switch (info) {
                                case 'nickname':this.nickname=value;break
                                case 'personality':this.url=value;break
                                case 'email':this.email=value;break
                            }
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
