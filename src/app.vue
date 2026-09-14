<script setup lang="ts">
import { onLaunch, storeToRefs } from 'wevu'
import { useCardListStore, useCurrentCardStore } from './stores'

const cardListStore = useCardListStore()
const currentCardStore = useCurrentCardStore()
const { cardList } = storeToRefs(cardListStore)
const { currentId, detail } = storeToRefs(currentCardStore)

defineAppJson({
  pages: [
    'pages/index/index',
    'pages/product/index',
    'pages/product/detail/index',
    'pages/case/index',
    'pages/case/detail/index',
    'pages/website/index',
    'pages/my/index',
    'pages/my/privacy/index',
    'pages/my/card-list/index'
  ],
  usingComponents: {
    'user-card': '/components/user-card/index',
    'share-area': '/components/share-area/index'
  },
  window: {
    navigationBarTitleText: '慧友名片',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    backgroundTextStyle: 'light',
    backgroundColor: '#f6f7fb'
  },
  style: 'v2',
  sitemapLocation: 'sitemap.json',
  tabBar: {
    color: '#595959',
    selectedColor: '#0078d7',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '名片',
        iconPath: 'assets/tabbar/LucideIdCard.png',
        selectedIconPath: 'assets/tabbar/LucideIdCard_Selected.png'
      },
      {
        pagePath: 'pages/product/index',
        text: '产品',
        iconPath: 'assets/tabbar/LucideBox.png',
        selectedIconPath: 'assets/tabbar/LucideBox_Selected.png'
      },
      {
        pagePath: 'pages/case/index',
        text: '案例',
        iconPath: 'assets/tabbar/LucideBookText.png',
        selectedIconPath: 'assets/tabbar/LucideBookText_Selected.png'
      },
      {
        pagePath: 'pages/website/index',
        text: '官网',
        iconPath: 'assets/tabbar/LucidePaperclip.png',
        selectedIconPath: 'assets/tabbar/LucidePaperclip_Selected.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/tabbar/LucideCircleUserRound.png',
        selectedIconPath: 'assets/tabbar/LucideCircleUserRound_Selected.png'
      }
    ]
  }
})

onLaunch(async () => {
  try {
    cardList.value = JSON.parse(wx.getStorageSync('card-list'))
  } catch {
    cardList.value = []
  }
  currentId.value = wx.getStorageSync('current-id')
  if (!cardList.value.length || !currentId.value) {
    const data = (await cardListStore.resetCardList()) ?? {}
    detail.value = data
  }
})
</script>

<style src="./app.css"></style>
