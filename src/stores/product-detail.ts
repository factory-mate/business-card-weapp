import { ProductAPI, type ProductVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useProductDetailStore = defineStore('product-detail', () => {
  const detail = ref<Partial<ProductVo>>({})

  const isLoading = ref(false)

  async function getDetail(id: string) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await ProductAPI.detail(id)
      detail.value = { ...data }
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, detail, getDetail }
})
