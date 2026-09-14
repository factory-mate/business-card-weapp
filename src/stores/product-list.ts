import { ProductAPI, type FullPageDto, type ProductVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useProductListStore = defineStore('product-list', () => {
  const listData = ref<ProductVo[]>([])

  const isLoading = ref(false)

  async function getList(params: FullPageDto) {
    listData.value = []
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await ProductAPI.list(params)
      listData.value = [...data]
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, listData, getList }
})
