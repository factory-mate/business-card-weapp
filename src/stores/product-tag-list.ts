import { ProductTagAPI, type FullPageDto, type ProductTagVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useProductTagListStore = defineStore('product-tag-list', () => {
  const listData = ref<ProductTagVo[]>([])

  const isLoading = ref(false)

  async function getList(params: FullPageDto) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await ProductTagAPI.list(params)
      listData.value = [...data]
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, listData, getList }
})
