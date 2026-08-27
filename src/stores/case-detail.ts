import { CaseAPI, type CaseVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useCaseDetailStore = defineStore('case-detail', () => {
  const detail = ref<Partial<CaseVo>>({})

  const isLoading = ref(false)

  async function getDetail(id: string) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await CaseAPI.detail(id)
      detail.value = { ...data }
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, detail, getDetail }
})
