<script setup lang="ts">
import type { ProductVo } from '@/services'
import { useCurrentCardStore, useProductListStore } from '@/stores'
import { getFileUrl, queryBuilder } from '@/utils'
import { onShow } from 'wevu'

definePageJson({
  navigationBarTitleText: '产品'
})

const { listData, getList } = useProductListStore()
const { detail } = useCurrentCardStore()

const navToDetail = (id: string) =>
  wx.navigateTo({
    url: `/pages/product/detail/index?id=${id}`
  })

onShow(() => {
  getList({
    conditions: queryBuilder<ProductVo>([
      { key: 'cCompanyCode', type: 'eq', val: detail.value.cCompanyCode }
    ])
  })
})
</script>

<template>
  <view class="p-[32rpx]">
    <view
      v-if="!listData.length"
      class="w-full flex justify-center items-center"
    >
      <text>暂无数据</text>
    </view>
    <view
      class="bg-white mb-2 rounded-[14rpx] bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
      v-for="(item, index) in listData"
      :key="index"
    >
      <view
        class="flex"
        @tap="navToDetail(item.UID)"
      >
        <image
          class="h-[200rpx] w-[140rpx]"
          :src="item.list_file?.[0] && (getFileUrl(item.list_file[0]) ?? '')"
        />
        <view class="ml-1.5 flex h-[200rpx] flex-1 flex-col overflow-hidden">
          <text class="text-sm">{{ item.cTitle }}</text>
          <text class="text-xs text-[#999999]">{{ item.cProfile }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
