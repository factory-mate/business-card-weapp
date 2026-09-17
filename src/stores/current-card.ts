import { UserAPI, type UserVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useCurrentCardStore = defineStore('current-card', () => {
  const detail = ref<Partial<UserVo>>({})

  const currentId = ref<string>('')

  const isLoading = ref(false)

  async function getDetail(id: string) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await UserAPI.detail(id)
      detail.value = { ...data }
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  const setCurrentId = (id: string) => {
    currentId.value = id
    wx.setStorageSync('current-id', id)
  }

  return {
    isLoading,
    detail,
    currentId,
    getDetail,
    setCurrentId
  }
})
