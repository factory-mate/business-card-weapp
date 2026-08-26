<script setup lang="ts">
import { useUserStore } from '@/stores'
import { onShareAppMessage, onShow } from 'wevu'

definePageJson({
  navigationBarTitleText: '名片'
})

const { info, getInfo } = useUserStore()

const saveContact = () =>
  wx.addPhoneContact({
    firstName: info.value.cEmployeeName ?? '',
    mobilePhoneNumber: info.value.cPhone,
    organization: info.value.cCompanyName,
    title: info.value.cPost,
    email: info.value.cEmail,
    workAddressStreet: info.value.cAddress,
    weChatNumber: info.value.cWeName,
    success: () =>
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
  })

const makeCall = () => {
  if (!info.value.cPhone) {
    wx.showToast({ title: '暂未提供联系电话', icon: 'error' })
    return
  }
  wx.makePhoneCall({
    phoneNumber: info.value.cPhone
  })
}

const copyWeChat = () => {
  if (!info.value.cWeName) {
    wx.showToast({ title: '暂未提供联系微信号', icon: 'error' })
    return
  }
  wx.setClipboardData({
    data: info.value.cWeName,
    success: () => {
      wx.showModal({
        title: '微信号已复制',
        content: `已成功复制微信号: ${info.value.cWeName}\n请在微信搜索框中粘贴并添加好友`,
        showCancel: false
      })
    }
  })
}

const openMap = () => {
  if (!info.value.cAddress) {
    wx.showToast({ title: '暂未提供地址', icon: 'error' })
    return
  }
  wx.openLocation({
    latitude: 31.22114,
    longitude: 121.35339,
    name: info.value.cCompanyName,
    address: info.value.cAddress
  })
}

onShareAppMessage(() => ({
  title: `${info.value.cEmployeeName}的名片`,
  path: '/pages/index/index'
}))

onShow(async () => {
  const token = wx.getStorageSync('token')
  const user = wx.getStorageSync('user')
  if (token) {
    await getInfo(user.UserId)
    wx.setNavigationBarTitle({
      title: `${info.value.cEmployeeName}的名片`
    })
  }
})
</script>

<template>
  <view class="min-h-screen bg-[#f6f7fb] p-[32rpx]">
    <view
      :style="{
        backgroundImage: `url(https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/card_bg.jpg)`
      }"
      class="rounded-[14rpx] flex flex-col justify-between h-[450rpx] w-full bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
    >
      <view class="flex items-center">
        <image
          class="h-[64rpx] w-[64rpx]"
          :src="info.cLogoUrl"
        />
        <text class="ml-1">{{ info.cCompanyName }}</text>
      </view>
      <view class="my-[50rpx] flex items-center justify-between">
        <view class="flex flex-col items-center shrink-0">
          <text class="text-2xl font-bold">{{ info.cEmployeeName }}</text>
          <text
            v-if="info.cPost"
            class="text-sm text-center"
          >
            {{ info.cPost }}
          </text>
        </view>
        <view class="whitespace-pre-line text-center text-xs flex flex-col items-center">
          <text
            v-for="(t, index) in info.desc"
            :key="index"
          >
            {{ t ?? '' }}
          </text>
        </view>
      </view>
      <view class="flex flex-col space-y-1 text-xs">
        <text v-if="info.cPhone">电话：{{ info.cPhone }}</text>
        <text v-if="info.cEmail">邮箱：{{ info.cEmail }}</text>
        <text v-if="info.cAddress">地址：{{ info.cAddress }}</text>
      </view>
    </view>

    <view
      class="mt-2 bg-white rounded-[14rpx] bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
    >
      <view class="flex">
        <t-button
          open-type="share"
          size="large"
          theme="light"
          variant="outline"
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

    <view class="mt-2">
      <view class="flex flex-wrap">
        <image
          v-for="(item, index) in [
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home1.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home2.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home3.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home4.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home5.png'
          ]"
          :key="index"
          :src="item"
          class="w-full"
          mode="widthFix"
        />
      </view>
    </view>
  </view>
</template>
