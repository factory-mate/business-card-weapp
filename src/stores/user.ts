import { UserAPI, type UserVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useUserStore = defineStore('user', () => {
  const info = ref<Partial<UserVo>>({})

  const isLoading = ref(false)

  async function getInfo(id: string) {
    isLoading.value = true
    wx.showLoading({ title: '正在加载数据' })
    try {
      const { data } = await UserAPI.getById(id)
      info.value = { ...data, desc: data.cCompanyIntroduce.split(/\\n|\n/) }
    } catch {
      //
    }
    wx.hideLoading()
    isLoading.value = false
  }

  return { isLoading, info, getInfo }
})
