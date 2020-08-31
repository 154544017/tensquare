<template>
    <div>
      <div class="wrapper loginsign">
        <div class="item signup">
          <div class="form">
            <h3 class="loginsign-title">注册新账号</h3>
            <form class="sui-form">
              <div class="control-group">
                <label for="inputname" class="control-label">名字</label>
                <div class="controls">
                  <input type="text" id="inputname" v-model="pojo.nickname" placeholder="真实姓名或常用昵称" class="input-xlarge" />
                </div>
              </div>
              <div class="different">
                <div class="radio-content">
                  <div id="a1" class="phone">
                    <div class="control-group number">
                      <input type="text" v-model="pojo.mobile" placeholder="仅支持大陆手机号" class="input-xlarge" />
                    </div>
                    <div class="control-group code">
                      <div class="input-append">
                        <input id="appendedInputButton" type="text" v-model="code" placeholder="短信验证" class="span2 input-large msg-input" />
                        <button type="button" class="sui-btn msg-btn" @click="sendsms">获取验证码</button>
                      </div>
                    </div>
                    <div class="control-group">
                      <label for="inputpassword" class="control-label">密码</label>
                      <div class="controls">
                        <input type="password" id="inputpassword" v-model="pojo.password" placeholder="请输入6-16位密码" class="input-xlarge" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="control-group btn-signup">
                <label class="control-label"></label>
                <div class="controls">
                  <button type="button" class="sui-btn btn-danger btn-yes" @click="register">注 册</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="item">
          <div class="form">
            <h3 class="loginsign-title">用户登录</h3>
            <form class="sui-form login-form">
              <div class="control-group">
                <label for="inputname" class="control-label">手机号：</label>
                <div class="controls">
                  <input type="text" id="inputname" v-model="mobile" placeholder="11位手机号" class="input-xlarge" data-rules="required" />
                </div>
              </div>
              <div class="control-group">
                <label for="inputpassword" class="control-label">密码：</label>
                <div class="controls">
                  <input type="password" id="inputpassword" v-model="password" placeholder="输入登录密码" class="input-xlarge" />
                </div>
              </div>
              <div class="controls">
                <button type="button" class="sui-btn btn-danger btn-yes" @click="login">登 录</button>
              </div>
              <div class="other-methods">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import '~/assets/css/page-sj-person-loginsign.css'
  import userApi from "@/api/user";
  import Auth from '@/utils/auth'
    export default {
        name: "index",
        data(){
            return {
                pojo: {},
                code: "",
                mobile: "",
                password: ""
            }
        },
        methods:{
            sendsms(){
                userApi.sendsms(this.pojo.mobile).then(response=>{
                    this.$message({
                        message: response.data.message,
                        type: (response.data.flag? 'success' : 'error')
                    })
                })
            },
            register(){
                userApi.register(this.pojo, this.code).then(response=>{
                    this.$message({
                        message: response.data.message,
                        type: (response.data.flag? 'success' : 'error')
                    })
                })
            },
            login(){
                userApi.login(this.mobile, this.password).then(response=>{
                    if (response.data.flag){
                        Auth.setUser(response.data.data.token, response.data.data.name, response.data.data.avatar);
                        // location.href = '/manager'//用户中心
                        location.href = '/highlight'//用户中心
                    }else {
                        this.$message({
                            message: response.data.message,
                            type:  'error'
                        });
                        this.mobile= "";
                        this.password = "";
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
