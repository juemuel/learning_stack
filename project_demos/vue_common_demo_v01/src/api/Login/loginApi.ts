import http from '../http'
import qs from 'qs'

export default {
  login: async function (params: any): Promise<any> {
    const url = process.env.VUE_APP_BASE_URL + '/common-user/login'
    return await http.post(url, params, {})
  }
}
