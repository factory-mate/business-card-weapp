import type { FileVo } from './file'
import type { FullPageDto } from './page'
import { API_DOMAIN_PREFIX, request } from './request'

const API_PREFIX = '/api/fm_news'

export const NewAPI = {
  list: (data: FullPageDto) =>
    request<NewVo[]>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetForList`,
      method: 'GET',
      data
    }),
  detail: (val: string) =>
    request<NewVo>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetById`,
      method: 'GET',
      data: {
        val
      }
    })
}

export interface NewVo {
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
