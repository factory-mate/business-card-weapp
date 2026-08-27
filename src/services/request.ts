interface Response<T = any> {
  msg: string
  success: boolean
  data: T
  errmsg: any
}

export const ADMIN_API_DOMAIN_PREFIX = 'https://huiyoucloud.com:8888'
export const API_DOMAIN_PREFIX = 'https://huiyoucloud.com:8087'

export async function request<T>(options: WechatMiniprogram.RequestOption) {
  const token = wx.getStorageSync('token')

  return new Promise<Response<T>>((resolve, reject) => {
    wx.request({
      timeout: 30000,
      ...options,
      header: {
        Authorization: token ? `Bearer ${token}` : '',
        ...options.header
      },
      success: (res) => {
        const { data, statusCode } = res
        const { msg, errmsg } = data as Response<T>
        const errorMessage = (
          msg ||
          errmsg?.[0]?.msg ||
          errmsg?.[0]?.Value ||
          errmsg ||
          '请求错误'
        ).toString()
        if (statusCode === 401 || statusCode === 403) {
          wx.showToast({ title: errorMessage, icon: 'none', duration: 2000 })
          wx.removeStorageSync('token')
          wx.removeStorageSync('user')
        } else if (statusCode !== 200) {
          wx.showToast({ title: errorMessage, icon: 'none', duration: 2000 })
          reject(data)
        } else {
          if (!(data as Response<T>).success) {
            wx.showToast({ title: errorMessage, icon: 'none', duration: 2000 })
            reject(data)
          }
          resolve(data as Response<T>)
        }
      },
      fail(err) {
        wx.showToast({ title: err.errMsg ?? '请求错误', icon: 'none', duration: 2000 })
        reject(err)
      }
    })
  })
}
