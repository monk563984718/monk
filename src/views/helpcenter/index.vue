<template>
  <div class="notice-page">
    <div v-if="list.length === 0" style="display:flex;justify-content:center;"><span style="margin:10px auto;">暂无数据</span></div>
    <!-- <p v-if="list.length === 0" style="margin:0 auto;display:inline-block;">暂无数据</p> -->
    <ul class="notice-list">
      <li v-for="(item,index) in list" class="item">
        <a class="title" @click="handleDetail(item.id)">({{ ++index }}) {{ item.title }}</a>
        <span class="time">{{ item.releaseTime }}</span>
      </li>
    </ul>
    <div class="pagination">
      <span class="total">共{{ pagetotal }}页</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ query.pageNum }}&nbsp;/&nbsp;{{ pagetotal }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <input v-model="query.pageNum" class="ipt" type="text">
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>
  </div>
</template>

<script>
import { helpFindList, helpGet } from '@/api/shop'
export default {
  name: 'Helpcenter',
  data() {
    return {
      list: [],
      query: {
        pageNum: 1,
        pageSize: 10
      },
      pagetotal: 1
    }
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      helpFindList(this.query).then(response => {
        this.list = response.data.rows
        this.pagetotal = Math.ceil(response.data.total / this.query.pageSize)
      })
    },
    handleDetail(id) {
      this.$router.push({ path: '/admin/helpcenterDetail?id=' + id })
    },
    handleChangePage(type) {
      if (type) {
        if (this.query.pageNum < this.total) {
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
    handlePageIn() {
      if (this.pageIn <= this.total && this.pageIn > 0) {
        this.query.pageNum = this.pageIn
        this.init()
      } else if (this.query.pageNum > this.pagetotal || this.pagetotal !== 0) {
        // this.$message({
        //   message: '没有该页面！',
        //   type: 'warning'
        // })
        this.query.pageNum = 1
      }
    }
  }
}
</script>

<style scoped>

</style>
