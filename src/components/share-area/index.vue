<script setup lang="ts">
import { useCurrentCardStore } from '@/stores'
import { ref, storeToRefs } from 'wevu'

const currentCardStore = useCurrentCardStore()
const { detail } = storeToRefs(currentCardStore)

const visible = ref(false)

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

const onVisibleChange = (e: { visible: boolean }) => {
  visible.value = e.visible
}
</script>

<template>
  <view
    class="fixed bottom-0 left-0 right-0 z-50 bg-white px-[32rpx] pt-[20rpx] pb-[calc(20rpx+env(safe-area-inset-bottom))] shadow-[0_-4rpx_16rpx_rgba(0,0,0,0.06)] flex items-center justify-between"
  >
    <view
      class="flex items-center"
      @tap="visible = true"
    >
      <image
        class="h-[64rpx] w-[64rpx] rounded-2xl"
        :src="detail.cUrl"
        mode="aspectFill"
      />
      <view class="flex flex-col items-start ml-2">
        <view>
          <text class="text-sm">
            {{ detail.cEmployeeName }}
          </text>
          <text class="ml-1 text-xs text-[#999999]">
            {{ detail.cPost }}
          </text>
        </view>
        <text class="text-xs text-[#999999]">
          {{ detail.cCompanyName }}
        </text>
      </view>
    </view>
    <view>
      <t-button
        class="w-24!"
        open-type="share"
        size="small"
        theme="light"
        variant="outline"
      >
        分享
      </t-button>
    </view>
  </view>

  <t-popup
    :visible="visible"
    placement="bottom"
    @visible-change="onVisibleChange"
  >
    <view class="p-4">
      <user-card :detail="detail" />

      <view class="mt-2">
        <view class="flex">
          <t-button
            size="large"
            theme="light"
            variant="outline"
            @tap="makeCall"
          >
            拨打电话
          </t-button>
          <t-button
            size="large"
            theme="primary"
            class="ml-2!"
            @tap="copyWeChat"
          >
            添加微信
          </t-button>
        </view>
      </view>
    </view>
  </t-popup>
</template>
