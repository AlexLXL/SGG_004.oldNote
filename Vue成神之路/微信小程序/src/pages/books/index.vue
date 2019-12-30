<template>
  <div class="booksContainer">
    <swiper indicator-dots>
      <swiper-item>
        <img src="/static/imgs/firstView/1.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/2.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/3.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/nvsheng.jpg" alt />
      </swiper-item>
    </swiper>

    <div class="nav">
      <span class="all">全部商品</span>
      <span class="more" @click="toBookList(bookListArr)">&gt;</span>
    </div>

    <ul class="booklist">
      <li class="bookItem" v-for="(bookList, index) in bookListArr" :key="index">
        <img :src="bookList.image" alt="" />
        <p class="bookName">《{{bookList.title}}》</p>
        <p class="bookDir">{{bookList.author[0]}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import datas from './datas/data.json'

export default {
  data() {
    return {
      bookListArr:[]
    }
  },
  mounted() {
    // console.log(datas);
    this.bookListArr = datas
  },
  methods: {
    toBookList(bookListArr){
      wx.navigateTo({
        url: '/pages/bookslist/main?booklist=' + JSON.stringify(bookListArr)
      });
    }
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.booksContainer
  swiper
    width 100%
    height 400rpx
    img
      height 100%
      width 100%
  .nav
    padding 10rpx
    .more
      float right
      width 80rpx
      height 100%
      text-align right
      color #02a774
  .booklist
    display flex
    flex-wrap wrap
    .bookItem
      width 50%
      width 50%
      box-sizing border-box
      border-bottom 1rpx solid #eee
      text-align center
      padding 20rpx
      &:nth-child(odd)
        border-right 1rpx solid #eee
      img
        width 200rpx
        height 200rpx
      .bookName
        font-size 30rpx
        line-height 60rpx
      .bookDir
        font-size 28rpx
</style>