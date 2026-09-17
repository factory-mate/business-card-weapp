import { CaseAPI, type CaseVo, type FullPageDto } from '@/services'
import { defineStore, ref } from 'wevu'

export const useCaseListStore = defineStore('case-list', () => {
  const listData = ref<CaseVo[]>([])

  const isLoading = ref(false)

  async function getList(params: FullPageDto) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await CaseAPI.list(params)
      listData.value = [...data]
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, listData, getList }
})
