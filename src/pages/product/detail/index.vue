<script setup lang="ts">
import { useCardListStore, useCurrentCardStore, useProductDetailStore } from '@/stores'
import { getFileUrl } from '@/utils'
import { onLoad, onShareAppMessage, onShow } from 'wevu'

definePageJson({
  navigationBarTitleText: '产品详情'
})

const cardListStore = useCardListStore()
const currentCardStore = useCurrentCardStore()
const { detail, getDetail } = useProductDetailStore()

const previewImage = ({ index }: { index: number }) => {
  if (!detail.value.list_file?.length) {
    return
  }

  const urls = detail.value.list_file.map((i) => getFileUrl(i) ?? '')

  wx.previewImage({ current: urls.at(index), urls })
}

onLoad(async (query) => {
  if (query?.userId) {
    currentCardStore.setCurrentId(query.userId)
    cardListStore.addCardItem(query.userId)
  }
  await getDetail(query.id!)
  wx.setNavigationBarTitle({ title: detail.value.cTitle ?? '产品详情' })
})

onShow(() => currentCardStore.getDetail(currentCardStore.currentId.value))

onShareAppMessage(() => ({
  title: `${detail.value.cTitle}`,
  path: `/pages/product/detail/index?id=${detail.value.UID}&userId=${currentCardStore.currentId.value}`
}))
</script>

<template>
  <view class="p-[32rpx]">
    <view class="flex flex-col">
      <text class="text-xl font-semibold mb-1">{{ detail.cTitle ?? '' }}</text>
      <view
        class="mb-2"
        v-if="detail.list_lable?.length"
      >
        <t-tag
          v-for="(item, index) in detail.list_lable"
          :key="index"
          class="mr-1"
        >
          {{ item.cProductLable }}
        </t-tag>
      </view>
      <t-swiper
        class="mb-2"
        height="400"
        :navigation="{ type: 'fraction' }"
        pagination-position="bottom-right"
        :list="(detail.list_file ?? []).map((i) => getFileUrl(i) ?? '')"
        @click="previewImage"
      >
      </t-swiper>
      <!-- <view class="flex mt-2 text-xs text-[#999999]">
        <text class="me-2">查看 23</text>
        <text>分享 3</text>
      </view> -->
      <text class="text-xs">{{ detail.cProfile ?? '' }}</text>
    </view>

    <share-area />
  </view>
</template>
