import request from '@/utils/request'
const group_name = 'article'
const api_name = 'article'
export default {
  getList(page=1,size=10,searchmap) {
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchmap
    })
  },
  postArticle(pojo){
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  getArticle(id){
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get'
    })
  }
}
