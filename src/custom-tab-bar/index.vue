<script setup lang="ts">
import { useCurrentCardStore } from '@/stores'
import { onMounted, ref, storeToRefs } from 'wevu'

interface TabItem {
  pagePath: string
  text: string
  iconPath: string
  selectedIconPath: string
  code: string
}

defineComponentJson({
  component: true
})

const currentCardStore = useCurrentCardStore()
const { detail } = storeToRefs(currentCardStore)

const tabList: TabItem[] = [
  {
    pagePath: 'pages/index/index',
    text: '名片',
    iconPath: '/assets/tabbar/LucideIdCard.png',
    selectedIconPath: '/assets/tabbar/LucideIdCard_Selected.png',
    code: '0'
  },
  {
    pagePath: 'pages/product/index',
    text: '产品',
    iconPath: '/assets/tabbar/LucideBox.png',
    selectedIconPath: '/assets/tabbar/LucideBox_Selected.png',
    code: '1'
  },
  {
    pagePath: 'pages/case/index',
    text: '案例',
    iconPath: '/assets/tabbar/LucideBookText.png',
    selectedIconPath: '/assets/tabbar/LucideBookText_Selected.png',
    code: '2'
  },
  {
    pagePath: 'pages/new/index',
    text: '新闻',
    iconPath: '/assets/tabbar/LucideNewspaper.png',
    selectedIconPath: '/assets/tabbar/LucideNewspaper_Selected.png',
    code: '3'
  },
  {
    pagePath: 'pages/website/index',
    text: '官网',
    iconPath: '/assets/tabbar/LucidePaperclip.png',
    selectedIconPath: '/assets/tabbar/LucidePaperclip_Selected.png',
    code: '4'
  },
  {
    pagePath: 'pages/my/index',
    text: '我的',
    iconPath: '/assets/tabbar/LucideCircleUserRound.png',
    selectedIconPath: '/assets/tabbar/LucideCircleUserRound_Selected.png',
    code: '5'
  }
]

const selected = ref('0')

const switchTab = (index: string, item: TabItem) => {
  if (selected.value === index) {
    return
  }
  wx.switchTab({
    url: `/${item.pagePath}`
  })
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  if (currentPage) {
    const route = currentPage.route
    const item = tabList.find((item) => item.pagePath === route)
    if (item) {
      selected.value = item.code
    }
  }
})
</script>

<template>
  <view
    class="fixed bottom-0 left-0 right-0 z-999 flex h-[96rpx] bg-[#f7f7f7] pb-[env(safe-area-inset-bottom)] box-content border-t-[1rpx] border-black/20"
  >
    <view
      v-for="item in tabList.filter(
        (i) => ['0', '5'].includes(i.code) || (detail.tabbar?.split(',') ?? []).includes(i.code)
      )"
      :key="item.pagePath"
      class="flex flex-1 flex-col items-center justify-center pt-[10rpx] pb-[6rpx]"
      @click="switchTab(item.code, item)"
    >
      <image
        class="h-[54rpx] w-[54rpx] block m-0 p-0"
        mode="aspectFit"
        :src="selected === item.code ? item.selectedIconPath : item.iconPath"
      />
      <text
        class="mt-[4rpx] text-[20rpx] leading-tight select-none"
        :class="selected === item.code ? 'text-[#0078d7]' : 'text-[#595959]'"
      >
        {{ item.text }}
      </text>
    </view>
  </view>
</template>
