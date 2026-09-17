<script setup lang="ts">
import type { ProductVo } from '@/services'
import { useCurrentCardStore, useProductListStore, useProductTagListStore } from '@/stores'
import { getFileUrl, queryBuilder } from '@/utils'
import { onShow, ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '产品'
})

const { listData, getList, isLoading } = useProductListStore()
const { listData: tagListData, getList: getTagList } = useProductTagListStore()
const { detail } = useCurrentCardStore()

const searchValue = ref('')
const selectedTags = ref<string[]>([])

const navToDetail = (id: string) =>
  wx.navigateTo({
    url: `/pages/product/detail/index?id=${id}`
  })

const getProductList = () => {
  getList({
    conditions: queryBuilder<ProductVo>([
      { key: 'cCompanyCode', type: 'eq', val: detail.value.cCompanyCode }
    ]),
    list_uid: selectedTags.value
  })
}

const handleSelectTag = (uid: string) => {
  if (selectedTags.value.includes(uid)) {
    selectedTags.value = selectedTags.value.filter((i) => i !== uid)
  } else {
    selectedTags.value.push(uid)
  }
  getProductList()
}

onShow(() => {
  getProductList()
  getTagList({
    conditions: queryBuilder<ProductVo>([
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
      placeholder="产品名称"
      @change="({ value }: any) => (searchValue = value)"
      @clear="({ value }: any) => (searchValue = value)"
    />
    <view
      v-if="tagListData.length"
      class="mb-1 flex flex-wrap"
    >
      <block
        v-for="(item, index) in tagListData"
        :key="index"
      >
        <view @tap="() => handleSelectTag(item.UID)">
          <t-check-tag
            class="mr-1 mb-1"
            :checked="selectedTags.includes(item.UID)"
            :content="item.cProductLable"
          />
        </view>
      </block>
    </view>
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
        class="flex"
        @tap="navToDetail(item.UID)"
      >
        <image
          class="h-[200rpx] w-[140rpx]"
          :src="item.list_file?.[0] && (getFileUrl(item.list_file[0]) ?? '')"
        />
        <view class="ml-1.5 flex h-[200rpx] flex-1 flex-col overflow-hidden">
          <text class="text-sm">{{ item.cTitle ?? '' }}</text>
          <text class="text-xs text-[#999999]">{{ item.cProfile ?? '' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
