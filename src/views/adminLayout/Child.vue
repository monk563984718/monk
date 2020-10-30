<template>
  <div>
    <div class="child">
      <div>这是子组件</div>
      <slot></slot>
            <el-tree
              :data="data1"
              node-key="id"
              default-expand-all
              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag">
              <slot :data="data"></slot>
            </el-tree>
    </div>
    <s>111</s>


  </div>
</template>

<script>
// const url = require('@/assets/web/logo.png')
import chat from '@/components/chat'
import { getInfo, getWebsiteInfo } from '@/api/user'

export default {
  name: 'Child',
  data() {
    const generateData = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data1: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
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
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },
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
