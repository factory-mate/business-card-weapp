import { API_DOMAIN_PREFIX, request } from './request'

const API_PREFIX = '/api/sys_user'

export const UserAPI = {
  detail: (val: string) =>
    request<UserVo>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetById`,
      method: 'GET',
      data: {
        val
      }
    })
}

export interface UserVo {
  desc: string[]
  cLatitude: number
  cLongitude: number
  cBgUrl: string
  cUrl: string
  cCompanyIntroduce: string
  cAddress: string
  cLogoUrl: string
  cCompanyCode: string
  cCompanyName: string
  cEmployeeCode: string
  cEmployeeName: string
  cPost: string
  cDepartment: string
  cPhone: string
  cEmail: string
  cWeName: string
  cSession_key: string
  cUnionid: string
  cOpenid: string
  cPassword: string
  cCheckCode: string
  IsAdmin: boolean
  UID: string
  iStatus: number
  cSourceAppType: string
  IsValid: boolean
  IsDelete: boolean
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserCode: string
  cModifyUserName: string
  dModifyTime: string
  utfs: string
}
