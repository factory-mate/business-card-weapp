import { DEFAULT_USER_UID } from '@/constants'
import { UserAPI, type UserVo } from '@/services'
import { defineStore, ref } from 'wevu'

export const useCardListStore = defineStore('card-list', () => {
  const cardList = ref<UserVo[]>([])

  const currentId = ref<string>('')

  const resetCardList = async () => {
    cardList.value = []
    try {
      const { data } = await UserAPI.detail(DEFAULT_USER_UID)
      cardList.value.push(data)
      wx.setStorageSync('card-list', JSON.stringify(cardList.value))
      wx.setStorageSync('current-id', data.UID)
    } catch {
      //
    }
  }

  const initCardList = () => {
    cardList.value = JSON.parse(wx.getStorageSync('card-list'))
    currentId.value = wx.getStorageSync('current-id')
  }

  const addCardItem = async (id: string) => {
    if (cardList.value.some((i) => i.UID === id)) {
      return
    }
    try {
      const { data } = await UserAPI.detail(id)
      cardList.value.unshift(data)
      wx.setStorageSync('card-list', JSON.stringify(cardList.value))
    } catch {
      //
    }
  }

  const removeCardItem = (id: string) => {
    cardList.value = cardList.value.filter((i) => i.UID !== id)
    wx.setStorageSync('card-list', JSON.stringify(cardList.value))
  }

  const setCurrentId = (id: string) => {
    currentId.value = id
    wx.setStorageSync('current-id', id)
  }

  return {
    cardList,
    currentId,
    resetCardList,
    addCardItem,
    removeCardItem,
    initCardList,
    setCurrentId
  }
})
