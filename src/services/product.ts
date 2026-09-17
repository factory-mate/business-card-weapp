import type { FileVo } from './file'
import type { FullPageDto } from './page'
import type { ProductTagVo } from './product-tag'
import { API_DOMAIN_PREFIX, request } from './request'

const API_PREFIX = '/api/fm_product'

export const ProductAPI = {
  list: (data: ProductListDto) =>
    request<ProductVo[]>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetForList`,
      method: 'POST',
      data
    }),
  detail: (val: string) =>
    request<ProductVo>({
      url: `${API_DOMAIN_PREFIX}${API_PREFIX}/GetById`,
      method: 'GET',
      data: {
        val
      }
    })
}

export interface ProductVo {
  list_file: FileVo[]
  list_lable: ProductTagVo[]
  cCompanyCode: string
  cTitle: string
  cProfile: string
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

export interface ProductListDto extends FullPageDto {
  list_uid: string[]
}
