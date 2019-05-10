<template>
  <div id="app" :class="env">
    <x-home></x-home>
  </div>
</template>

<style lang="less">
  // 这是网站的框架结构入口，不要在这里写过多业务有关视图代码
  // 业务逻辑应该写在具体的 component 里
  @import url('./style/main.less');
</style>

<script>
  import XHome from './components/Home'
  export default {
    data() {
      const ua = navigator.userAgent.toLowerCase()
      const isWeixin = ua.indexOf('micromessenger') > -1
      return {
        env: {
          'env-weixin': isWeixin
        }
      }
    },

    mounted() {
      // if (process.env.NODE_ENV === 'production') {
      //   window.onbeforeunload = () => '不能刷新'
      // }
      const applicationCache = window.applicationCache
      if (applicationCache) {
        applicationCache.addEventListener('updateready', () => {
          if (applicationCache.status === applicationCache.UPDATEREADY) {
            applicationCache.swapCache()
            const reload = window['conf' + 'irm']('题库已更新，是否立即刷新？')
            window['console']['info']('更新 applicationCache，强刷页面')
            reload && location.reload(true)
          }
        })
      }
    },

    components: {
      XHome
      // XFooter
    }
  }
</script>
