<template>
  <scroll class="listview" 
  :data="data"
  ref="listview"
  :probeType="probeType"
  :listen-scroll="listenScroll"
  @scroll="scroll"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortCutList" 
        :data-index="index" 
        class="item"
        :class="{'current': currentIndex === index}"
        @touchstart="onShortcutTouchStart" 
        @touchmove.stop.prevent="onShortcutTouchMove">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'

const ANCHOR_HEIGHT = 18

export default {
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  created() {
    this.touch = []
    this.listenScroll = true
    this.listHeight = 0
    this.probeType = 3
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortCutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  components: {
    Scroll
  },
  watch: {
    // dom渲染好开始
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    // 监听scrollY值的变化
    scrollY(newY) {
      const height = this.listHeight
      // 当滚到顶部newY大于0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }

      for (let i = 0; i < height.length - 1; i++) {
        let height1 = height[i]
        let height2 = height[i + 1]
        // 在中间部分滚动
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          return
        }
      }
      // 滚动到底部且-newY大于最后一个元素的上限
      this.currentIndex = this.listHeight.length - 2
      this.currentIndex = 0
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      // 第一个触点
      let firsrtTouch = e.touches[0]
      this.touch.y1 = firsrtTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._srcollToIndex(anchorIndex)
      // this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    },
    onShortcutTouchMove(e) {
      let firsrtTouch = e.touches[0]
      this.touch.y2 = firsrtTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta

      // console.log(delta, anchorIndex)
      this._srcollToIndex(anchorIndex)
    },
    _srcollToIndex(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      console.log(this.listHeight)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>