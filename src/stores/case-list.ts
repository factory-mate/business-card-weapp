import { CaseAPI, type CaseVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useCaseListStore = defineStore('case-list', () => {
  const listData = ref<CaseVo[]>([])

  const isLoading = ref(false)

  async function getList() {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await CaseAPI.list()
      listData.value = [...data]
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, listData, getList }
})
