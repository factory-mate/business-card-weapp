import { NewAPI, type NewVo, type FullPageDto } from '@/services'
import { defineStore, ref } from 'wevu'

export const useNewListStore = defineStore('new-list', () => {
  const listData = ref<NewVo[]>([])

  const isLoading = ref(false)

  async function getList(params: FullPageDto) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await NewAPI.list(params)
      listData.value = [...data]
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, listData, getList }
})
