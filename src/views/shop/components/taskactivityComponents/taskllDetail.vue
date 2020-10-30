<template>
  <div>
    <div class="form">
      <div class="step-title">第一步：填写任务信息</div>
      <div class="form-item">
        <span class="form-required">*必填</span>
        <span class="form-label">选择任务类型：</span>
        <div class="form-block radio-list">
          <el-radio-group
            class="item"
            style="margin-left: 14px;padding-top: 10px;"
            fill="red"
            text-color="#6666FF"
          >
            <el-radio :label="1">流量任务</el-radio>
            <el-radio :label="2">收藏任务</el-radio>
            <el-radio :label="3">加购任务</el-radio>
            <el-radio :label="4">微淘直播</el-radio>
            <el-radio :label="5">文章阅读</el-radio>
          </el-radio-group>
          <!-- <el-radio-group
            v-model="form.searchSortWay "
            class="item"
            style="margin-left: 14px;padding-top: 10px;"
            fill="red"
            text-color="#6666FF"
          >
            <el-radio v-for="item in sortList" :label="item.name">{{ item.name }}</el-radio>
          </el-radio-group> -->
        </div>
      </div>
      <div class="form-item">
        <span class="form-required">*必填</span>
        <span class="form-label">选择流量类型：</span>
        <div class="form-block radio-list">
          <el-radio-group
            class="item"
            style="margin-left: 14px;padding-top: 10px;"
            fill="red"
            text-color="#6666FF"
          >
            <el-radio :label="1">App流量</el-radio>
            <el-radio :label="2">宝贝点赞</el-radio>
            <el-radio :label="3">pc流量</el-radio>
            <el-radio :label="4">猜你喜欢</el-radio>
            <el-radio :label="5">每日好店</el-radio>
            <el-radio :label="6">淘口令</el-radio>
            <el-radio :label="7">淘宝客</el-radio>
          </el-radio-group>
          <!-- <el-radio-group
            v-model="form.searchSortWay "
            class="item"
            style="margin-left: 14px;padding-top: 10px;"
            fill="red"
            text-color="#6666FF"
          >
            <el-radio v-for="item in sortList" :label="item.name">{{ item.name }}</el-radio>
          </el-radio-group> -->
        </div>
      </div>
      <div class="form-item">
        <span class="form-required">*必填</span>
        <span class="form-label">商品链接：</span>
        <el-input
          class="w400"
          size="small"
          placeholder="请输入正确的商品网页端网址"
        />
        <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
      </div>
      <div class="form-item">
        <span class="form-required">*必填</span>
        <span class="form-label">商品标题：</span>
        <el-input
          class="w400"
          size="small"
          placeholder="请输入正确的商品全标题"
        />
        <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
      </div>

      <div>
        <div>
          <div class="form-item">
            <span class="form-required">*必填</span>
            <span class="form-label">搜索关键词{{ item }}：</span>
            <el-input v-model="form.taskCommentList[item-1].keyword" size="mini" style="width: 350px" placeholder="关键词必须为标题里面含有的文字，且区分大小写" />
            <!-- <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
            <el-input-number v-model="order1[item-1]" size="mini" :min="1" style="width: 140px" />
            <span class="form-label" style="margin-left: 10px">单<i
              style="color: #20a0ff;margin-left: 1rem"
              class="el-icon-delete"
              @click="delGuanjc(item)"
            /></span> -->
          </div>

          <div class="clock" style="margin-left: 44px;">
            <span style="color:#6666FF;font-weight: bold;font-size: 15px ">24小时细分：</span>
            <ul class="clock-list">
              <li class="item"><span class="sp1">0点</span> <input
                v-model="hour24Data[0]"
                :disabled="!(0 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">1点</span> <input
                v-model="hour24Data[1]"
                :disabled="!(1 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">2点</span> <input
                v-model="hour24Data[2]"
                :disabled="!(2 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">3点</span> <input
                v-model="hour24Data[3]"
                :disabled="!(3 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">4点</span> <input
                v-model="hour24Data[4]"
                :disabled="!(4 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">5点</span> <input
                v-model="hour24Data[5]"
                :disabled="!(5 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">6点</span> <input
                v-model="hour24Data[6]"
                :disabled="!(6 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">7点</span> <input
                v-model="hour24Data[7]"
                :disabled="!(7 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">8点</span> <input
                v-model="hour24Data[8]"
                :disabled="!(8 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">9点</span> <input
                v-model="hour24Data[9]"
                :disabled="!(9 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">10点</span> <input
                v-model="hour24Data[10]"
                :disabled="!(10 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">11点</span> <input
                v-model="hour24Data[11]"
                :disabled="!(11 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">12点</span> <input
                v-model="hour24Data[12]"
                :disabled="!(12 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">13点</span> <input
                v-model="hour24Data[13]"
                :disabled="!(13 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">14点</span> <input
                v-model="hour24Data[14]"
                :disabled="!(14 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">15点</span> <input
                v-model="hour24Data[15]"
                :disabled="!(15 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">16点</span> <input
                v-model="hour24Data[16]"
                :disabled="!(16 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">17点</span> <input
                v-model="hour24Data[17]"
                :disabled="!(17 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">18点</span> <input
                v-model="hour24Data[18]"
                :disabled="!(18 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">19点</span> <input
                v-model="hour24Data[19]"
                :disabled="!(19 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">20点</span> <input
                v-model="hour24Data[20]"
                :disabled="!(20 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">21点</span> <input
                v-model="hour24Data[21]"
                :disabled="!(21 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">22点</span> <input
                v-model="hour24Data[22]"
                :disabled="!(22 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
              <li class="item"><span class="sp1">23点</span> <input
                v-model="hour24Data[23]"
                :disabled="!(23 >= hour24Show)"
                class="sp2"
                type="number"
                @input="changeValue(val)"
              ></li>
            </ul>
          </div>

        </div>
      </div>

    </div>
    <div class="form">
      <div class="step-title">第二步：任务收费详情</div>
      <table class="table" style="margin-top:20px;">
        <!-- <tr>
          <th>收费明细</th>
          <th>数量</th>
          <th>小计</th>
        </tr> -->
        <tr>
          <td>收费明细</td>
          <td>数量</td>
          <td>小计</td>
        </tr>
        <tr>
          <td>收费明细</td>
          <td>数量</td>
          <td>小计</td>
        </tr>
      <!-- <tr v-for="(item, index) in priceDetail.feeList" v-if="item !== null" :key="index">
        <td class="mw50">
          <div class="flexCSB">{{ item.name }}：<span class="value">{{ item.amount }}{{ item.unit }}/单</span></div>
        </td>
        <td>{{ priceDetail.orderNum }}单</td>
        <td>{{ item.amountTotal }}{{ item.unit }}</td>
      </tr>
      <tr class="last">
        <td> 合计</td>
        <td colspan="2"><span>本金：</span> <span class="down">{{ priceDetail.principalAmountTotal }}</span> <span
          class="opp"
        >元</span> +
          <span>佣金：</span> <span class="down">{{ priceDetail.commissionTotal }}</span> <span class="opp">金</span></td>
      </tr> -->
      </table>
    </div>
  </div>
