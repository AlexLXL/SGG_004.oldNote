<template>
  <div class="indexContainer">
    <swiper :indicator-dots="!isShow" @change="handleChange">
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
        <button @click="join">进入看书</button>
      </swiper-item>
    </swiper>
    <!-- <button v-if="isShow" @click="join">进入看书</button> -->
  </div>
</template>
<script>
import personal from "../personal/index.vue";
export default {
  components: {
    personal
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    handleChange(event) {
      // console.log(event.mp.detail.current);
      const currentNum = event.mp.detail.current;
      currentNum === 3 ? (this.isShow = true) : (this.isShow = false);
    },
    join() {
      wx.switchTab({
        url: "/pages/books/main"
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.indexContainer
  width 100%
  height 100%
  swiper
    width 100%
    height 100%
    img
      width 100%
      height 100%
  button
    width 280rpx
    height 100rpx
    line-height 100rpx
    font-size 32rpx
    color #ffffff
    background-color rgba(0, 0, 0, 0.5)
    position absolute
    left 50%
    bottom 30rpx
    margin-left -140rpx
</style>