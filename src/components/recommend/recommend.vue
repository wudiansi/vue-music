<template>
 <div class="recommend">
   <scroll class="recommend-content" :data="discList" ref="scroll">
     <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="imgOnLoad" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>

        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
     </div>
     <div class="loading-container" v-show="!discList.length">
      <loading></loading>
     </div>
   </scroll>
 </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
// 设置cookie setCookie  获取cookie getCookie
import {setCookie, getCookie} from 'common/js/cookie'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
    // 把歌曲guid保存到cookie
    this.setGuid()
  },
  components: {
    Slider,
    Scroll,
    loading
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        // console.log(res.data)
        this.discList = res.data.list
      })
    },
    imgOnLoad() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    // 获取歌曲播放的 guid !!!!!!!!!!!!!!!!!!!!!! 重要
    guid () {
      let date = new Date()
      return Math.round(2147483647 * Math.abs(Math.random() - 1) * date.getUTCMilliseconds() % 1e10)
    },
    // 把歌曲guid保存到cookie !!!!!!!!!!!!!!!!!!!!!! 重要 每天设置一次
    setGuid () {
      let d = new Date()
      let n = d.getHours()
      // 如果没有guid就设置guid
      if (!getCookie('guid')) {
        setCookie('guid', this.guid, Infinity, '/')
      } else if (n === 0) {
        // 如果有guid每天重置一次
        setCookie('guid', this.guid, Infinity, '/')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>