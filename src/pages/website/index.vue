<script setup lang="ts">
import { useCurrentCardStore } from '@/stores'
import { storeToRefs } from 'wevu'

definePageJson({
  navigationBarTitleText: '官网'
})

const currentCardStore = useCurrentCardStore()
const { detail } = storeToRefs(currentCardStore)
</script>

<template>
  <view class="p-[32rpx]">
    <web-view
      :src="detail.cWebsiteUrl"
      class="w-full h-screen"
    />
  </view>
</template>
