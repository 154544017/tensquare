import request from '@/utils/request'

const group_name = 'spit';
const api_name = 'spit';
export default {
  search(page,size,searchMap){
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  findById(id) {
    return request({ url: `/${group_name}/${api_name}/${id}`, method: 'get' })
  },
  findCommentsById(id,page=1,size=10) {
    return request({ url: `/${group_name}/${api_name}/comment/${id}/${page}/${size}`, method: 'get' })
  },
  thumbup(id){
    return request({url: `/${group_name}/${api_name}/thumbup/${id}`, method: 'put'})
  },
  submitSpit(pojo){
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  }
}
