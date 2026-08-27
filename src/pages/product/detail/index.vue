<script setup lang="ts">
import { useProductDetailStore } from '@/stores'
import { getFileUrl } from '@/utils'
import { onLoad } from 'wevu'

definePageJson({
  navigationBarTitleText: '产品详情'
})

onLoad((query) => {
  getDetail(query.id!)
})

const { detail, getDetail } = useProductDetailStore()

const previewImage = ({ index }: { index: number }) => {
  if (!detail.value.list_file?.length) {
    return
  }

  const urls = detail.value.list_file.map((i) => getFileUrl(i) ?? '')

  wx.previewImage({
    current: urls.at(index),
    urls
  })
}
</script>

<template>
  <view class="p-[32rpx]">
    <view class="flex flex-col">
      <t-swiper
        height="400"
        :navigation="{ type: 'fraction' }"
        pagination-position="bottom-right"
        :list="(detail.list_file ?? []).map((i) => getFileUrl(i))"
        @click="previewImage"
      >
      </t-swiper>
      <text class="text-xl font-semibold mt-2">{{ detail.cTitle }}</text>
      <!-- <view class="flex mt-2 text-xs text-[#999999]">
        <text class="me-2">查看 23</text>
        <text>分享 3</text>
      </view> -->
      <text class="text-xs mt-2">{{ detail.cProfile }}</text>
    </view>
  </view>
</template>
