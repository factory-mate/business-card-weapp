<script setup lang="ts">
import { onLoad, ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '产品详情'
})

const listData = [
  {
    title: '己二酸（AA：Adipic acid）',
    desc: '主要用于制锦纶66(尼龙66)，其次用于制造增塑剂、润滑脂、聚氨酯，少量用作食品的增酸剂和代替酒石酸用于发酵粉，也可用于制造杀虫剂和粘合剂，己二酸还用于医药、香料等生产。目前国内使用量增长较快的行业有合成革用树脂行业、聚氨酯鞋底板树脂行业，聚氨酯胶粘剂及TPU用多元醇行业。',
    src: 'https://www.achemc.com.cn/web/uploadpic/image/20210622/20210622144045_80082.jpg'
  },
  {
    title: '1,6己二醇（1,6HD：1,6-Hexanediol）',
    desc: '主要用于制锦纶66(尼龙66)，其次用于制造增塑剂、润滑脂、聚氨酯，少量用作食品的增酸剂和代替酒石酸用于发酵粉，也可用于制造杀虫剂和粘合剂，己二酸还用于医药、香料等生产。目前国内使用量增长较快的行业有合成革用树脂行业、聚氨酯鞋底板树脂行业，聚氨酯胶粘剂及TPU用多元醇行业。',
    src: 'https://www.achemc.com.cn/web/uploadpic/image/20210622/20210622144501_93075.jpg'
  },
  {
    title: '六亚甲基二异氰酸酯（HDI:HexamethyleneDiisocyanate）',
    desc: '主要用于制锦纶66(尼龙66)，其次用于制造增塑剂s润滑脂、聚氨酯，少量用作食品的增酸剂和代替酒石酸用于发酵粉，也可用于制造杀虫剂和粘合剂，己二酸还用于医药、香料等生产。目前国内使用量增长较快的行业有合成革用树脂行业、聚氨酯鞋底板树脂行业，聚氨酯胶粘剂及TPU用多元醇行业。',
    src: 'https://www.achemc.com.cn/web/uploadpic/image/20210622/20210622145303_65645.jpg'
  }
]

const detailData = ref<{ title?: string; desc?: string; src?: string }>({})

onLoad((query) => {
  const id = query.id
  detailData.value = listData.find((item) => item.title === id) ?? {}
})
</script>

<template>
  <view class="p-[32rpx]">
    <view class="flex flex-col">
      <image
        class="w-full"
        mode="widthFix"
        :src="detailData.src"
      />
      <text class="text-xl font-semibold mt-2">{{ detailData.title }}</text>
      <view class="flex mt-2 text-xs text-[#999999]">
        <text class="me-2">查看 23</text>
        <text>分享 3</text>
      </view>
      <text class="text-xs mt-2">{{ detailData.desc }}</text>
    </view>
  </view>
</template>
