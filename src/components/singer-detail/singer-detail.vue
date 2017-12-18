<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
 <!-- <p>signer detail!</p> -->
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'

export default {
  computed: {
    // 通过mapGetter这样一个数组可以map多个getter 挂载该数据后可拿取
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getdetail()
    console.log(this.singer)
  },
  methods: {
    _getdetail() {
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  
  .singer-detail
    position : fixed
    z-index : 100
    top: 0
    bottom: 0
    left : 0
    right : 0
    background : $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>