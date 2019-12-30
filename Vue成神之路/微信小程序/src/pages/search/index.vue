<template>
  <div class="searchContainer">
    <div class="header">
      <input
        type="text"
        placeholder="请输入搜索内容"
        placeholder-class="placeholderCss"
        v-model="searchText"
        @confirm="handleConfirm"
      />
      <div v-show="!!searchText" @click="clearText">x</div>
    </div>

    <div v-if="booklist.length > 0">
      <div>一共{{booklist.length}}条</div>
      <bookslist :booklist="booklist"></bookslist>
    </div>
  </div>
</template>
<script>
import bookslist from '../bookslist/index.vue'
import request from "../../utils/request.js";

export default {
  components:{
    bookslist
  },
  data() {
    return {
      searchText: "",
      booklist: []
    };
  },
  methods: {
    clearText() {
      this.searchText = "";
    },
    async handleConfirm(event) {
      // console.log(event.mp.detail.value);
      // console.log(this.searchText);
      const url = "/searchBooks";
      const param = this.searchText;
      // var reqTask = wx.request({
      //   url,
      //   data: {req: param},
      //   method: 'GET',
      //   success: (result)=>{
      //     console.log(result.data);
      //   },
      // });
      const result = await request(url, param);
      this.booklist = result;
      console.log(result);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.searchContainer
  .header
    width 80%
    height 80rpx
    margin 10rpx auto
    border-bottom 1rpx solid #ccc
    position relative
    input
      height 100%
      .placeholderCss
        text-align center
        color #02a774
        font-size 28rpx
    div
      width 35rpx
      height 35rpx
      position absolute
      right 10rpx
      top 10rpx
      border 1rpx solid #000
      border-radius 50%
      z-index 2
</style>