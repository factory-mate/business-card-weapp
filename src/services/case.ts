import type { FileVo } from './file'
import { API_DOMAIN_PREFIX, request } from './request'
const API_PREFIX = '/api/fm_case'

export const CaseAPI = {
  list: () =>
    request<CaseVo[]>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetForList`,
      method: 'GET'
    }),
  detail: (val: string) =>
    request<CaseVo>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetById`,
      method: 'GET',
      data: {
        val
      }
    })
}

export interface CaseVo {
  list_file: FileVo[]
  cCompanyCode: string
  cTitle: string
  cDetail: string
  cMemo: string
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
