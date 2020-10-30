<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="code"
          label="生物编码"
          width="180">
          <template slot-scope="scope">
              <el-input v-model="scope.row.code" placeholder="请输入内容" v-direction="{x: 1, y: scope.$index}"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="oldear"
          label="原耳号"
          width="180">
          <template slot-scope="scope">
              <el-input v-model="scope.row.oldear" placeholder="请输入内容" v-direction="{x: 2, y: scope.$index}"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="area"
          label="场地"
          width="180">
          <template slot-scope="scope">
              <el-input v-model="scope.row.area" placeholder="请输入内容" v-direction="{x: 3, y: scope.$index}"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="newear"
          label="现耳号"
          width="180">
          <template slot-scope="scope">
              <el-input v-model="scope.row.newear" placeholder="请输入内容" v-direction="{x: 4, y: scope.$index}"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="data"
          label="出生重"
          width="180">
          <template slot-scope="scope">
            <el-select v-model="scope.row.name" placeholder="请选择">
              <el-option
                v-for="items in scope.row.data"
                :key="items.id"
                :label="items.name"
                :value="items.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="motherear"
          label="母系普通耳标"
          width="180">
          <template slot-scope="scope">
              <el-input v-model="scope.row.motherear" placeholder="请输入内容" v-direction="{x: 6, y: scope.$index}"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="fatherear"
          label="父系普通耳标"
          width="180">
          <template slot-scope="scope">
              <el-input v-model="scope.row.fatherear" placeholder="请输入内容" v-direction="{x: 7, y: scope.$index}"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="allnum"
          label="同胞数">
          <template slot-scope="scope">
              <el-input v-model="scope.row.allnum" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="grace"
          label="生物等级">
          <template slot-scope="scope">
              <el-input v-model="scope.row.grace" placeholder="请输入内容" v-direction="{x: 9, y: scope.$index}"></el-input>
          </template>
        </el-table-column>
      </el-table>

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
      tableData: [{
        code: '001',
        date: '2016-05-04',
        oldear: '王小虎1',
        area: '上海市普陀区金沙江路 1519 弄',
        newear: '王小龙6',
        name: '',
        data: [{
          id: 1,
          name: '小毛'
        }, {
          id: 5,
          name: 'huazi'
        }],
        motherear: 'm002341',
        fatherear: 'f001',
        allnum: 8,
        grace: 6
      }, {
        code: '002',
        date: '2016-05-06',
        oldear: '王小虎2',
        area: '上海市普陀区金沙江路 1520 弄',
        newear: '王小龙7',
        name: '',
        data: [{
          id: 2,
          name: '小李'
        }],
        motherear: 'm001',
        fatherear: 'f02301',
        allnum: 134,
        grace: 61
      }, {
        code: '003',
        date: '2016-05-08',
        oldear: '王小虎3',
        area: '上海市普陀区金沙江路 1521 弄',
        newear: '王小龙8',
        name: '0',
        data: [{
          id: 3,
          name: '小冲'
        }],
        motherear: 'm02201',
        fatherear: 'f02301',
        allnum: 2,
        grace: 62
      }, {
        code: '004',
        date: '2016-05-10',
        oldear: '王小虎4',
        area: '上海市普陀区金沙江路 1522 弄',
        newear: '王小龙9',
        name: '',
        data: [{
          id: 4,
          name: '小点'
        }],
        motherear: 'm01101',
        fatherear: 'f0401',
        allnum: 82,
        grace: 61
      }],
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
    const direction = this.$getDirection()
    direction.on('keyup', function(e, val) {
      console.log(val)
      if (e.keyCode === 39) {
        direction.next()
      }
      if (e.keyCode === 37) {
        direction.previous()
      }
      if (e.keyCode === 38) {
        direction.previousLine()
      }
      if (e.keyCode === 40) {
        direction.nextLine()
      }
    })
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
