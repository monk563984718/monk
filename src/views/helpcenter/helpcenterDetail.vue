<template>
  <div class="helpcenter-page">
    <div class="article">
      <h3 class="h3">{{ list.title }}</h3>
      <div class="time">发布时间：{{ list.releaseTime }}</div>
      <div id="contentdataId" class="contentdata" style="margin:0 auto" v-html="list.content" />

    </div>
  </div>
</template>

<script>
import { helpGet } from '@/api/helpcenter'
// import $ from '@/assets/js/jquery-3.3.1.min.js'

export default {
  name: 'HelpcenterDetail',
  data() {
    return {
      list: {},
      noticeId: '',
      helpcenterDetailId: ''
    }
  },
  created() {
    this.noticeId = window.location.href
    if (this.noticeId.indexOf('id=') !== -1) {
      var textList = this.noticeId.split('?id=')
      this.helpcenterDetailId = textList[1]
      this.init()
    } else {
      this.$router.push({ path: '/admin/helpcenter' })
    }
  },
  mounted() {
    var self = this
    setTimeout(function() {
      self.Adda()
    }, 1000)
  },
  methods: {
    init() {
      var self = this
      helpGet({ id: this.helpcenterDetailId }).then(function(response) {
        self.list = response.data
      })
    },
    Adda() {
      this.$nextTick(() => {
        var idDOm = document.getElementById('contentdataId')
        var imgDom = idDOm.getElementsByTagName('img')
        var parent = null
        var parentDom = []
        parentDom = Array.prototype.slice.call(imgDom)
        for (var i = 0; i < imgDom.length; i++) {
          parent = imgDom[i].parentElement
          parent.removeChild(imgDom[i])
          var haskell = document.createElement('a')
          haskell.href = parentDom[i].src
          haskell.target = '_blank'
          haskell.innerHTML = `<img src=${parentDom[i].src}>`
          // haskell.innerHTML = `<img src=${parentDom[i].src} width=${parentDom[i].width} height=${parentDom[i].height}>`
          parent.appendChild(haskell)
        }
      })
    }
  }
}
</script>

<style scoped>
.contentdata >>> table {
    width: 100%;
}
</style>
