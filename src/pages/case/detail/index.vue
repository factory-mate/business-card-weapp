<script setup lang="ts">
import { onLoad, ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '案例详情'
})

const listData = [
  {
    title: '启超业绩',
    src: 'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/case1.png'
  },
  {
    title: '启超合作伙伴',
    src: 'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/case2.png'
  },
  {
    title: '案例展示',
    src: 'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/case3.png'
  }
]

const detailData = ref<{ title?: string; src?: string }>({})

onLoad((query) => {
  const id = query.id
  detailData.value = listData.find((item) => item.title === id) ?? {}
})
</script>

<template>
  <view class="p-[32rpx]">
    <view class="flex flex-col">
      <text class="text-2xl font-semibold">{{ detailData.title }}</text>
      <text class="text-[#999999] text-xs">2026-08-10 16:42:32</text>
      <image
        class="mt-2 w-full"
        mode="widthFix"
        :src="detailData.src"
      />
      <view class="flex mt-2 text-xs text-[#999999]">
        <text class="me-2">查看 23</text>
        <text>分享 3</text>
      </view>
    </view>
  </view>
</template>
