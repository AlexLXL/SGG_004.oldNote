<template>
  <div>
    <div
      class="bookslistContainer"
      v-for="(book, index) in booklist"
      :key="index"
      @click="toDetail(book)"
    >
      <img :src="book.image" alt />
      <div class="bookContent">
        <p>{{book.title}}</p>
        <p>作者:{{book.author[0]}}</p>
        <p>出版社:{{book.publisher}}</p>
      </div>
      <div class="price">{{book.price}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["booklist"],
  data() {
    return {
      booklist: []
    };
  },
  mounted() {
    // 接收路由传过来的查询字符串
    if (this.$mp) {
      const result = JSON.parse(this.$mp.query.booklist);
      this.booklist = result;
    }
  },
  methods: {
    toDetail(book) {
      wx.navigateTo({
        url: "/pages/detail/main?bookItem=" + JSON.stringify(book)
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.bookslistContainer
  display flex
  padding 10rpx
  border-bottom 1px solid #ccc
  img
    width 140rpx
    height 140rpx
    margin-right 10rpx
  .bookContent
    font-size 32rpx
    width 64%
  .price
    font-size 32rpx
    font-weight bold
    color red
</style>
