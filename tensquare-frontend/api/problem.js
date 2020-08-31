import request from '@/utils/request'

const group_name = 'qa';
const api_name = 'problem';
export default {
  list(type,label,page,size){
    return request({
      url: `/${group_name}/${api_name}/${type}/${label}/${page}/${size}`,
      method: 'get',
    })
  },
  getProblem(id){
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get',
    })
  },
  submit(pojo){
    return request({
      url: `/${group_name}/${api_name}`,
      method: "post",
      data: pojo
    })
  },
  getMyQuestion(){
    return request({
      url: `/${group_name}/${api_name}/userProblem/1/10`,
      method: "get"
    })
  },
  getMyAnswer(){
    return request({
      url: `/${group_name}/reply/userReply/1/10`,
      method: "get"
    })
  }
}

