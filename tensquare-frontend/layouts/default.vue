<template>
  <div>
    <header>
      <div class="wrapper">
      <div class="sui-navbar">
        <div class="navbar-inner">
          <a href="/" class="sui-brand"><img src="~/assets/img/logo.png" style="margin-top: 5px" width="165px" height="80px" alt="社交"/></a>
          <ul class="sui-nav">
            <nuxt-link tag="li" to="/highlight" active-class="active"><a>头条</a></nuxt-link>
            <nuxt-link tag="li" to="/qa" active-class="active"><a>问答</a></nuxt-link>
            <nuxt-link tag="li" to="/gathering" active-class="active"><a>活动</a></nuxt-link>
            <nuxt-link tag="li" to="/spit" active-class="active"><a>吐槽</a></nuxt-link>
            <nuxt-link tag="li" to="/recruit" active-class="active"><a>招聘</a></nuxt-link>
          </ul>
          <form class="sui-form sui-form pull-left">
              <input type="text" placeholder="输入关键词...">
              <span class="btn-search fa fa-search"></span>
          </form>
          <div class="sui-nav pull-right info" v-if="user.name !== undefined">
            <li><a href="/manager" target="_blank" class="notice">{{user.name}}</a></li>
            <li><a @click="logout" class="notice">退出登录</a></li>
            <li><a href="/manager" target="_blank" class="homego"><img :src="user.avatar" alt="用户头像" width="40px" height="40px"></a></li>
          </div>
          <div class="sui-nav pull-right info" v-if="user.name === undefined">
            <nuxt-link to="/login"></nuxt-link>
            <nuxt-link to="/login">请登录</nuxt-link>
          </div>
        </div>
      </div>
      </div>
    </header>
    <nuxt/>
    <footer>
      <div class="footer">
        <div class="wrapper">
          <div class="footer-bottom">
            <div class="link">
              <dl>
                <dt>小组成员</dt>
                <dd>魏&nbsp;&nbsp;&nbsp;&nbsp;楠</dd>
                <dd>蔡震栋</dd>
                <dd>方&nbsp;&nbsp;&nbsp;&nbsp;沛</dd>
                <dd>王舸飞</dd>
              </dl>
              <dl>
                <dt>专业项目</dt>
              </dl>
              <dl>
                <dt>联系我们</dt>
                <dd>暂不提供</dd>
              </dl>
              <dl>
                <dt>关注我们</dt>
                <dd>不给方式</dd>
              </dl>

              <div class="xuke">
                <h3>内容许可</h3>
                <p>无特殊要求</p>
              </div>
            </div>
            <p class="Copyright">Software engineering of Tongji University</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import  '~/assets/plugins/normalize-css/normalize.css'
  import  '~/assets/plugins/yui/cssgrids-min.css'
  import  '~/assets/plugins/sui/sui.min.css'
  import '~/assets/plugins/sui/sui-append.min.css'
  import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
  import '~/assets/css/widget-base.css'
  import '~/assets/css/widget-head-foot.css'
  import Auth from "@/utils/auth";
    export default {
        data(){
          return {
              user: {}
          }
        },
        created() {
              this.user = Auth.getUser();
        },
        methods:{
            logout(){
                Auth.removeUser();
                location.href='/';
            }
        }
    }
</script>


