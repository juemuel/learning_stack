import axios from 'axios'

export function request (config: any): any {
  return new Promise((resolve, reject) => {
    const axiosInstance = axios.create({
      timeout: 60000
    })

    /**
     * 发送请求前拦截
     */
    axiosInstance.interceptors.request.use(
      config => {
        return config
      },
      error => {
        console.log('请求前发生错误: ', error)
        reject(error)
      }
    )
    /**
     * 请求后拦截
     */
    axiosInstance.interceptors.response.use(
      response => {
        if (response.status === 200) {
          // resolve(response.data) // ts3.0版本的axios 返回的是AxiosResponse<any>类型，比较宽松，所以这里返回response.data
          return response; // ts4.7版本的axios 返回的是AxiosResponse类型，精确了，所以这里返回response
        } else {
          // reject(response)
          return response;
        }
      },
      error => {
        console.log('请求后发生错误: ', error)
        reject(error)
      }
    )

    axiosInstance(config)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}
