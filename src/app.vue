<script setup lang="ts">
import { onLaunch } from 'wevu'
import { useCardListStore } from './stores'

const { cardList, resetCardList, initCardList } = useCardListStore()

defineAppJson({
  pages: [
    'pages/index/index',
    'pages/product/index',
    'pages/product/detail/index',
    'pages/case/index',
    'pages/case/detail/index',
    'pages/my/index',
    'pages/my/privacy/index',
    'pages/my/card-list/index'
  ],
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
    color: '#999999',
    selectedColor: '#0078d7',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '名片',
        iconPath: 'assets/tabbar/card.png',
        selectedIconPath: 'assets/tabbar/card_selected.png'
      },
      {
        pagePath: 'pages/product/index',
        text: '产品',
        iconPath: 'assets/tabbar/product.png',
        selectedIconPath: 'assets/tabbar/product_selected.png'
      },
      {
        pagePath: 'pages/case/index',
        text: '案例',
        iconPath: 'assets/tabbar/case.png',
        selectedIconPath: 'assets/tabbar/case_selected.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/tabbar/my.png',
        selectedIconPath: 'assets/tabbar/my_selected.png'
      }
    ]
  }
})

onLaunch(async () => {
  const currentId = wx.getStorageSync('current-id')
  if (!cardList.value.length || !currentId) {
    await resetCardList()
  }
  initCardList()
})
</script>

<style src="./app.css"></style>
