import { NewAPI, type NewVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useNewDetailStore = defineStore('new-detail', () => {
  const detail = ref<Partial<NewVo>>({})

  const isLoading = ref(false)

  async function getDetail(id: string) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await NewAPI.detail(id)
      detail.value = { ...data }
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, detail, getDetail }
})
