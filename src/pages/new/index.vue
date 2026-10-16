<script setup lang="ts">
import type { NewVo } from '@/services'
import { useNewListStore, useCurrentCardStore } from '@/stores'
import { getFileUrl, queryBuilder } from '@/utils'
import { onShow, ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '新闻'
})

const { listData, getList, isLoading } = useNewListStore()
const { detail } = useCurrentCardStore()

const searchValue = ref('')

const navToDetail = (id: string) =>
  wx.navigateTo({
    url: `/pages/new/detail/index?id=${id}`
  })

onShow(() => {
  getList({
    conditions: queryBuilder<NewVo>([
      { key: 'cCompanyCode', type: 'eq', val: detail.value.cCompanyCode }
    ])
  })
})
</script>

<template>
  <view class="p-[32rpx]">
    <t-search
      :value="searchValue"
      class="mb-2"
      placeholder="新闻名称"
      @change="({ value }: any) => (searchValue = value)"
      @clear="({ value }: any) => (searchValue = value)"
    />
    <view
      v-if="
        !listData.filter((i) =>
          i.cTitle.toLowerCase().includes(searchValue.trim().toLocaleLowerCase())
        ).length && !isLoading
      "
      class="w-full flex justify-center items-center"
    >
      <text>暂无数据</text>
    </view>
    <view
      class="bg-white mb-2 rounded-[14rpx] bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
      v-for="(item, index) in listData.filter((i) =>
        i.cTitle.toLowerCase().includes(searchValue.trim().toLocaleLowerCase())
      )"
      :key="index"
    >
      <view
        class="flex flex-col"
        @tap="navToDetail(item.UID)"
      >
        <text class="text-sm">{{ item.cTitle ?? '' }}</text>
        <image
          class="mt-4 w-full"
          mode="widthFix"
          :src="item.list_file?.[0] && (getFileUrl(item.list_file[0]) ?? '')"
        />
      </view>
    </view>
  </view>
</template>
