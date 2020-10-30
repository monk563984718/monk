<template>
  <div>



  </div>
</template>

<script>
// const url = require('@/assets/web/logo.png')
import chat from '@/components/chat'
import { getInfo, getWebsiteInfo } from '@/api/user'

export default {
  name: 'Admin',
  components: {
    chat
  },
  data() {
    return {
      logoUrl: '',
      nowPath: '',
      banlance: null,
      username: null,
      expressFlag: null,
      markingFlag: null,
      trialFlag: null,
      onlineMallFlag: null,
      auxiliaryFlag: null
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    balance: {
      get() {
        return this.$store.getters.balance
      },
      set(val) {
        this.$store.commit('SET_BALANCE', val)
      }
    },
    logoData: {
      get() {
        return this.$store.getters.logoData
      },
      set(val) {
        this.$store.commit('SET_LOGODATA', val)
      }
    }
  },
  watch: {
    key: function(val) {
      this.nowPath = this.$route.path
    }
  },
  created() {
    this.init()
    this.nowPath = this.$route.path
    this.balance = this.$store.getters.balance
    this.username = this.$store.getters.username
    this.expressFlag = this.$store.getters.expressFlag
  },
  // mounted() {

  // },
  methods: {
    init() {
      var myCookie = document.cookie
      var arr = myCookie.split('=')
      for (var i = 0; i <= arr.length; i++) {
        if (arr[i] === 'Admin-Token') {
          var num = arr[i + 1]
        }
      }
      
      var token = 'token=' + num
      getInfo(token).then(response => {
        this.markingFlag = response.data.markingFlag
        this.trialFlag = response.data.trialFlag
        this.onlineMallFlag = response.data.onlineMallFlag
        this.auxiliaryFlag = response.data.auxiliaryFlag
        console.log('response.data', response.data, this.expressFlag)
        // this.userDataId = 'ID:' + response.data.id
        // this.imageUrl = response.data.avatar
        // if (this.imageUrl === null) {
        //   this.imageUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        // }
      })
      getWebsiteInfo().then(response => {
        if (response.code === 0) {
          this.logoUrl = response.data.homeLogoUrl
          this.$store.commit('SET_LOGODATA', response.data)
        }
      })
    },
    handleXiaoLu() {
      this.$message({
        message: '正在开发中，敬请期待！',
        type: 'warning',
        showClose: true,
        duration: 3000
      })
    },
    handleguoqing() {
      this.$message({
        message: '国庆期间暂停商家充值！',
        type: 'warning',
        showClose: true,
        duration: 3000
      })
    },
    // // 路由跳转
    jump(url) {
      // 判断是否是当前路由
      if (url === this.$route.path) {
        this.$router.push({
          path: '/blankpage',
          query: url
        })
      } else {
        this.$router.push({
          path: url
        })
      }
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('Logout', this.loginForm).then(() => {
          this.$router.push({ path: '/login' })
        })
      } else if (command === 'password') {
        this.$router.push({ path: '/password' })
      }
    }
  }
}
</script>

<style scoped>
  .shop {
    background-color: rgb(242, 242, 242);
  }

  .head-title {
    width: 1100px;
    margin: auto !important;
    display: flex;
    align-items: center;
    height: 72px;
  }

  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .menu-active {
    color: red;
    padding-bottom: 8px;
    position: relative;
  }

  .menu-active:after {
    content: "";
    display: block;
    width: 35px;
    height: 2px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: red;
  }

  .admin-info {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
  }

  .admin-info .container {
    height: 56px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
