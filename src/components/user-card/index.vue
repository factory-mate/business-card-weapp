<script setup lang="ts">
export interface Detail {
  cCompanyName?: string
  cLogoUrl?: string
  cBgUrl?: string
  cEmployeeName?: string
  cPost?: string
  cCompanyIntroduce?: string
  cPhone?: string
  cEmail?: string
  cAddress?: string
}

const props = withDefaults(
  defineProps<{
    detail?: Detail
  }>(),
  {
    detail: () => ({
      cCompanyName: '',
      cEmployeeName: '',
      cPost: '',
      cCompanyIntroduce: '',
      cPhone: '',
      cEmail: '',
      cAddress: ''
    })
  }
)
</script>

<template>
  <view
    :style="{
      backgroundImage: `url(${detail.cBgUrl})`
    }"
    class="rounded-[14rpx] flex flex-col justify-between h-[450rpx] w-full bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
  >
    <view class="flex items-center">
      <image
        class="h-[64rpx] w-[64rpx]"
        :src="detail.cLogoUrl"
      />
      <text class="ml-1">
        {{ detail.cCompanyName ?? '' }}
      </text>
    </view>
    <view class="my-[50rpx] flex items-center justify-between">
      <view class="flex flex-col items-center shrink-0">
        <text class="text-2xl font-bold">{{ detail.cEmployeeName ?? '' }}</text>
        <text
          v-if="detail.cPost"
          class="text-sm text-center"
        >
          {{ detail.cPost ?? '' }}
        </text>
      </view>
      <view class="whitespace-pre-line text-center text-xs flex flex-col items-center">
        <text
          v-for="(t, index) in (detail.cCompanyIntroduce ?? '').split(/\\n|\n/)"
          :key="index"
        >
          {{ t ?? '' }}
        </text>
      </view>
    </view>
    <view class="flex flex-col space-y-1 text-xs">
      <text v-if="detail.cPhone">电话：{{ detail.cPhone ?? '' }}</text>
      <text v-if="detail.cEmail">邮箱：{{ detail.cEmail ?? '' }}</text>
      <text v-if="detail.cAddress">地址：{{ detail.cAddress ?? '' }}</text>
    </view>
  </view>
</template>
