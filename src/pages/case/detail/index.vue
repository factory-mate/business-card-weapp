<script setup lang="ts">
import { useCaseDetailStore, useCurrentCardStore } from '@/stores'
import { getFileUrl } from '@/utils'
import { onLoad, onShareAppMessage, onShow } from 'wevu'

definePageJson({
  navigationBarTitleText: '案例详情'
})

const currentCardStore = useCurrentCardStore()
const { detail, getDetail } = useCaseDetailStore()

onLoad((query) => getDetail(query.id!))

onShow(() => currentCardStore.getDetail(currentCardStore.currentId.value))

onShareAppMessage(() => ({
  title: `${detail.value.cTitle}`,
  path: `/pages/case/detail/index?id=${currentCardStore.currentId.value}`
}))
</script>

<template>
  <view class="p-[32rpx] h-[calc(100vh-200)]">
    <view class="flex flex-col">
      <text class="text-2xl font-semibold">{{ detail.cTitle }}</text>
      <text class="text-[#999999] text-xs">{{ detail.dCreateTime }}</text>
      <image
        class="mt-2 w-full"
        mode="widthFix"
        :src="detail.list_file?.[0] && (getFileUrl(detail.list_file[0]) ?? '')"
      />
      <!-- <view class="flex mt-2 text-xs text-[#999999]">
        <text class="me-2">查看 23</text>
        <text>分享 3</text>
      </view> -->
      <text class="mt-2 text-sm">{{ detail.cDetail }}</text>
    </view>

    <share-area />
  </view>
</template>
