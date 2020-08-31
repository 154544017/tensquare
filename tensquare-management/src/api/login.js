import request from '@/utils/request'
const groupName = "user"
const apiName = "admin"
export function login(loginname, password) {
  return request({
    url: `/${groupName}/${apiName}/login`,
    method: 'post',
    data: {
      loginname,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: `/${groupName}/${apiName}/info`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `/${groupName}/${apiName}/logout`,
    method: 'post'
  })
}
