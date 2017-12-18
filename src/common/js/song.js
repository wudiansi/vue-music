export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createdSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval, // 歌曲播放时长(s)
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albumid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

// 多歌手处理 直接数据优于dom前处理
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }

  singer.forEach((s) => {
    ret.push(s.name)
  })

  // /分隔多歌手
  return ret.join('/')
}