<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商家中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: levelList[0].path }">{{ levelList[0].meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="side">
          <div class="sideHead">
            <div class="avatarWrap" src="circleUrl">
              <img src="../../assets/images/homeAvatar.jpg" class="avatar">
            </div>
            <span class="idNo">{{ userDataId }}</span>
          </div>
          <div class="sideNav">
            <router-link
              :to="{ path:'/admin/shop/notice'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/notice') > -1 || nowPath.indexOf('/admin/shop/noticeDetail') > -1}]"
              @click.native="jump('/admin/shop/notice')"
            >
              <svg-icon class="icon" icon-class="gonggao" />
              <span class="wold">公告中心</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/activity'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/activity') > -1}]"
              @click.native="jump('/admin/shop/activity')"
            >
              <svg-icon class="icon" icon-class="zhifeiji" />
              <span class="wold">发布任务</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/store'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/store') > -1}]"
              @click.native="jump('/admin/shop/store')"
            >
              <svg-icon class="icon" icon-class="dianpu" />
              <span class="wold">店铺管理</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/recharge'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/recharge') > -1}]"
              @click.native="jump('/admin/shop/recharge')"
            >
              <svg-icon class="icon" icon-class="chongzhi" />
              <span class="wold">账户充值</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/funds'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/funds') > -1}]"
              @click.native="jump('/admin/shop/funds')"
            >
              <svg-icon class="icon" icon-class="zijinmingxi" />
              <span class="wold">资金明细</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/task'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/task') > -1}]"
              @click.native="jump('/admin/shop/task')"
            >
              <svg-icon class="icon" icon-class="renwuguanli" />
              <span class="wold">任务管理</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/order'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/order') > -1}]"
              @click.native="jump('/admin/shop/order')"
            >
              <svg-icon class="icon" icon-class="dingdanguanli" />
              <span class="wold">订单管理</span>
            </router-link>
            <router-link
              v-if="(expressFlag === 1) ? ((auxiliaryFlag) ? true : false) : false"
              :to="{ path:'/admin/shop/parcel'}"
              :class="['item',{'cur':nowPath==='/admin/shop/parcel'}]"
              @click.native="jump('/admin/shop/parcel')"
            >
              <svg-icon class="icon" icon-class="kuaidi" />
              <span class="wold">快递代发</span>
            </router-link>
            <router-link
              v-if="(expressFlag === 1) ? ((auxiliaryFlag) ? true : false) : false"
              :to="{ path:'/admin/shop/parcelMng'}"
              :class="['item',{'cur':nowPath==='/admin/shop/parcelMng'}]"
              @click.native="jump('/admin/shop/parcelMng')"
            >
              <svg-icon class="icon" icon-class="daifa" />
              <span class="wold">代发管理</span>
            </router-link>
            <router-link
              v-if="(expressFlag === 1) ? ((auxiliaryFlag) ? true : false) : false"
              :to="{ path:'/admin/shop/single'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/single') > -1}]"
              @click.native="jump('/admin/shop/single')"
            >
              <svg-icon class="icon" icon-class="chongzhi" />
              <span class="wold">单号管理</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/appeal'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/appeal') > -1}]"
              @click.native="jump('/admin/shop/appeal')"
            >
              <svg-icon class="icon" icon-class="gantanhao" />
              <span class="wold">申诉中心</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/extend'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/extend') > -1}]"
              @click.native="jump('/admin/shop/extend')"
            >
              <svg-icon class="icon" icon-class="qrcode" />
              <span class="wold">我的推广</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/blacklist'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/blacklist') > -1}]"
              @click.native="jump('/admin/shop/blacklist')"
            >
              <svg-icon class="icon" icon-class="heimingdan" />
              <span class="wold">黑&ensp;名&ensp;单</span>
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/feedback'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/feedback') > -1}]"
              @click.native="jump('/admin/shop/feedback')"
            >
              <svg-icon class="icon" icon-class="yijianfankui" />
              <span class="wold">意见反馈</span>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div style="height:40px;" />
        <div class="page-load">
          <keep-alive>
            <router-view :key="key" />
          </keep-alive>
          <!--<notice v-if="activeTab === 'notice'" @detail="handleNoticDetail"></notice>-->
          <!--<notice-detail v-if="activeTab === 'noticeDetail'" :noticeId="noticeId"></notice-detail>-->
          <!--<activity v-if="activeTab === 'activity'"></activity>-->
          <!--<store v-if="activeTab === 'store'"></store>-->
          <!--<deposit v-if="activeTab === 'recharge'"></deposit>-->
          <!--<funds v-if="activeTab === 'funds'"></funds>-->
          <!--<task v-if="activeTab === 'task'" @detail="handleTaskDetail"></task>-->
          <!--<task-detail v-if="activeTab === 'taskDetail'" ></task-detail>-->
          <!--<order v-if="activeTab === 'order'" @detail="handleOrderDetail"></order>-->
          <!--<order-detail v-if="activeTab === 'orderDetail'" ></order-detail>-->
          <!--<parcel v-if="activeTab === 'parcel'" ></parcel>-->
          <!--<parcel-mng v-if="activeTab === 'parcelMng'" ></parcel-mng>-->
          <!--<single v-if="activeTab === 'single'" ></single>-->
          <!--<appeal v-if="activeTab === 'appeal'" ></appeal>-->
          <!--<extend v-if="activeTab === 'extend'" ></extend>-->
          <!--<blacklist v-if="activeTab === 'blacklist'" ></blacklist>-->
          <!--<feedback v-if="activeTab === 'feedback'" ></feedback>-->
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
// const url1 = require('@/assets/images/homeAvatar.jpg')
// const url2 = require('@/assets/images/woodpecker.jpg')
import { getInfo, getWebsiteInfo } from '@/api/user'