</template>

<script>
import {
  create,
  taskDetail,
  selectYwTaskSortWayList,
  selectYwTaskScreenshotCategoryList,
  selectYwGoodsCategoryList,
  selectYwTaskFeeConfig,
  getPrice
} from '@/api/shop'
import VDistpicker from 'v-distpicker'
import { uploadImage } from '@/utils'

export default {
  name: 'TaskllDetail',
  components: { VDistpicker },
  // props: {
  //   storeType: {
  //     required: true
  //   },
  //   taskType: {
  //     required: true
  //   },
  //   store: {
  //     required: true
  //   }
  // },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          const _now = Date.now()
          return time.getTime() < _now - 8.64e7
        }
      },
      storeType: {
        required: true
      },
      taskType: {
        required: true
      },
      store: {
        required: true
      },
      id: null, // 任务详情信息
      storeTypeName: '',
      taskTypeName: '',
      storeName: '',
      dialogFormVisible: false,
      taskId: null,
      priceDetail: '',
      storeTypeId: 1, // 任务详情信息
      nowDateTime: '',
      province: '',
      city: '',
      imageUrl: '',
      addShop: 1,
      addKeyWord: 1,
      addewm: 1,
      addtkl: 1,
      checkList: [],
      order1: [],
      order2: [],
      order3: [],
      orderAll: 0,
      inputAll: 0, // 总单数
      screenshotDetails: [], // 存放搜索货比的值
      form: {
        taskGoodsList: [{
          name: null,
          content: null,
          url: null,
          img: null,
          showPrice: null,
          realPrice: null,
          payPeopleNum: null,
          mainFlag: 1,
          tbkFlag: 2
        }],
        taskReleaseTimeList: [],
        taskReleaseTime: '',
        interval: null,
        storeTypeId: null,
        storeId: null,
        taskTypeId: null,
        searchSortWay: null,
        searchType: 1,
        searchLocation: null,
        searchMaxPrice: null,
        searchMinPrice: null,
        orderNum: null,
        releaseDate: null,
        orderRemarks: null,
        screenshotDetailIds: [],
        taskAdditionalIncrement: {
          toUp: 2,
          rewardAmount: null,
          weight: null,
          sex: null,
          minAge: null,
          maxAge: null,
          area: [],
          baiTiao: 2,
          alreadyBrowseTask: 2,
          goodsCategory: []
        },
        taskCommentList: [{ keyword: null }],
        remarkImgUrl1: null,
        remarkImgUrl2: null,
        remarkImgUrl3: null
      },
      sortList: [],
      imgList: [],
      age: '',
      area: '',
      isReleaseDate: false,
      hour24Show: 0,
      ewmIndex: 0,
      shopIndex: 0,
      hour24Data: [],
      goodsCategoryList: [],
      cost: {}
    }
  },
  computed: {
    reSetData: {
      get() {
        return this.$store.getters.reSetData
      },
      set(val) {
        this.$store.commit('SET_RESETDATA', val)
      }
    }
  },
  watch: {
    order3: {
      handler: function(val, oldval) {
        console.log('var3', val)
        for (let i = 0; i < val.length; i++) {
          if (!val[i] || val[i] === undefined) {
            this.order3[i] = 0
          }
        }
        var count = 0
        val.map(res => {
          count += Number(res)
        })
        this.orderAll = count
        this.inputAll = count
      },
      deep: true
    },
    order2: {
      handler: function(val, oldval) {
        console.log('var2', val)
        for (let i = 0; i < val.length; i++) {
          if (!val[i] || val[i] === undefined) {
            this.order2[i] = 0
          }
        }
        var count = 0
        val.map(res => {
          count += Number(res)
        })
        this.orderAll = count
        this.inputAll = count
      },
      deep: true
    },
    order1: {
      handler: function(val, oldval) {
        console.log('var1', val)
        for (let i = 0; i < val.length; i++) {
          if (!val[i] || val[i] === undefined) {
            this.order1[i] = 0
          }
        }
        var count = 0
        val.map(res => {
          count += Number(res)
        })
        this.orderAll = count
        this.inputAll = count
      },
      deep: true
    }
  },
  //  mounted:{
  //   formatterDateDescription()
  // },
  created() {
    this.init()
    this.creatData()
    this.form.storeId = this.store
    this.form.storeTypeId = this.storeType
    this.form.taskTypeId = this.taskType
    // qrCodeImgUrl 搜索二维码用的字段名
  },
  mounted() {
    this.showDate()
    this.form.storeId = this.store // 58
    this.form.storeTypeId = this.storeType // 2
    this.form.taskTypeId = this.taskType // 10
  },
  methods: {
    // 改变时间内响应修改单数
    changeValue() {
      var detelike = parseInt(this.hour24Data[23] ? this.hour24Data[23] : 0) +
                    parseInt(this.hour24Data[22] ? this.hour24Data[22] : 0) +
                    parseInt(this.hour24Data[21] ? this.hour24Data[21] : 0) +
                    parseInt(this.hour24Data[20] ? this.hour24Data[20] : 0) +
                    parseInt(this.hour24Data[19] ? this.hour24Data[19] : 0) +
                    parseInt(this.hour24Data[18] ? this.hour24Data[18] : 0) +
                    parseInt(this.hour24Data[17] ? this.hour24Data[17] : 0) +
                    parseInt(this.hour24Data[16] ? this.hour24Data[16] : 0) +
                    parseInt(this.hour24Data[15] ? this.hour24Data[15] : 0) +
                    parseInt(this.hour24Data[14] ? this.hour24Data[14] : 0) +
                    parseInt(this.hour24Data[13] ? this.hour24Data[13] : 0) +
                    parseInt(this.hour24Data[12] ? this.hour24Data[12] : 0) +
                    parseInt(this.hour24Data[11] ? this.hour24Data[11] : 0) +
                    parseInt(this.hour24Data[10] ? this.hour24Data[10] : 0) +
                    parseInt(this.hour24Data[9] ? this.hour24Data[9] : 0) +
                    parseInt(this.hour24Data[8] ? this.hour24Data[8] : 0) +
                    parseInt(this.hour24Data[7] ? this.hour24Data[7] : 0) +
                    parseInt(this.hour24Data[6] ? this.hour24Data[6] : 0) +
                    parseInt(this.hour24Data[5] ? this.hour24Data[5] : 0) +
                    parseInt(this.hour24Data[4] ? this.hour24Data[4] : 0) +
                    parseInt(this.hour24Data[3] ? this.hour24Data[3] : 0) +
                    parseInt(this.hour24Data[2] ? this.hour24Data[2] : 0) +
                    parseInt(this.hour24Data[1] ? this.hour24Data[1] : 0) +
                    parseInt(this.hour24Data[0] ? this.hour24Data[0] : 0)
      console.log('detelike', detelike)
      this.orderAll = detelike
    },
    // 任务发布时间
    showDate() {
      var myDate = new Date()
      var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      var day = myDate.getDate() < 9 ? '0' + (myDate.getDate()) : myDate.getDate()
      var dataToDate = myDate.getFullYear() + '-' + month + '-' + day
      this.form.releaseDate = dataToDate
      this.nowDateTime = dataToDate
      if (this.nowDateTime === dataToDate) {
        this.hour24Show = myDate.getHours() + 1
      } else {
        this.hour24Show = 0
      }
    },
    init() {
      var goodsdatas = {}
      goodsdatas = this.$route.query
      this.id = goodsdatas.id
      this.store = goodsdatas.postData.storeId
      this.storeType = goodsdatas.postData.storeTypeId
      this.taskType = goodsdatas.postData.taskTypeId

      this.form.storeId = this.store
      this.form.storeTypeId = this.storeType
      this.form.taskTypeId = this.taskType
      selectYwTaskSortWayList({ storeTypeId: this.storeType }).then(response => {
        this.sortList = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      selectYwTaskScreenshotCategoryList({ taskTypeId: this.taskType }).then(response => {
        this.imgList = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      selectYwGoodsCategoryList().then(response => {
        this.goodsCategoryList = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      selectYwTaskFeeConfig().then(response => {
        this.cost = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      taskDetail({ id: this.id }).then(response => {
        var taskTypeData = ''
        taskTypeData = response.data
        this.storeTypeName = taskTypeData.storeTypeName
        this.taskTypeName = taskTypeData.taskTypeName
        this.storeName = taskTypeData.storeName
      })
      getPrice({ id: this.id }).then(response => {
        this.priceDetail = response.data
        console.log('详细数据', response.data)
      })
    },
    creatData() {
      // console.log('this.$store.getters.reSetData', this.$store.getters.reSetData)
      var goodsdatas = {}
      goodsdatas = this.$store.getters.reSetData
      // this.form = goodsdatas.postData
      // console.log('goodsdatas', goodsdatas)
      // // console.log('goodsdatas.postData.taskGoodsList.length', goodsdatas.postData.taskGoodsList.length)
      // // 转化taskGoodsListData
      var taskGoodsListData = goodsdatas.postData.taskGoodsList

      // taskCommentListData
      var taskCommentListData = goodsdatas.postData.taskCommentList

      // taskAdditionalIncrement
      var taskAdditionalIncrementData = goodsdatas.postData.taskAdditionalIncrement

      // //  第一部分再次渲染  商品主图部分
      // console.log('postData', taskGoodsListData)
      // console.log('this.addShop.length', this.addShop.length)
      if (taskGoodsListData.length > 1) {
        this.addShop = taskGoodsListData.length
        this.form.taskGoodsList.push({
          name: null,
          content: null,
          url: null,
          img: null,
          showPrice: null,
          realPrice: null,
          payPeopleNum: null,
          num: null,
          mainFlag: 2,
          tbkFlag: 2
        })
      }
      for (var i = 0; i < taskGoodsListData.length; i++) {
        this.form.taskGoodsList[i] = taskGoodsListData[i]
      }

      // // // 第二部分
      // console.log('第二部分数据排序方式的数据', goodsdatas.postData.searchSortWay)
      this.form.searchSortWay = goodsdatas.postData.searchSortWay
      if (goodsdatas.postData.searchLocation !== '全国') {
        var provincevalue = goodsdatas.postData.searchLocation.split('|')
        this.province = provincevalue[0]
        this.city = provincevalue[1]
      }

      this.form.searchLocation = goodsdatas.postData.searchLocation
      this.form.searchMinPrice = goodsdatas.postData.searchMinPrice
      this.form.searchMaxPrice = goodsdatas.postData.searchMaxPrice
      this.form.orderMessageBoard = goodsdatas.postData.orderMessageBoard

      // // 第三部分
      // console.log('第三部分数据评论类型', taskCommentListData)
      // this.form.commentType = goodsdatas.postData.commentType
      // this.form.searchType = goodsdatas.postData.searchType
      // if (taskCommentListData.length > 1) {
      //   this.addKeyWord = taskCommentListData.length
      //   this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
      // }
      // // console.log('taskCommentListData', taskCommentListData[0].keyword)
      // for (var x = 0; x < taskCommentListData.length;) {
      //   var numD = 0
      //   var numG = 1
      //   var arrD = []
      //   var arrR = []
      //   if (taskCommentListData[0].keyword !== null) {
      //     var taxt = taskCommentListData[0].keyword
      //     for (var y = x; y < taskCommentListData.length; y++) {
      //       if (taxt === taskCommentListData[x].keyword) {
      //         console.log('关键词或者淘口令', taskCommentListData[0].keyword)
      //         numD++
      //       } else if (taxt !== taskCommentListData[x].keyword) {
      //         arrR.push(numD)
      //       }
      //     }
      //   } else if (taskCommentListData[0].qrCodeImgUrl !== null) {
      //     var taxtqr = taskCommentListData[0].qrCodeImgUrl
      //     for (var qr = x; qr < taskCommentListData.length; qr++) {
      //       if (taxtqr === taskCommentListData[x].qrCodeImgUrl) {
      //         console.log('二维码', taskCommentListData[x].qrCodeImgUrl, numD)
      //         numD++
      //       } else if (taxtqr !== taskCommentListData[x].qrCodeImgUrl) {
      //         arrR.push(numD)
      //         console.log('二维码', taskCommentListData[x].qrCodeImgUrl, numD)
      //       }
      //     }
      //   }

      //   arrD.push({
      //     date: taskCommentListData[x].keyword,
      //     count: numD,
      //     num: numG
      //   })
      //   numG++
      //   x += numD
      // }

      // console.log('单数数据', arrD, '关键词个数', numG, '总单数', numD, '分别的单数', arrR)
      // for (var q = 0; q < arrD.length; q++) {
      //   for (var a = 0; a < numG - 1; a++) {
      //     if (this.form.searchType === 1) {
      //       this.order1[a] = arrD[q].count
      //     } else if (this.form.searchType === 2) {
      //       this.order2[a] = arrD[q].count
      //     } else if (this.form.searchType === 3) {
      //       this.order3[a] = arrD[q].count
      //     }
      //   }
      // }
      // // console.log('spList', taskCommentListData)
      // for (var k = 0; k < taskCommentListData.length; k++) {
      //   this.form.taskCommentList[k] = taskCommentListData[k]
      //   if (this.form.commentType === 1) {
      //     // this.content = taskCommentListData[k].content
      //   } else if (this.form.commentType === 2) {
      //     this.wzList[k] = taskCommentListData[k]
      //   } else if (this.form.commentType === 3) {
      //     this.tpList[k] = taskCommentListData[k]
      //   } else if (this.form.commentType === 4) {
      //     this.spList[k] = taskCommentListData[k]
      //   }
      // }
      // // 第三部分
      // console.log('第三部分数据评论类型', taskCommentListData)
      this.form.commentType = goodsdatas.postData.commentType
      this.form.searchType = goodsdatas.postData.searchType
      if (goodsdatas.postData.params.keywordList.length > 1) {
        this.addKeyWord = goodsdatas.postData.params.keywordList.length
        this.addtkl = goodsdatas.postData.params.keywordList.length
        this.addewm = goodsdatas.postData.params.keywordList.length
        if (goodsdatas.postData.searchType === 1) {
          for (var datas = 0; datas < this.addKeyWord; datas++) {
            this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
          }
        } else if (goodsdatas.postData.searchType === 2) {
          for (var o = 0; o < this.addtkl; o++) {
            this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
          }
        } else if (goodsdatas.postData.searchType === 3) {
          for (var m = 0; m < this.addewm; m++) {
            this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
          }
        }
      }
      for (var x = 0; x < goodsdatas.postData.params.keywordList.length; x++) {
        if (goodsdatas.postData.searchType === 1 || goodsdatas.postData.searchType === 2) {
          this.form.taskCommentList[x].keyword = goodsdatas.postData.params.keywordList[x].keyword
          this.order1[x] = goodsdatas.postData.params.keywordList[x].num
          this.order2[x] = goodsdatas.postData.params.keywordList[x].num
        } else if (goodsdatas.postData.searchType === 3) {
          this.form.taskCommentList[x].qrCodeImgUrl = goodsdatas.postData.params.keywordList[x].keyword
          this.order3[x] = goodsdatas.postData.params.keywordList[x].num
        }
      }

      this.form.content = taskCommentListData.content
      this.form.releaseDate = goodsdatas.postData.releaseDate
      var arr24hListTime = []
      var arr24hListNum = []
      var provincevalueTime = []
      var provincevalueTime1 = []
      for (var arr = 0; arr < goodsdatas.postData.taskReleaseTimeList.length; arr++) {
        provincevalueTime = goodsdatas.postData.taskReleaseTimeList[arr].releaseTime.split(' ')
        provincevalueTime1 = provincevalueTime[1].split(':')
        arr24hListTime.push(provincevalueTime1[0])
        arr24hListNum.push(goodsdatas.postData.taskReleaseTimeList[arr].orderNum)
      }
      for (var times = 0; times < arr24hListTime.length; times++) {
        this.hour24Data[arr24hListTime[times]] = arr24hListNum[times]
      }

      // // 第四部分
      // console.log('第四部分截图的数据', goodsdatas.postData.screenshotDetailIds)
      var theString = goodsdatas.postData.screenshotDetailIds
      console.log('theString', theString)
      if (theString !== null) {
        if (theString.indexOf(',') !== -1) {
          var screenshotDetailIds = theString.split(',')
          screenshotDetailIds = screenshotDetailIds.map(Number)
          screenshotDetailIds = screenshotDetailIds.sort(function(a, b) { return a - b })
          var screenshotDetailIdsData = this.group(screenshotDetailIds, 5)
          this.screenshotDetails = screenshotDetailIdsData[0].map(Number)
          this.screenshotDetails = this.ArrayPrototypeMax(this.screenshotDetails)
          this.screenshotDetails = [this.screenshotDetails]
          this.form.screenshotDetailIds = screenshotDetailIdsData[1].map(Number)
        }
      }

      // console.log('screenshotDetailIds', screenshotDetailIds)

      // // 第五部分
      console.log('第五部分类目数据', taskAdditionalIncrementData)
      // console.log('taskAdditionalIncrementData123123', taskAdditionalIncrementData.area)
      var areaData = taskAdditionalIncrementData.area
      var arrArea = areaData.split(',')
      // console.log('arrArea', arrArea)
      this.form.taskAdditionalIncrement.toUp = taskAdditionalIncrementData.toUp
      this.form.taskAdditionalIncrement.rewardAmount = taskAdditionalIncrementData.rewardAmount
      this.form.taskAdditionalIncrement.sex = taskAdditionalIncrementData.sex
      this.age = taskAdditionalIncrementData.minAge + '-' + taskAdditionalIncrementData.maxAge
      this.form.taskAdditionalIncrement.area = arrArea
      // 类目
      var goodsCategoryData = taskAdditionalIncrementData.goodsCategory.split(',')
      goodsCategoryData = goodsCategoryData.map(Number)
      this.form.taskAdditionalIncrement.goodsCategory = goodsCategoryData
      this.form.taskAdditionalIncrement.huaBei = taskAdditionalIncrementData.huaBei
      this.form.taskAdditionalIncrement.baiTiao = taskAdditionalIncrementData.baiTiao
      this.form.taskAdditionalIncrement.zuanHao = taskAdditionalIncrementData.zuanHao
      this.form.taskAdditionalIncrement.alreadyBrowseTask = taskAdditionalIncrementData.alreadyBrowseTask
      this.form.taskAdditionalIncrement.courierCompanyId = taskAdditionalIncrementData.courierCompanyId
      this.form.taskAdditionalIncrement.weight = taskAdditionalIncrementData.weight
      // this.form.taskAdditionalIncrement = taskAdditionalIncrementData

      // // 第六部分
      // console.log('goodsdatas', goodsdatas.postData.remarkImgUrl1)
      this.form.remarkImgUrl1 = goodsdatas.postData.remarkImgUrl1
      this.form.remarkImgUrl2 = goodsdatas.postData.remarkImgUrl2
      this.form.remarkImgUrl3 = goodsdatas.postData.remarkImgUrl3
      this.form.orderRemarks = goodsdatas.postData.orderRemarks

      // 总体
      // this.form = goodsdatas.postData
    },
    // 数组中取最大
    ArrayPrototypeMax(arr) {
      // 将数组第一个元素的值赋给max
      var max = arr[0]
      // 使用for 循环从数组第一个值开始做遍历
      for (var i = 1; i < arr.length; i++) {
        // 如果元素当前值大于max,就把这个当前值赋值给max
        if (arr[i] > max) {
          max = arr[i]
        }
      }
      // 返回最大的值
      return max
    },
    // 数组分隔
    group(array, subGroupLength) {
      const arrAy1 = []
      const arrAy2 = []
      const newArray = [arrAy1, arrAy2]
      for (var zx = 0; zx < array.length; zx++) {
        if (array[zx] < subGroupLength) {
          arrAy1.push(array[zx])
        } else if (array[zx] >= subGroupLength) {
          arrAy2.push(array[zx])
        }
      }
      return newArray
    },
    inputBlurNumber() {
      // console.log('小数据', this.form.searchMinPrice)
      // "form.searchMinPrice"
      //   size="mini"
      //   :min="0"
      //   :max="form.searchMaxPrice"
    },
    inputBlurNumberLu(rule, value, callback) {
      var min = this.form.searchMinPrice
      var max = this.form.searchMaxPrice
      console.log(min, max)
      if ((this.form.searchMinPrice > this.form.searchMaxPrice) || this.form.searchMinPrice === null || this.form.searchMaxPrice === null) {
        this.$message({
          message: '筛选价格区间需要由小到大'
        })
      }
      // if(min > max) {
      //   console.log('错了')
      //   callback(new Error('价格区间前者要小于等于后者，请重填！'))
      //   this.marginBottom = 'margin-bottom: 20px'
      // } else {
      //   this.marginBottom = ''
      //   callback()
      // }
    },
    handlePre() {
      this.$parent.handleNextOrPre(false)
    },
    uploadImage1(e) {
      this.form.taskGoodsList[this.shopIndex].img = uploadImage(e)
    },
    uploadImageShopChange(index) {
      this.shopIndex = index
    },
    uploadImageBz1(e) {
      this.form.remarkImgUrl1 = uploadImage(e)
    },
    uploadImageBz2(e) {
      this.form.remarkImgUrl2 = uploadImage(e)
    },
    uploadImageBz3(e) {
      this.form.remarkImgUrl3 = uploadImage(e)
    },
    uploadImageEwm(e) {
      this.form.taskCommentList[this.ewmIndex].qrCodeImgUrl = uploadImage(e)
    },
    uploadImageEwmChange(index) {
      this.ewmIndex = index
    },
    onChangeProvince(a) {
      if (a.value !== '省') {
        this.form.searchLocation = a.value
      }
    },
    onChangeCity(a) {
      if (a.value !== '市') {
        if (!this.form.searchLocation.includes('|')) {
          this.form.searchLocation = this.form.searchLocation + '|' + a.value
        } else {
          var arrcity = this.form.searchLocation.split('|')
          this.form.searchLocation = arrcity[0] + '|' + a.value
        }
      }
    },
    removeMainImg(val) {
      this.form.taskGoodsList[val - 1].img = ''
    },
    removeAddImg1() {
      this.form.remarkImgUrl1 = ''
    },
    removeAddImg2() {
      this.form.remarkImgUrl2 = ''
    },
    removeAddImg3() {
      this.form.remarkImgUrl3 = ''
    },
    // 删除空包
    delIncrement() {
      this.form.taskAdditionalIncrement.courierCompanyId = null
      this.form.taskAdditionalIncrement.weight = null
    },
    // 删除附加商品
    delStore(index) {
      this.addShop--
      this.form.taskGoodsList.splice(index - 1, 1)
    },
    // 删除关键词
    delGuanjc(index) {
      if (this.form.taskCommentList.length === 1) {
        return
      }
      this.addKeyWord--
      this.form.taskCommentList.splice(index - 1, 1)
      this.order1.splice(index - 1, 1)
    },
    handleGuanjc() {
      if (this.addKeyWord < 10) {
        this.addKeyWord++
        this.form.taskCommentList.push({ keyword: null })
      }
    },
    // 删除链接
    delkl(index) {
      if (this.form.taskCommentList.length === 1) {
        return
      }
      this.addtkl--
      this.form.taskCommentList.splice(index - 1, 1)
      this.order2.splice(index - 1, 1)
    },
    handletkl() {
      if (this.addtkl < 10) {
        this.addtkl++
        this.form.taskCommentList.push({ keyword: null })
      }
    },
    // 删除二维码
    delewm(index) {
      if (this.form.taskCommentList.length === 1) {
        return
      }
      this.addewm--
      this.form.taskCommentList.splice(index - 1, 1)
      this.order3.splice(index - 1, 1)
    },
    handleewm() {
      if (this.addewm < 10) {
        this.addewm++
        this.form.taskCommentList.push({ qrCodeImgUrl: null })
      }
    },
    handleDearchType(val) {
      this.addKeyWord = 1
      this.addtkl = 1
      this.addewm = 1
      this.order1 = []
      this.order2 = []
      this.order3 = []
      if (val === 1) {
        this.form.taskCommentList = [{ keyword: null }]
      } else if (val === 2) {
        this.form.taskCommentList = [{ keyword: null }]
      } else {
        this.form.taskCommentList = [{ qrCodeImgUrl: null }]
      }
    },
    handleReleaseDate(val) {
      this.handleChangeReleaseDate(true)
      var myDate = new Date()
      var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      var day = myDate.getDate() < 9 ? '0' + (myDate.getDate()) : myDate.getDate()
      var dataToDate = myDate.getFullYear() + '-' + month + '-' + day

      if (val === dataToDate) {
        this.hour24Show = myDate.getHours() + 1
      } else {
        this.hour24Show = 0
      }
    },
    handleNext() {
      if (this.orderAll !== this.totalSearch()) {
        this.$message({
          message: '发布的单量不正确',
          type: 'warning'
        })
        return
      }
      this.hour24ToResult()
      var age = this.age
      var ageArray = age.split('-')
      if (ageArray.length === 2) {
        this.form.taskAdditionalIncrement.maxAge = ageArray[1]
      }
      this.form.taskAdditionalIncrement.minAge = ageArray[0]
      // var data = Object.assign({},this.form);
      var data = JSON.parse(JSON.stringify(this.form))
      data.orderNum = this.orderAll
      if (data.screenshotDetailIds.length > 0) {
        // 进行货比的判断，输入进对比值
        var numPass = this.screenshotDetails[0]
        var arrList = []
        if (numPass === 1) {
          arrList = 1
        } else if (numPass === 2) {
          arrList = 1 + ',' + 2
        } else if (numPass === 3) {
          arrList = 1 + ',' + 2 + ',' + 3
        } else {
          arrList = 1 + ',' + 2 + ',' + 3 + ',' + 4
        }
        this.screenshotDetails = arrList
        data.screenshotDetailIds.splice(0, 0, this.screenshotDetails)
        data.screenshotDetailIds = data.screenshotDetailIds.join(',')
      } else {
        data.screenshotDetailIds = null
      }
      if (data.taskAdditionalIncrement.goodsCategory.length > 0) {
        data.taskAdditionalIncrement.goodsCategory = data.taskAdditionalIncrement.goodsCategory.join(',')
      }
      if (data.taskAdditionalIncrement.area.length > 0) {
        data.taskAdditionalIncrement.area = data.taskAdditionalIncrement.area.join(',')
      }
      const taskCommentList = []
      for (let i = 0; i < this.form.taskCommentList.length; i++) {
        for (let j = 0; j < this.order1[i]; j++) {
          taskCommentList.push(JSON.parse(JSON.stringify(this.form.taskCommentList[i])))
        }
      }
      data.taskCommentList = taskCommentList

      const bigData = {
        postData: data,
        store: this.store,
        storeType: this.storeType,
        taskType: this.taskType
      }
      this.$store.commit('SET_RESETDATA', bigData)
      data.taskAdditionalIncrement = JSON.stringify(data.taskAdditionalIncrement)
      data.taskCommentList = JSON.stringify(data.taskCommentList)
      data.taskGoodsList = JSON.stringify(data.taskGoodsList)
      data.taskReleaseTimeList = JSON.stringify(data.taskReleaseTimeList)
      this.form.storeId = this.store
      this.form.storeTypeId = this.storeType
      this.form.taskTypeId = this.taskType
      var numId = 0
      create(data).then(response => {
        if (response.code === 0) {
          this.handlePrice(response.data)
          numId = response.data
          const param = {
            store: this.store,
            storeType: this.storeType,
            taskType: this.taskType,
            id: numId,
            postData: data,
            type: '京东浏览任务'
          }
          this.$router.push({ path: 'repay', query: param })
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    set(val) {
      this.$store.commit('SET_RESETDATA', val)
    },
    handlePrice(id) {
      this.taskId = id
      getPrice({ id: id }).then(response => {
        this.priceDetail = response.data
        this.active++
      })
    },
    hour24ToResult() {
      var myDate = new Date()
      var result = myDate.getHours() // 获取当前小时数(0-23)

      var array = new Array()
      for (var i = 0; i < 24; i++) {
        if (this.hour24Data[i] > 0) {
          var hour
          if (i < 10) {
            hour = '0' + i
          } else {
            hour = i
          }
          array.push({
            orderNum: this.hour24Data[i],
            releaseTime: this.form.releaseDate + ' ' + hour + ':00:00'
          })
        }
      }
      this.form.taskReleaseTimeList = array
    },
    totalSearch() {
      var count = 0
      if (this.form.searchType === 1) {
        this.order1.map(res => {
          count += Number(res)
        })
      } else if (this.form.searchType === 2) {
        this.order2.map(res => {
          count += Number(res)
        })
      } else {
        this.order3.map(res => {
          count += Number(res)
        })
      }
      return count
    },
    inputBlur(e) {
      // if (e.target.value.indexOf('jd.com') === -1) {
      //   console.log(e.target.value)
      //   this.$message({
      //     message: '商品链接不正确请重新输入',
      //     type: 'warning'
      //   })
      //   return
      // }
    },
    handleCheckBox(val) {
      this.screenshotDetails = []
      if (val.length >= 1) {
        this.screenshotDetails[0] = val[val.length - 1]
        this.form.screenshotDetailIds.splice(0, 0, this.screenshotDetails)
        console.log('asda', this.screenshotDetails[0])
      }
    },
    handleChangeReleaseDate(val) {
      console.log(this.form.releaseDate)
      if (this.form.releaseDate === null || this.form.releaseDate === '') {
        this.$message({
          message: '时间不能为空！',
          type: 'warning'
        })
        this.isReleaseDate = false
        return
      }
      if (val) {
        this.orderAll = this.totalSearch()
        var myDate = new Date()
        var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
        var day = myDate.getDate() < 9 ? '0' + (myDate.getDate()) : myDate.getDate()
        var dataToDate = myDate.getFullYear() + '-' + month + '-' + day
        var allData = this.orderAll
        var array = new Array()
        let len = 0
        if (allData) {
          if (this.form.releaseDate && this.form.releaseDate === dataToDate) {
            len = 24 - parseInt(myDate.getHours() + 1)
            if (len > allData) {
              len = allData
            }
            const Arr = this.randomArr(allData, 1, allData, len)
            for (let j = myDate.getHours() + 1; j < 24; j++) {
              const index = j - myDate.getHours() - 1
              array[j] = Arr[index]
            }
          } else {
            len = 24
            if (len > allData) {
              len = allData
            }
            const Arr = this.randomArr(allData, 1, allData, len)
            for (var i = 0; i < 24; i++) {
              array[i] = Arr[i]
            }
          }
        }
        this.hour24Data = array
      }
    },
    randomArr(value, min, max, length) {
      console.log('value:====' + value + 'min:====' + min + 'max:===' + max + 'length:===' + length)
      var ran = []; var arrId
      // 循环存放数组最小值
      for (var i = 0; i < length; i++) {
        ran[i] = min
      }
      // 计算剩下的值
      var spare = value - (min * length)
      while (spare > 0) {
        // 生成数组随机ID
        arrId = Math.round(Math.random() * length)
        if (ran[arrId] < max) {
          ran[arrId] += 1
          spare--
        }
      }
      console.log('ran ==========' + ran)
      return ran
    },
    clickItemAge(index) {
      index === this.age ? this.age = '' : this.age = index
      console.log(index)
    },
    clickItem(index) {
      index === this.form.taskAdditionalIncrement.sex ? this.form.taskAdditionalIncrement.sex = '' : this.form.taskAdditionalIncrement.sex = index
      console.log(index)
    }

  }
}
</script>

<style scoped>
  .pr >>> .distpicker-address-wrapper select {
    color: #97A8BE;
    width: 100px;
    height: 32px;
    font-size: inherit;
    padding: 0 .75rem;
  }

  .radio-none >>> .el-radio__input {
    display: none;
  }

  .radio-none >>> .el-radio {
    margin-right: 8px;
  }

  .el-radio{
    margin-right: 15px;
  }

  .radio-none >>> .el-radio__label {
    padding-left: 0;
  }

  .radio-none >>> .el-radio--mini.is-bordered {
    padding: 6px 9px 0 10px
  }

  .form .form-action {
    width: 3em;
  }

  .form .form-action i {
    font-size: 26px;
    color: #6666FF
  }

  .boder-all {
    border: 1px solid #BCBCBC
  }

  .table td {
    border: 1px solid #6666FF;
  }

  .activity-button {
    border-color: #6666FF !important;
    color: #6666FF !important;
  }

  .radio-list .item {
    padding-left: 10px;
    display: flex;
    color: #333;
  }

  .radio-list .radio {
    margin-right: 4px;
  }

  .radio-list .radio-tip {
    color: #BCBCBC;
    font-size: 14px;
  }

  .radio-list-logo {
    width: 25px;
    position: relative;
    top: 8px;
    margin-right: 5px;
  }

  .radio-list >>> .el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }

  .radio-list >>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #6666FF;
    background: #6666FF;
  }

  .radio-list-new {
    width: 30px;
    height: 30px;
    position: relative;
    top: 1px;
  }

  .form .checkbox {
    margin-left: 14px;
  }

  .item-img {
    width: 30px;
    height: 30px;
  }

  .radio-list-y >>> .el-radio-button__inner, .el-radio-group {
    font-size: initial;
    display: inline-block;
    line-height: unset;
    vertical-align: middle;
  }

  .addShop {
    position: absolute;
    right: 0;
    top: 13px;
  }

  .step-title {
    margin-top: 24px;
    line-height: 32px;
    text-align: center;
    background-color: #6666FF;
    color: white;
    font-size: 16px;
  }

  .w400 {
    width: 400px;
  }

  .form .form-err-change {
    padding: 6px 0 6px 54px;
    font-size: 12px;
  }

  .avatar-uploader {
    border: 1px dashed #6666FF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .epshow {
    position: absolute;
    left: 173px;
    bottom: -29px;
  }

  .upload-d {
    font-size: 12px;
    position: absolute;
    bottom: 0px;
    color: #bcbcbc;
  }

  .upload-e {
    position: absolute;
    bottom: 0px;
    right: 0;
    font-size: 12px;
  }

  .form .form-label {
    min-width: 7em;
  }

  .form-label-price {
    min-width: 5em !important;
    margin-left: 39px;
  }

  .form-label >>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #6666FF;
    background: #6666FF;
  }

  .form-label >>> .el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }

  .clock-list {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
  }

  .clock-list .item {
    margin-bottom: 16px;
    width: 7.7%;
    display: flex;
    flex-direction: column;
    border: 1px solid #6666FF;
  }

  .clock-list .sp1 {
    line-height: 32px;
    background-color: #6666FF;
    color: white;
  }

  .clock-list .sp2 {
    padding: 0 8px;
    width: 100%;
    height: 32px;
    text-align: center;
    font-size: 16px;
    color: #666;
    box-sizing: border-box;
  }

  .checkbox-mr >>> .el-checkbox__inner {
    width: 28px;
    height: 28px
  }

  .checkbox-mr >>> .el-checkbox__input.is-checked .el-checkbox__inner::after {
    transform: rotate(45deg) scaleY(3);
  }

  .checkbox-mr >>> .el-checkbox__inner::after {
    left: 9px;
    top: 7px;
    width: 8px;
  }

  .avatar-uploader-remove {
    position: absolute;
    top: -16px;
    right: 7px;
    color: #6666FF;
    font-size: 20px;
  }
  .checkbox-mr {
    margin-right: 20px;
    position: relative;
    height: 54px;
  }

  .checkbox-tip {
    color: red;
    position: absolute;
    font-size: 12px;
    bottom: 0;
    width: 70px;
    right: 0;
  }

  .checkbox-button-width {
    width: 82px
  }

  .form-item >>> .el-button--mini, .el-button--mini.is-round {
    padding: 7px 7px;
  }

  .checkbox-list {
    border: 1px solid #BCBCBC;
    width: 500px;
    height: 280px;
    border-radius: 5px;
    padding: 10px
  }

  /deep/ .el-textarea__inner {
    border: 1px dashed #BCBCBC;
  }

  .remark {
    width: 600px;
    height: 100px;
    border-radius: 5px;
    padding: 10px;
    color: #BCBCBC;
    font-size: 12px
  }

  .activity-page >>> .el-dialog__header {
    padding: 0
  }

  .activity-page >>> .el-dialog__body {
    padding: 2px
  }

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /deep/ input[type="number"] {
    -moz-appearance: textfield;
  }

</style>
