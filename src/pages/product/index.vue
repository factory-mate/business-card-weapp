<script setup lang="ts">
import { ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '产品'
})

const listData = ref([
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
    desc: '主要用于制锦纶66(尼龙66)，其次用于制造增塑剂、润滑脂、聚氨酯，少量用作食品的增酸剂和代替酒石酸用于发酵粉，也可用于制造杀虫剂和粘合剂，己二酸还用于医药、香料等生产。目前国内使用量增长较快的行业有合成革用树脂行业、聚氨酯鞋底板树脂行业，聚氨酯胶粘剂及TPU用多元醇行业。',
    src: 'https://www.achemc.com.cn/web/uploadpic/image/20210622/20210622145303_65645.jpg'
  },
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
    desc: '主要用于制锦纶66(尼龙66)，其次用于制造增塑剂、润滑脂、聚氨酯，少量用作食品的增酸剂和代替酒石酸用于发酵粉，也可用于制造杀虫剂和粘合剂，己二酸还用于医药、香料等生产。目前国内使用量增长较快的行业有合成革用树脂行业、聚氨酯鞋底板树脂行业，聚氨酯胶粘剂及TPU用多元醇行业。',
    src: 'https://www.achemc.com.cn/web/uploadpic/image/20210622/20210622145303_65645.jpg'
  },
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
    desc: '主要用于制锦纶66(尼龙66)，其次用于制造增塑剂、润滑脂、聚氨酯，少量用作食品的增酸剂和代替酒石酸用于发酵粉，也可用于制造杀虫剂和粘合剂，己二酸还用于医药、香料等生产。目前国内使用量增长较快的行业有合成革用树脂行业、聚氨酯鞋底板树脂行业，聚氨酯胶粘剂及TPU用多元醇行业。',
    src: 'https://www.achemc.com.cn/web/uploadpic/image/20210622/20210622145303_65645.jpg'
  },
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
    desc: '主要用于制锦纶66(尼龙66)，其次用于制造增塑剂、润滑脂、聚氨酯，少量用作食品的增酸剂和代替酒石酸用于发酵粉，也可用于制造杀虫剂和粘合剂，己二酸还用于医药、香料等生产。目前国内使用量增长较快的行业有合成革用树脂行业、聚氨酯鞋底板树脂行业，聚氨酯胶粘剂及TPU用多元醇行业。',
    src: 'https://www.achemc.com.cn/web/uploadpic/image/20210622/20210622145303_65645.jpg'
  }
])

const navToDetail = (id: string) =>
  wx.navigateTo({
    url: `/pages/product/detail/index?id=${id}`
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
        class="flex"
        @tap="navToDetail(item.title)"
      >
        <image
          class="h-[200rpx] w-[140rpx]"
          :src="item.src"
        />
        <view class="ml-1.5 flex h-[200rpx] flex-1 flex-col overflow-hidden">
          <text class="text-sm">{{ item.title }}</text>
          <text class="text-xs text-[#999999]">{{ item.desc }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
