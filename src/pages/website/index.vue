<script setup lang="ts">
import { useCurrentCardStore } from '@/stores'
import { storeToRefs } from 'wevu'

definePageJson({
  navigationBarTitleText: '官网',
  navigationStyle: 'custom'
})

const currentCardStore = useCurrentCardStore()
const { detail } = storeToRefs(currentCardStore)
</script>

<template>
  <view class="p-[32rpx] w-screen h-screen">
    <text>123</text>
    <web-view
      v-if="detail.cWebsiteUrl"
      :src="detail.cWebsiteUrl"
      class="w-full h-full"
    />
  </view>
</template>
