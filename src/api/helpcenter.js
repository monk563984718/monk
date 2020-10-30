import request from '@/utils/request'

export function helpFindList(data) {
  return request({
    url: '/help/findList',
    method: 'post',
    params: data
  })
}
export function helpGet(data) {
  return request({
    url: '/help/get',
    method: 'post',
    params: data
  })
}

