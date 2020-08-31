import request from '@/utils/request'
const group_name = 'base'
const api_name = 'image'
export default {
  getImgs() {
    return request({
      url: `/${group_name}/${api_name}/small`,
      method: 'get',
    })
  },
}
