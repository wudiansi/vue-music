<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
 <!-- <p>signer detail!</p> -->
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import musicList from 'components/music-list/music-list'
import {createdSong} from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    // 通过mapGetter这样一个数组可以map多个getter 挂载该数据后可拿取
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getdetail()
  },
  methods: {
    _getdetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        // 直接拿取item.musicData
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          // 一个工厂化方法 少new
          ret.push(createdSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  
  // .singer-detail
  //   position : fixed
  //   z-index : 100
  //   top: 0
  //   bottom: 0
  //   left : 0
  //   right : 0
  //   background : $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>