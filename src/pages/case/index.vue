<script setup lang="ts">
import { ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '案例'
})

const listData = ref([
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
])

const navToDetail = (id: string) =>
  wx.navigateTo({
    url: `/pages/case/detail/index?id=${id}`
  })
</script>

<template>
  <view class="p-[32rpx]">
    <view
      class="bg-white mb-2 rounded-[14rpx] bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
      v-for="(item, index) in listData"
      :key="index"
    >
      <view
        class="flex flex-col"
        @tap="navToDetail(item.title)"
      >
        <text class="text-sm">{{ item.title }}</text>
        <image
          class="mt-4 w-full"
          mode="widthFix"
          :src="item.src"
        />
      </view>
    </view>
  </view>
</template>
