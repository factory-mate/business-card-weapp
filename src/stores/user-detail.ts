import { UserAPI, type UserVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useUserDetailStore = defineStore('user-detail', () => {
  const detail = ref<Partial<UserVo>>({})

  const isLoading = ref(false)

  async function getDetail(id: string) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await UserAPI.detail(id)
      detail.value = { ...data, desc: data.cCompanyIntroduce.split(/\\n|\n/) }
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, detail, getDetail }
})
