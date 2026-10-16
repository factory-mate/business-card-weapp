<script setup lang="ts">
import { ref } from 'wevu'
import emailIcon from '@/assets/card/MaterialSymbolsAlternateEmailRounded.png'
import phoneIcon from '@/assets/card/MaterialSymbolsCall.png'
import deskPhoneIcon from '@/assets/card/MaterialSymbolsDeskphone.png'
import linkIcon from '@/assets/card/MaterialSymbolsLink2Rounded.png'
import locationIcon from '@/assets/card/MaterialSymbolsLocationOnRounded.png'

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
  cCompanyNameEn?: string
  cLandline?: string
  cWebsiteUrl?: string
  cAddressEn?: string
  cCompanyIntroduceEn?: string
  cDepartment?: string
  cDepartmentEn?: string
  cEmployeeNameEn?: string
  cPostEn?: string
}

const props = withDefaults(
  defineProps<{
    detail?: Detail
    lang?: string
  }>(),
  {
    detail: () => ({
      cCompanyName: '',
      cEmployeeName: '',
      cPost: '',
      cCompanyIntroduce: '',
      cPhone: '',
      cEmail: '',
      cAddress: '',
      cCompanyNameEn: '',
      cLandline: '',
      cWebsiteUrl: '',
      cCompanyIntroduceEn: '',
      cDepartment: '',
      cDepartmentEn: '',
      cEmployeeNameEn: '',
      cPostEn: ''
    }),
    lang: () => ''
  }
)

const emit = defineEmits<{
  toggle: []
}>()

const onTapItem = () => emit('toggle')
</script>

<template>
  <view
    :style="{
      backgroundImage: `url(${detail.cBgUrl})`
    }"
    class="relative overflow-hidden rounded-[14rpx] flex flex-col justify-between h-[450rpx] w-full bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
    @tap="onTapItem"
  >
    <view
      class="pointer-events-none absolute right-0 top-0 z-10 flex items-end justify-end bg-[#0078d7] shadow-md"
      style="width: 80rpx; height: 80rpx; clip-path: polygon(100% 0, 100% 100%, 0 0)"
    />
    <view class="absolute right-1 top-1 z-20 text-xs font-bold uppercase text-white">
      {{ lang }}
    </view>
    <template v-if="lang === 'CN'">
      <view class="flex items-center">
        <image
          class="h-[64rpx] w-[64rpx]"
          :src="detail.cLogoUrl"
        />
        <text class="ml-1">
          {{ detail.cCompanyName ?? '' }}
        </text>
      </view>
      <view class="my-[20rpx] flex items-center justify-between">
        <view class="flex max-w-[50%] flex-col items-center shrink-0 space-y-0.5">
          <text class="text-2xl font-bold">{{ detail.cEmployeeName ?? '' }}</text>
          <text
            v-if="detail.cDepartment"
            class="text-xs text-center tracking-tight"
          >
            {{ detail.cDepartment ?? '' }}
          </text>
          <text
            v-if="detail.cPost"
            class="text-xs text-center font-bold"
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
      <view class="flex flex-col space-y-0.5 text-[10px] leading-3 tracking-tight">
        <view class="space-x-2 flex">
          <view v-if="detail.cPhone">
            <image
              :src="phoneIcon"
              class="me-0.5 mt-px inline-block size-3 align-text-top"
            />
            <text>{{ detail.cPhone ?? '' }}</text>
          </view>
          <view v-if="detail.cLandline">
            <image
              :src="deskPhoneIcon"
              class="me-0.5 mt-px inline-block size-3 align-text-top"
            />
            <text>{{ detail.cLandline ?? '' }}</text>
          </view>
        </view>
        <view v-if="detail.cEmail">
          <image
            :src="emailIcon"
            class="me-0.5 mt-px inline-block size-3 align-text-top"
          />
          <text>{{ detail.cEmail ?? '' }}</text>
        </view>
        <view v-if="detail.cWebsiteUrl">
          <image
            :src="linkIcon"
            class="me-0.5 mt-px inline-block size-3 align-text-top"
          />
          <text>{{ detail.cWebsiteUrl ?? '' }}</text>
        </view>
        <view v-if="detail.cAddress">
          <image
            :src="locationIcon"
            class="me-0.5 mt-px inline-block size-3 align-text-top"
          />
          <text>{{ detail.cAddress ?? '' }}</text>
        </view>
      </view>
    </template>

    <template v-if="lang === 'EN'">
      <view class="flex items-center">
        <image
          class="h-[64rpx] w-[64rpx]"
          :src="detail.cLogoUrl"
        />
        <text class="ml-1 text-sm tracking-tight">
          {{ detail.cCompanyNameEn ?? '' }}
        </text>
      </view>
      <view class="my-[20rpx] flex items-center justify-between">
        <view class="flex max-w-[50%] flex-col items-center shrink-0 space-y-0.5">
          <text class="text-xl font-bold">{{ detail.cEmployeeNameEn ?? '' }}</text>
          <text
            v-if="detail.cDepartmentEn"
            class="text-[10px] leading-3 text-center tracking-tight"
          >
            {{ detail.cDepartmentEn ?? '' }}
          </text>
          <text
            v-if="detail.cPostEn"
            class="text-[10px] leading-3 text-center font-bold"
          >
            {{ detail.cPostEn ?? '' }}
          </text>
        </view>
        <view
          class="whitespace-pre-line text-center text-[10px] leading-3 flex flex-col items-center"
        >
          <text
            v-for="(t, index) in (detail.cCompanyIntroduceEn ?? '').split(/\\n|\n/)"
            :key="index"
          >
            {{ t ?? '' }}
          </text>
        </view>
      </view>
      <view class="flex flex-col space-y-0.5 text-[10px] leading-3 tracking-tight">
        <view class="space-x-2 flex">
          <view v-if="detail.cPhone">
            <image
              :src="phoneIcon"
              class="me-0.5 mt-px inline-block size-3 align-text-top"
            />
            <text>{{ detail.cPhone ?? '' }}</text>
          </view>
          <view v-if="detail.cLandline">
            <image
              :src="deskPhoneIcon"
              class="me-0.5 mt-px inline-block size-3 align-text-top"
            />
            <text>{{ detail.cLandline ?? '' }}</text>
          </view>
        </view>
        <view v-if="detail.cEmail">
          <image
            :src="emailIcon"
            class="me-0.5 mt-px inline-block size-3 align-text-top"
          />
          <text>{{ detail.cEmail ?? '' }}</text>
        </view>
        <view v-if="detail.cWebsiteUrl">
          <image
            :src="linkIcon"
            class="me-0.5 mt-px inline-block size-3 align-text-top"
          />
          <text>{{ detail.cWebsiteUrl ?? '' }}</text>
        </view>
        <view v-if="detail.cAddress">
          <image
            :src="locationIcon"
            class="me-0.5 mt-px inline-block size-3 align-text-top"
          />
          <text>{{ detail.cAddressEn ?? '' }}</text>
        </view>
      </view>
    </template>
  </view>
</template>
