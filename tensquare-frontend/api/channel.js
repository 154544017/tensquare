import request from '@/utils/request'
const group_name = 'article'
const api_name = 'channel'
export default {
  getList() {
    return request({
      url: `/${group_name}/${api_name}/search/1/10`,
      method: 'post',
      data:{"state":"1"}
    })
  },
}
