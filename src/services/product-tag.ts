import type { FullPageDto } from './page'
import { API_DOMAIN_PREFIX, request } from './request'

const API_PREFIX = '/api/fm_productlable'

export const ProductTagAPI = {
  list: (data: FullPageDto) =>
    request<ProductTagVo[]>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetForList`,
      method: 'GET',
      data
    })
}

export interface ProductTagVo {
  cProductLable: string
  cProductUID: string
  cLableUID: string
  UID: string
  iStatus: number
  cSourceAppType: string
  IsValid: true
  IsDelete: true
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserCode: string
  cModifyUserName: string
  dModifyTime: string
  utfs: string
}
