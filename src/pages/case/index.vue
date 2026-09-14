<script setup lang="ts">
import type { CaseVo } from '@/services'
import { useCaseListStore, useCurrentCardStore } from '@/stores'
import { getFileUrl, queryBuilder } from '@/utils'
import { onShow } from 'wevu'

definePageJson({
  navigationBarTitleText: '案例'
})

const { listData, getList } = useCaseListStore()
const { detail } = useCurrentCardStore()

const navToDetail = (id: string) =>
  wx.navigateTo({
    url: `/pages/case/detail/index?id=${id}`
  })

onShow(() => {
  getList({
    conditions: queryBuilder<CaseVo>([
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
        class="flex flex-col"
        @tap="navToDetail(item.UID)"
      >
        <text class="text-sm">{{ item.cTitle }}</text>
        <image
          class="mt-4 w-full"
          mode="widthFix"
          :src="item.list_file?.[0] && (getFileUrl(item.list_file[0]) ?? '')"
        />
      </view>
    </view>
  </view>
</template>
