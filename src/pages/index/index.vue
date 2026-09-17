<script setup lang="ts">
import { useCardListStore, useCurrentCardStore } from '@/stores'
import { onLoad, onShareAppMessage, onShow, storeToRefs } from 'wevu'

definePageJson({
  navigationBarTitleText: '名片'
})

const cardListStore = useCardListStore()
const currentCardStore = useCurrentCardStore()
const { detail } = storeToRefs(currentCardStore)

const saveContact = () =>
  wx.addPhoneContact({
    firstName: detail.value.cEmployeeName ?? '',
    mobilePhoneNumber: detail.value.cPhone,
    organization: detail.value.cCompanyName,
    title: detail.value.cPost,
    email: detail.value.cEmail,
    workAddressStreet: detail.value.cAddress,
    weChatNumber: detail.value.cWeName,
    success: () =>
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
  })

const makeCall = () => {
  if (!detail.value.cPhone) {
    wx.showToast({ title: '暂未提供联系电话', icon: 'error' })
    return
  }
  wx.makePhoneCall({
    phoneNumber: detail.value.cPhone
  })
}

const copyWeChat = () => {
  if (!detail.value.cWeName) {
    wx.showToast({ title: '暂未提供联系微信号', icon: 'error' })
    return
  }
  wx.setClipboardData({
    data: detail.value.cWeName,
    success: () => {
      wx.showModal({
        title: '微信号已复制',
        content: `已成功复制微信号: ${detail.value?.cWeName}\n请在微信搜索框中粘贴并添加好友`,
        showCancel: false
      })
    }
  })
}

const openMap = () => {
  if (!detail.value.cAddress || !detail.value.cLatitude || !detail.value.cLongitude) {
    wx.showToast({ title: '暂未提供地址', icon: 'error' })
    return
  }
  wx.openLocation({
    latitude: detail.value.cLatitude,
    longitude: detail.value.cLongitude,
    name: detail.value.cCompanyName,
    address: detail.value.cAddress
  })
}

onShareAppMessage((res) => {
  if (res.from === 'button' && res.target?.dataset?.custom?.UID) {
    const { UID, cEmployeeName } = res.target.dataset.custom
    return {
      title: cEmployeeName ? `${cEmployeeName}的名片` : '名片分享',
      path: `/pages/index/index?id=${UID || ''}`
    }
  }

  const currentName = cardListStore.cardList.value.find(
    (i) => i.UID === currentCardStore.currentId.value
  )?.cEmployeeName

  return {
    title: currentName ? `${currentName}的名片` : '名片分享',
    path: `/pages/index/index?id=${currentCardStore.currentId.value}`
  }
})

onLoad((query) => {
  if (query?.id) {
    currentCardStore.setCurrentId(query.id)
    cardListStore.addCardItem(query.id)
  }
})

onShow(async () => {
  try {
    await currentCardStore.getDetail(currentCardStore.currentId.value)
  } catch {
    //
  }
  wx.setNavigationBarTitle({
    title: detail.value.cEmployeeName ? `${detail.value.cEmployeeName}的名片` : '名片'
  })
})
</script>

<template>
  <view class="min-h-screen bg-[#f6f7fb] p-[32rpx]">
    <user-card :detail="detail" />

    <view
      class="mt-2 bg-white rounded-[14rpx] bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
    >
      <view class="flex">
        <t-button
          open-type="share"
          size="large"
          theme="light"
          variant="outline"
          :custom-dataset="detail"
        >
          分享该名片
        </t-button>
        <t-button
          size="large"
          theme="primary"
          class="ml-2!"
          @tap="saveContact"
        >
          存入通讯录
        </t-button>
      </view>

      <view class="mt-4 flex justify-between text-xs">
        <view class="flex flex-col">
          <t-button
            theme="primary"
            size="large"
            icon="call"
            shape="circle"
            @tap="makeCall"
          />
          <text class="mt-1">拨打电话</text>
        </view>
        <view class="flex flex-col">
          <t-button
            style="--td-button-default-bg-color: #07c160; --td-button-default-color: #ffffff"
            size="large"
            icon="logo-wechat-stroke-filled"
            shape="circle"
            @tap="copyWeChat"
          />
          <text class="mt-1">添加微信</text>
        </view>
        <view class="flex flex-col">
          <t-button
            theme="primary"
            size="large"
            icon="location-filled"
            shape="circle"
            @tap="openMap"
          />
          <text class="mt-1">查看地址</text>
        </view>
      </view>
    </view>

    <view
      v-for="(item, index) in detail.list_s"
      :key="index"
      class="mt-4 flex flex-wrap"
    >
      <view class="flex justify-center mb-2 w-full">
        <view class="relative inline-block pb-[8rpx] text-center">
          <text class="text-lg font-bold text-gray-900">{{ item.cTitle ?? '' }}</text>
          <view class="absolute bottom-0 left-0 right-0 h-[8rpx] rounded-full bg-[#0078d7]" />
        </view>
      </view>

      <text class="text-xs mb-2">{{ item.cDescription ?? '' }}</text>
      <image
        :src="item.cImgUrl"
        class="w-full"
        mode="widthFix"
      />
    </view>
  </view>
</template>
