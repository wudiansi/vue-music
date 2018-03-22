import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import {getCookie} from 'common/js/cookie'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    from: 'h5',
    needNewCode: 0,
    platform: 'h5page',
    g_tk: 5239908145
  })

  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 1,
    platform: 'h5page',
    order: 'listen',
    from: 'h5',
    uin: 0,
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId,
    g_tk: 5239908145
  })

  return jsonp(url, data, options)
}

/*
 * 获取歌曲单曲播放地址
 * songmid // 歌曲mid
 * */
export function getSinglePlayingUrl (songmid) {
  const url = '/api/getSinglePlayingUrl'
  const data = Object.assign({}, commonParams, {
    jsonpCallback: 'MusicJsonCallback7776788287808083',
    callback: 'MusicJsonCallback7776788287808083',
    format: 'json',
    cid: 205361747,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid: songmid,
    filename: `C400${songmid}.m4a`,
    guid: getCookie('guid')
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}