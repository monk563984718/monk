<template>
  <div id="app">
    <router-view />
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var version = this.version // 版本号（每次上线前需要更新下版本号）
      console.log('当前版本号common.js：', version)
      var vvv = '1.3.7'
      console.log('当前版本号app.vue：', vvv)
      if (vvv !== version) {
        this.version = vvv
        location.reload()
      }
    }
  }

}
</script>
<style lang="scss">
  @import url(~@/styles/style.css);
  @import url(~@/styles/shop.css);
</style>