export default {
  name: 'Shop',
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      activeTab: 'notice',
      noticeId: '',
      nowPath: '',
      auxiliaryFlag: '',
      viewTab: [],
      userDataId: '',
      userDataImg: '',
      imageUrl: '',
      expressFlag: null,
      levelList: null
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { path } = to
    if (this.viewTab.some(v => v.path === path)) {
      next()
    } else if (this.viewTab.length >= 8) {
      next()
      // this.$message({
      //   message: '页签不超过8个',
      //   type: 'warning'
      // })
    } else {
      this.addViewTags(to)
      next()
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
    this.viewTab = this.$store.getters.view
    this.auxiliaryFlag = this.$store.getters.auxiliaryFlag
    if (!this.viewTab.some(v => v.path === this.nowPath)) {
      this.addViewTags(this.$route)
    }
  },
  mounted() {
    this.userId()
  },
  methods: {
    init() {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)

      // window.onbeforeunload = function() {
      //   return '您确定要离开haorooms博客吗？'
      // }
      // getWebsiteInfo().then(response => {
      //   if (response.data.websiteName === '啄木鸟') {
      //     this.imageUrl = url2
      //   } else {
      //     this.imageUrl = url1
      //   }
      // })
    },
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // },
    // beforeAvatarUpload(file) {

    // },
    // // 路由跳转
    jump(url) {
      // 判断是否是当前路由
      console.log('跳转')
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
    // 获取动态头像 ID
    userId() {
      var myCookie = document.cookie
      var arr = myCookie.split('=')
      for (var i = 0; i <= arr.length; i++) {
        if (arr[i] === 'Admin-Token') {
          var num = arr[i + 1]
        }
      }
      var token = 'token=' + num
      getInfo(token).then(response => {
        this.userDataId = 'ID:' + response.data.id
        // this.imageUrl = response.data.avatar
        this.expressFlag = response.data.expressFlag
        // if (this.imageUrl === null) {
        //   this.imageUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        // }
      })
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags(to) {
      const { path } = to
      if (this.viewTab.some(v => v.path === path)) return

      if (path) {
        const view = {
          path: to.path,
          title: to.meta.title
        }
        this.$store.dispatch('addView', view)
      }
      // return false
    },
    delViewTags(url) {
      localStorage.clear()
      const { path } = url
      if (path) {
        const view = {
          path: url.path,
          title: url.title
        }
        this.$store.dispatch('delView', view).then(() => {
          if (this.isActive(view)) {
            this.$router.push({ path: '/admin/shop/notice' })
            // this.$router.go(-1)
          }
        })
      }
      // return false
    },
    handleMenu(menu, name) {
      if (this.viewTab.length >= 8) {
        if (this.viewTab.some(v => v.key === menu)) {
          this.activeTab = menu
        } else {
          this.$message({
            message: '页签不超过8个',
            type: 'warning'
          })
        }
      } else {
        this.activeTab = menu
        if (menu !== 'notice') {
          this.addView(menu, name)
        }
      }
    },
    handleTab(menu) {
      this.activeTab = menu
      // console.log('handleTab的this.activeTab数据', this.activeTab)
    },
    addView(menu, name) {
      if (this.viewTab.some(v => v.key === menu)) return
      if (this.viewTab.length >= 8) {
        this.$message({
          message: '页签不超过8个',
          type: 'warning'
        })
        return
      }
      this.viewTab.push({
        'name': name,
        'key': menu
      })
      // this.viewTab = this.viewTab.slice(-3)
    },
    delView(index, item) {
      if (this.activeTab === item.key) {
        this.viewTab.splice(index, 1)
        // 设置页面最多多少标签
        // this.viewTab = this.viewTab.slice(-3)
        const change = index - 1
        if (change >= 0) {
          this.activeTab = this.viewTab[change].key
        } else {
          this.activeTab = 'notice'
        }
      } else {
        this.viewTab.splice(index, 1)
        // this.viewTab = this.viewTab.slice(-8)
      }
    },
    handleNoticDetail(val) {
      this.addView('noticeDetail', '公告详情')
      this.activeTab = 'noticeDetail'
      this.noticeId = val
    },
    handleTaskDetail(val) {
      this.addView('taskDetail', '任务详情')
      this.activeTab = 'taskDetail'
    },
    handleOrderDetail(val) {
      this.addView('orderDetail', '订单详情')
      this.activeTab = 'orderDetail'
    }
  }
}
</script>

<style scoped>
    .icon {
        font-size: 19px;
        color: #E7E7E7;
    }

    .icon-close {
        color: #6666FF;
    }

    .page-load {
        position: relative;
        /* min-height: 683px; */
        /* min-height: 732px; */
        min-height: 1098px;
        padding: 40px;
        font-size: 16px;
        background-color: white;
        box-sizing: border-box;
    }

</style>
