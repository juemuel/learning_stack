import { request } from './request'

/**
 * get请求封装
 *
 * @param url 请求url
 * @param params 请求参数对象：{id:111}
 * @param headers 请求header对象：{token:"1112222"}
 */
export function get (url: string, params: any, headers: any): any {
  return new Promise((resolve, reject) => {
    if (headers === undefined || headers === null || headers === '') {
      headers = {}
    }

    const requestConfig = {
      method: 'GET',
      url: url,
      headers: headers,
      params: params
    }
    request(requestConfig).then((result: unknown) => {
      resolve(result)
    }).catch((error: unknown) => {
      reject(error)
    })
  })
}

/**
 * post请求封装
 *
 * @param url 请求url
 * @param params 请求参数对象，可以实例化 formData() 对象 或者用 qs.stringify({data})
 * @param headers 请求header对象：{token:"1112222"}
 */
export function post (url: string, params: any, headers: any): any {
  return new Promise((resolve, reject) => {
    if (headers === undefined || headers === null || headers === '') {
      headers = {}
    }
    const requestConfig = {
      method: 'post',
      url: url,
      headers: headers,
      data: params
    }

    request(requestConfig)
      .then((result: unknown) => {
        resolve(result)
      })
      .catch((error: unknown) => {
        reject(error)
      })
  })
}

export default {
  get,
  post
}
