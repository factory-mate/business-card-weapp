<script setup lang="ts">
import { ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '我的'
})

const info = ref({
  avatarUrl: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
  username: '袁红霞'
})

const navToPrivacy = () => {
  wx.navigateTo({
    url: '/pages/my/privacy/index'
  })
}
</script>

<template>
  <view class="page">
    <view class="flex items-center space-x-2">
      <t-avatar
        :image="info.avatarUrl"
        size="large"
      />
      <text class="text-[48rpx]">{{ info.username }}</text>
    </view>
    <view class="mt-4">
      <t-cell-group
        theme="card"
        class="mx-0!"
      >
        <t-cell
          title="名片夹"
          leftIcon="verify"
          hover
          arrow
        />
        <t-cell
          title="隐私政策"
          leftIcon="info-circle"
          hover
          arrow
          @tap="navToPrivacy"
        />
      </t-cell-group>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 32rpx;
}
</style>
