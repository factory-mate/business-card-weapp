<script setup lang="ts">
import { useCardListStore, useCurrentCardStore, useUserDetailStore } from '@/stores'
import { onShareAppMessage } from 'wevu'

definePageJson({
  navigationBarTitleText: '名片夹'
})

const { detail } = useUserDetailStore()
const { cardList } = useCardListStore()
const { getDetail, setCurrentId, currentId } = useCurrentCardStore()

const handleClickItem = (id: string) => {
  setCurrentId(id)
  getDetail(id)
}

const makeCall = (phoneNumber: string) => {
  if (!phoneNumber) {
    wx.showToast({ title: '暂未提供联系电话', icon: 'error' })
    return
  }
  wx.makePhoneCall({ phoneNumber })
}

onShareAppMessage((res) => {
  if (res.from === 'button' && res.target?.dataset?.custom?.UID) {
    const { UID, cEmployeeName } = res.target.dataset.custom
    return {
      title: cEmployeeName ? `${cEmployeeName}的名片` : '名片分享',
      path: `/pages/index/index?id=${UID || ''}`
    }
  }

  const currentName = cardList.value.find((i) => i.UID === currentId.value)?.cEmployeeName

  return {
    title: currentName ? `${currentName}的名片` : '名片分享',
    path: `/pages/index/index?id=${currentId.value}`
  }
})
</script>

<template>
  <view class="p-[32rpx]">
    <view
      v-if="!cardList.length"
      class="w-full flex justify-center items-center"
    >
      <text>暂无数据</text>
    </view>
    <view
      class="bg-white mb-2 relative rounded-[14rpx] bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
      v-for="(item, index) in cardList"
      :key="index"
    >
      <view
        class="flex flex-col"
        @tap="handleClickItem(item.UID)"
      >
        <view class="flex items-center">
          <view class="flex items-center">
            <image
              class="h-[40rpx] w-[40rpx]"
              :src="item.cLogoUrl"
            />
            <text class="text-sm ml-1">{{ item.cCompanyName ?? '' }}</text>
          </view>
        </view>
        <view class="absolute right-[20rpx] top-[20rpx]">
          <t-tag
            v-if="currentId === item.UID"
            variant="light"
            theme="primary"
            size="small"
          >
            当前访问
          </t-tag>
          <t-tag
            v-if="detail.UID === item.UID"
            class="ml-1"
            variant="light"
            theme="warning"
            size="small"
          >
            我的名片
          </t-tag>
        </view>
        <view class="flex mt-2">
          <image
            class="h-[150rpx] w-[135rpx] rounded-md"
            :src="item.cUrl"
          />
          <view class="flex flex-col ml-2">
            <view>
              <text class="font-semibold">{{ item.cEmployeeName ?? '' }}</text>
              <text class="text-[#999999] text-xs ml-1">{{ item.cPost ?? '' }}</text>
            </view>
            <text class="text-xs">{{ item.cPhone ?? '' }}</text>
          </view>
        </view>
      </view>
      <!-- <view class="flex items-center mt-2">
        <t-button
          class="mr-2!"
          theme="light"
          icon="call"
          @tap="makeCall(item.cPhone)"
        >
          拨打电话
        </t-button>
        <t-button
          open-type="share"
          theme="light"
          icon="share"
          :custom-dataset="item"
        >
          转发名片
        </t-button>
      </view> -->
    </view>
  </view>
</template>
