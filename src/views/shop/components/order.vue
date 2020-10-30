<template>
  <div class="order">
    <div class="search-list" style="margin-bottom: 10px">

      <div>
        <span class="search-title">任务ID：</span>
        <el-input v-model="query.taskId" size="mini" style="width: 80px;margin-right: 18px" />

        <span class="search-title">订单ID：</span>
        <el-input v-model="query.id" size="mini" style="width: 80px;margin-right: 18px" />

        <span class="search-title">接单账户：</span>
        <el-input v-model="query.accountNum" size="mini" style="width: 80px;margin-right: 18px" />

        <div style="position:relative;display:inline-block;">
          <span class="search-title">任务类型：</span>
          <img
            v-if="query.taskType"
            style="width: 14px; height: 14px;position:absolute;top:-7px;right:-6px;"
            :src="require('@/assets/images/shibai.png')"
            fit="fill"
            @click="taskTypeClick"
          >
          <el-select v-model="query.taskType" placeholder="请选择" size="mini" style="width: 80px;margin-right: 18px">
            <el-option
              v-for="item in taskTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div style="position:relative;display:inline-block;">
          <span class="search-title">订单状态：</span>
          <img
            v-if="query.status"
            style="width: 14px; height: 14px;position:absolute;top:-7px;right:-12px;"
            :src="require('@/assets/images/shibai.png')"
            fit="fill"
            @click="statusClick"
          >
          <el-select v-model="query.status" placeholder="请选择" size="mini" style="width: 80px">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

      </div>

      <el-row style="margin-top: 20px;margin-bottom: 10px;">
        <el-col :span="6" style="position:relative;">
          <span class="search-title">店铺名称：</span>
          <img
            v-if="query.storeName"
            style="width: 14px; height: 14px;position:absolute;top:-7px;right:22px;"
            :src="require('@/assets/images/shibai.png')"
            fit="fill"
            @click="storeNameClick"
          >
          <el-select v-model="query.storeName" placeholder="请选择" size="mini" style="width: 120px;">
            <el-option
              v-for="item in tableDataList"
              :key="item.id"
              :label="item.storeName"
              :value="item.storeName"
            />
          </el-select>

          <!-- <el-input v-model="query.storeName" size="mini" style="width: 120px;" /> -->
        </el-col>
        <el-col :span="7">
          <span class="search-title">订单编号：</span>
          <el-input v-model="query.thirdOrderNo" size="mini" style="width: 130px;" />
        </el-col>
        <el-col :span="8">
          <span class="search-title">付款时间：</span>
          <el-date-picker
            v-model="timeRange"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 180px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </el-col>

        <!-- <el-col :span="3">
          <el-button size="mini" class="btn-theme" @click="searchdatas">搜索</el-button>

        </el-col>
      </el-row>
      <el-button size="mini" class="btn-theme" @click="dataExport">导出</el-button>
      <el-button size="mini" type="success" @click="handleAllYes">批量确认</el-button> -->
      <!-- <el-button size="mini" type="danger" @click="restSearch">撤销</el-button> -->
      <!-- <el-col :span="3">
          <el-button size="mini" class="btn-theme" @click="searchdatas">搜索</el-button>

        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="search-title">发布时间：</span>
          <el-date-picker
            v-model="timeRange1"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 180px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </el-col>
        <el-col :span="2">
          <el-button size="mini" class="btn-theme" @click="searchdatas">搜索</el-button>

        </el-col>
        <el-col :span="2">
          <el-button size="mini" class="btn-theme" @click="dataExport">导出</el-button>

        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="success" @click="handleAllYes">批量确认</el-button>

        </el-col>
        <el-col :span="4">
          <el-button size="mini" class="btn-theme" style="margin-left:20px;" @click="handlerouter">订单列表详情</el-button>

        </el-col>
        <el-col :span="2">
          <el-button v-if="button1" size="mini" class="btn-theme" style="margin-left:0px;" @click="orderback">返回</el-button>

        </el-col>
      </el-row>
      <!-- <el-button size="mini" type="danger" @click="restSearch">撤销</el-button> -->
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      class="table-new"
      style="width: 100%"
      border
      :row-class-name="tableColor"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="40"
      />
      <el-table-column label="任务ID" width="50">
        <template slot-scope="{row}">
          <span>{{ row.taskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" width="60">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" width="50">
        <template slot-scope="{row}">
          <el-tooltip :content="row.storeName" placement="left-start" effect="light">
            <span
              class="copyLink"
              :data-clipboard-text="row.storeName"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              @dblclick="copy"
            >{{ row.storeName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="50">
        <template slot-scope="{row}">
          <el-tooltip :content="row.goodsName" placement="left-start" effect="light">
            <span
              class="copyLink"
              :data-clipboard-text="row.goodsName"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              @dblclick="copy"
            >{{ row.goodsName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="62">
        <template slot-scope="{row}">
          <el-tooltip slot="reference" content="点击添加该用户黑名单" placement="left-start">
            <span
              @click="rowUserId(row.userId)"
              v-text="(row.confirmAcceptState === 1) ? row.userId : ((row.confirmAcceptState === 2)?'用户待确认':'')"
            />
            <!-- <span
              slot="reference"
              @click="rowUserId(row.userId)"
              v-text="(row.confirmAcceptState === 1) ? row.userId : ((row.confirmAcceptState === 2)?'用户待确认':'')"
            >{{ row.userId }}</span> -->
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="接单账户" width="70">
        <template slot-scope="{row}">
          <span v-text="(row.confirmAcceptState === 1) ? row.accountNum : ((row.confirmAcceptState === 2)?'用户待确认':'')" />
        </template>
      </el-table-column>
      <el-table-column label="关键词" width="50">
        <template slot-scope="{row}">
          <el-tooltip :content="row.keyword" placement="left-start" effect="light">
            <span
              class="copyLink"
              :data-clipboard-text="row.keyword"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              @dblclick="copy"
            >{{ row.keyword }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" width="86">
        <template slot-scope="{row}">
          <el-input placeholder="请输入内容" v-direction="{x: 3, y: row.id}"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="50">
        <template slot-scope="{row}">
          <el-input placeholder="请输入内容" v-direction="{x: 3, y: row.id}"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="支付佣金" width="50">
        <template slot-scope="{row}">
          <el-input placeholder="请输入内容" v-direction="{x: 3, y: row.id}"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商家支付" width="50">
        <template slot-scope="{row}">
          <el-input placeholder="请输入内容" v-direction="{x: 3, y: row.id}"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="用户实付" width="50">
        <template slot-scope="{row}">
          <span>{{ row.userPayAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="返款金额" width="50">
        <template slot-scope="{row}">
          <span>{{ row.refundsAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接单时间" width="90">
        <template slot-scope="{row}">
          <span>{{ row.acceptTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款时间" width="90">
        <template slot-scope="{row}">
          <span>{{ row.operationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="{row}">
          <el-button v-if="row.status !== 1" type="text" :disabled="(row.status === 4 || row.status === 6)? false : true" @click="handleYes(row.id)">确认</el-button>
          <el-button v-if="row.status !== 1" type="text" :disabled="(row.status !== 1 && row.status !== 2)? false : true" @click="handleDetail(row)">详情</el-button>
          <el-button v-if="row.status !== 1" type="text" :disabled="(row.status === 4) ? false : true" @click="handleDialog(2,row.id)">改价</el-button>
          <el-button
            v-if="row.status !== 1 && row.storeTypeId === 1 && row.confirmAcceptState === 1"
            type="text"
            :disabled="(row.status === 3) ? false : true"
            @click="handleHr(row.id)"
          >换人
          </el-button>
          <el-button v-if="row.status === 1 || row.status === 2" type="text" @click="handledele(row.id)">撤销</el-button>
        </template>

      </el-table-column>
    </el-table>
    <div class="pagination">
      <span class="total">共{{ pagetotal }}页 &nbsp;{{ totalall }}条</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ query.pageNum }}&nbsp;/&nbsp;{{ pagetotal?pagetotal:1 }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <el-input v-model="pageIn" class="ipt" type="text" />
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>

    <el-dialog :title="title[titleIndex]" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <!--<el-form-item v-if="titleIndex===0">-->
        <!--<span>请选择换人理由：</span>-->
        <!--<el-select v-model="value2" placeholder="请选择" size="mini" style="width: 150px">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item v-if="titleIndex===1">-->
        <!--<span>请选择拉黑原因：</span>-->
        <!--<el-select v-model="value2" placeholder="请选择" size="mini" style="width: 150px">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item v-if="titleIndex===2">
          <span>请输入正确的返款金额：</span>
          <el-input v-model="form.refundsAmount" size="mini" style="width: 150px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="mini" style="color: #6666FF" @click="dialogFormVisible = false">取消退出</el-button>
        <el-button class="btn-theme" size="mini" @click="handleChangePrice">确认提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="titleUserId"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div>
        <span>*拉黑原因:</span>
        <el-select v-model="reason" size="mini">
          <el-option
            label="淘宝客"
            value="1"
          />
          <el-option
            label="评价问题"
            value="2"
          />
          <el-option
            label="京挑客"
            value="3"
          />
          <el-option
            label="农村淘宝"
            value="4"
          />
          <el-option
            label="号不安全"
            value="5"
          />
          <el-option
            label="乱写评价"
            value="6"
          />
          <el-option
            label="恶意退款"
            value="7"
          />
          <el-option
            label="其他"
            value="8"
          />
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisibleTure">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>

import { orderList, orderConfirmOrder, orderSubstitution, orderUpdateRefundsAmount, getDetail, getStoreList, revoke, batchConfirmOrder } from '@/api/shop'
import { AddBlack } from '@/api/shop2'
import Clipboard from 'clipboard'

export default {
  name: 'Order',
  data() {
    return {
      query: {
        endTime: null,
        startTime: null,
        status: null,
        id: null,
        storeName: null,
        taskId: null,
        taskType: null,
        thirdOrderNo: null,
        accountNum: null,
        pageNum: 1,
        pageSize: 10
      },
      button1: false,
      locahref: '',
      totalall: null,
      confirmAcceptState: null,
      timeRange: [],
      timeRange1: [],
      title: ['换人', '拉黑用户', '改价'],
      titleIndex: 0,
      statusList: [{
        value: 1,
        label: '待发布'
      }, {
        value: 2,
        label: '待接单 '
      }, {
        value: 3,
        label: '待操作 '
      }, {
        value: 4,
        label: '待返款'
      }, {
        value: 5,
        label: '待评价 '
      }, {
        value: 6,
        label: '待确认'
      }, {
        value: 7,
        label: '已完成'
      }, {
        value: 8,
        label: '已撤销'
      }],
      taskTypeList: [{
        value: 1,
        label: '浏览'
      }, {
        value: 2,
        label: '垫付'
      }],
      AddBlackDatas: null,
      reason: null,
      labelValue: [], // 批量确认
      multipleSelection: [], // 批量确认
      titleUserId: '',
      tableDataList: [], // 店铺列表
      dialogFormVisible: false,
      centerDialogVisible: false,
      visible: false,
      form: {
        refundsAmount: null,
        id: null
      },
      tableData: [],
      pagetotal: 1,
      pageIn: null
    }
  },
  computed: {
    orderData: {
      get() {
        return this.$store.getters.orderData
      },
      set(val) {
        this.$store.commit('SET_ORDERDATA', val)
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    timeChange(val) {
      if (val === null) {
        this.query.startTime = null
        this.query.endTime = null
      }
    },
    timeChange1(val) {
      if (val === null) {
        this.query.startTime = null
        this.query.endTime = null
      }
    },
    init() {
      this.locahref = window.location.href
      if (this.locahref.includes('pageNum')) {
        this.button1 = true
      }
      var localData = sessionStorage.getItem('param')
      // var localData = localStorage.getItem('param')
      // var localData1 = localStorage.getItem('timeRange')
      var goodsdatas = {}
      goodsdatas = this.$route.query
      if (goodsdatas.type === '任务管理') {
        var statusData = null
        if (goodsdatas.data.waitReleaseNum > 0) {
          statusData = 1
        } else if (goodsdatas.data.waitAcceptNum > 0) {
          statusData = 2
        } else if (goodsdatas.data.waitOperationNumb > 0) {
          statusData = 3
        } else if (goodsdatas.data.waitRefundsNum > 0) {
          statusData = 4
        } else if (goodsdatas.data.waitCommentNum > 0) {
          statusData = 5
        } else if (goodsdatas.data.waitConfirmNum > 0) {
          statusData = 6
        } else if (goodsdatas.data.alreadyCompleteNum > 0) {
          statusData = 7
        } else if (goodsdatas.data.alreadyRevokeNum > 0) {
          statusData = 8
        }
        this.query = {
          taskId: goodsdatas.data.id,
          status: statusData,
          pageNum: this.query.pageNum,
          pageSize: this.query.pageSize
        }
      } else {
        if (localData) {
          localData = JSON.parse(localData)
          this.query.taskId = localData.taskId
          this.query.id = localData.id
          this.query.accountNum = localData.accountNum
          this.query.taskType = localData.taskType
          this.query.status = localData.status
          this.query.storeName = localData.storeName
          this.query.thirdOrderNo = localData.thirdOrderNo
          if (localData.startTime || localData.releaseStartTime) {
            this.timeRange = [localData.startTime, localData.endTime]
            this.timeRange1 = [localData.releaseStartTime, localData.releaseEndTime]
          }
          localData.pageNum = this.query.pageNum
          localData.pageSize = this.query.pageSize
          this.query = localData
        }
      }
      orderList(this.query).then(response => {
        this.tableData = response.data.rows
        this.pagetotal = Math.ceil(response.data.total / this.query.pageSize)
        this.totalall = response.data.total
      })
      var pagesdata = { pageNum: 1, pageSize: 100, status: 2 }
      getStoreList(pagesdata).then(response => {
        this.tableDataList = response.data.rows
        // this.total = Math.ceil(this.tableData.length / 10)
        this.confirmAcceptState = this.tableDataList[0].confirmAcceptState
        this.total = Math.ceil(response.data.total / this.pageSize)
      })
    },
    // 返回任务页面
    orderback() {
      this.winlocal = window.location.href
      var pageN = this.winlocal.split('pageNum=')
      const param = {
        pageNum: pageN[1]
      }
      this.$router.push({ path: 'task', query: param })
    },
    // 根据状态返回颜色
    tableColor({ row, rowIndex }) {
      if (row.status === 3) {
        return 'tableColor-blue'
      }
    },

    // 用戶ID點擊觸發事件
    rowUserId(id) {
      this.centerDialogVisible = true
      this.titleUserId = '确认将' + id + '添加到黑名单吗？'
      this.AddBlackDatas = id
    },
    // 点击复制
    copy() {
      const clipboard = new Clipboard('.copyLink')
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        clipboard.destroy()
      })
    },
    // 點擊關閉
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 分页
    handleChangePage(type) {
      if (type) {
        if (this.query.pageNum < this.pagetotal) {
          this.query.pageNum++
          this.init()
        }
      } else {
        if (this.query.pageNum > 1) {
          this.query.pageNum--
          this.init()
        }
      }
    },
    // 跳转
    handlePageIn() {
      if (this.pageIn <= this.pagetotal && this.pageIn > 0) {
        this.query.pageNum = this.pageIn
        this.init()
      }
    },
    stateReturn(status) {
      var data
      this.statusList.map(item => {
        if (item.value === status) {
          data = item.label
        }
      })
      return data
    },
    restSearch() {
      this.query = {
        endTime: null,
        startTime: null,
        status: null,
        id: null,
        storeId: null,
        taskId: null,
        taskType: null,
        thirdOrderNo: null
      }
      this.timeRange = []
    },
    // 跳转到详情页面
    handlerouter() {
      this.$router.push({ path: '/taskactivity/seeorderlist' })
    },
    // 拉黑
    centerDialogVisibleTure() {
      var blackData = {
        reason: this.reason,
        userId: this.AddBlackDatas
      }
      AddBlack(blackData).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
      this.centerDialogVisible = false
    },
    // 点击删除店铺搜索内容
    storeNameClick() {
      this.query.storeName = ''
    },
    // 点击删除店铺搜索内容
    taskTypeClick() {
      this.query.taskType = ''
    },
    // 点击删除店铺搜索内容
    statusClick() {
      this.query.status = ''
    },
    // 搜索
    searchdatas() {
      var listData = {}
      if (this.timeRange || this.timeRange1) {
        listData = {
          taskId: this.query.taskId,
          id: this.query.id,
          accountNum: this.query.accountNum,
          taskType: this.query.taskType,
          status: this.query.status,
          storeName: this.query.storeName,
          thirdOrderNo: this.query.thirdOrderNo,
          startTime: this.timeRange ? this.timeRange[0] : '',
          endTime: this.timeRange ? this.timeRange[1] : '',
          releaseStartTime: this.timeRange1 ? this.timeRange1[0] : '',
          releaseEndTime: this.timeRange1 ? this.timeRange1[1] : ''
        }
      } else {
        listData = {
          taskId: this.query.taskId,
          id: this.query.id,
          accountNum: this.query.accountNum,
          taskType: this.query.taskType,
          status: this.query.status,
          storeName: this.query.storeName,
          thirdOrderNo: this.query.thirdOrderNo
        }
      }
      // 保存搜索数据，做记忆功能
      var Smith = JSON.stringify(listData)

      // localStorage.setItem('param', Smith)
      sessionStorage.setItem('param', Smith)
      orderList(listData).then(response => {
        this.tableData = response.data.rows
        this.pagetotal = Math.ceil(response.data.total / this.query.pageSize)
      })
    },
    // 导出
    dataExport() {
      if (this.tableData.length === 0) {
        this.$message({
          message: '请勾选导出数据',
          type: 'error'
        })
      }
      if (this.multipleSelection.length > 0) {
        this.tableData = this.multipleSelection
      }
      for (var l = 0; l < this.tableData.length; l++) {
        if (this.tableData[l].status === 1) {
          this.tableData[l].status = '待发布'
        } else if (this.tableData[l].status === 2) {
          this.tableData[l].status = '待接单'
        } else if (this.tableData[l].status === 3) {
          this.tableData[l].status = '待操作'
        } else if (this.tableData[l].status === 4) {
          this.tableData[l].status = '待返款'
        } else if (this.tableData[l].status === 5) {
          this.tableData[l].status = '待评价'
        } else if (this.tableData[l].status === 6) {
          this.tableData[l].status = '待确认'
        } else if (this.tableData[l].status === 7) {
          this.tableData[l].status = '已完成'
        } else if (this.tableData[l].status === 8) {
          this.tableData[l].status = '已撤销'
        }
      }
      // excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../../../vendor/Export2Excel')
        const tHeader = [
          // '序号',
          '任务ID',
          '订单ID',
          '店铺名称',
          '商品名称',
          '用户ID',
          '接单账户',
          '关键词',
          '订单编号',
          '订单状态',
          '支付佣金',
          '商家支付',
          '用户实付',
          '返款金额',
          '接单时间',
          '付款时间',
          '订单编号']
        const filterVal = [
          // 'index',
          'taskId',
          'id',
          'storeName',
          'goodsName',
          'userId',
          'accountNum',
          'keyword',
          'thirdOrderNo',
          'status',
          'realPayCommission',
          'principalAmount',
          'userPayAmount',
          'refundsAmount',
          'acceptTime',
          'operationTime',
          'thirdOrderNo']
        var list = this.tableData

        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 确认
    handleYes(id) {
      orderConfirmOrder({ id: id }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '返款完成！',
            type: 'success'
          })
          this.searchdatas()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
      // this.init()
    },
    // 批量确认
    handleAllYes() {
      var data = this.labelValue.toString()
      batchConfirmOrder({ ids: data }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '返款完成！',
            type: 'success'
          })
          this.init()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    // 批量确认 收集值
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.labelValue = []
      for (var i = 0; i < val.length; i++) {
        this.labelValue.push(val[i].id)
      }
    },
    // 撤销
    handledele(id) {
      revoke({ id: id }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '撤销成功！',
            type: 'success'
          })
        }
      })
    },
    handleHr(id) {
      orderSubstitution({ id: id }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '换人成功！',
            type: 'success'
          })
          this.init()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    handleChangePrice() {
      orderUpdateRefundsAmount(this.form).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '改价成功！',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.init()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    handleDialog(val, id) {
      this.titleIndex = val
      this.form.id = id
      this.dialogFormVisible = true
    },
    // 详情
    handleDetail(row) {
      this.$emit('detail', '1')
      // 订单状态 1-待发布 2-待接单 3-待操作 4-待返款 5-待评价 6-待确认 7-已完成 8-已撤销
      if ((row.status !== 1) && (row.status !== 2)) {
        var data = { id: row.id }
        getDetail(data).then(response => {
          if (response.code === 0) {
            this.$store.commit('SET_ORDERDATA', response.data)
            // 更换路由传参为使用vuex来存储数据
            // const param = {
            //   data: response.data
            // }
            // this.$router.push({ path: '/admin/shop/orderDetail/' + row.id, query: param })
            const param = {
              taskId: this.query.taskId,
              id: this.query.id,
              accountNum: this.query.accountNum,
              taskType: this.query.taskType,
              status: this.query.status,
              storeName: this.query.storeName,
              thirdOrderNo: this.query.thirdOrderNo,
              startTime: this.timeRange[0],
              endTime: this.timeRange[1]
            }
            // var Smith = JSON.stringify(param)
            // localStorage.setItem('param', Smith)
            this.$router.replace({ path: '/admin/shop/orderDetail/' + row.id, query: param })
            // this.$router.push({ path: '/admin/shop/orderDetail/' + row.id })
            this.dialogFormVisible = false
          } else {
            this.$message({
              message: response.msg,
              type: 'warning'
            })
          }
        })
      }
    }

  }
}
</script>

<style scoped>
    .search-title{color:#97A8BE;font-size: 14px}
    .table-new{font-size: 12px !important;}
    .table-new >>>th{color: white;background-color: #6666FF;padding: 5px 1px;text-align: center;white-space: nowrap;}
    .table-new >>>td{color: #97A8BE;text-align: center;padding: 0}
    .el-table >>>.tableColor-blue{background-color: #eee !important;}
    .order>>>.el-dialog__body{padding: 0 30px}
</style>
