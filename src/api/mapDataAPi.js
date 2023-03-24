import { request } from '@/api/request'

// 本地中国数据接口
export function localChina() {
  return request({
    url: `${import.meta.env.BASE_URL}json/china.json`,
    method: 'get'
  })
}
// 本地世界数据接口
export function localWorld() {
  return request({
    url: `${import.meta.env.BASE_URL}json/world.json`,
    method: 'get'
  })
}
