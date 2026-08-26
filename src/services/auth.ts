import { API_DOMAIN_PREFIX, request } from './request'

const API_PREFIX = '/api/login'

export const AuthAPI = {
  login: (data: LoginDto) =>
    request<LoginVo>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/LoginIn`,
      method: 'POST',
      data
    })
}

interface LoginDto {
  js_code: string
  phoneCode: string
}

interface LoginVo {
  token: string
  token_user: {
    UserId: string
    UserCode: string
    UserName: string
    UserStatus: string
    UserIoc: string
    Parm01: string
    Parm02: string
    Parm03: string
  }
}
