import request from "@/utils/request";

const group_name = 'qa'
const api_name = 'reply'

export default {
  getReplies(problemId){
    return request({
      url: `/${group_name}/${api_name}/search/1/10`,
      method: 'post',
      data: {"problemid":problemId.toString()}
    })
  },
  submit(pojo){
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  }
}
