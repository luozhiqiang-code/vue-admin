import request from '@/utils/request'
// 已完成的功能
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}
// 获取文章章节
export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
