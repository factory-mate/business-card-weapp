<script setup lang="ts">
import { AuthAPI } from '@/services'
import { useUserStore } from '@/stores'
import { onShow, ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '我的'
})

const isLogin = ref(false)
const version = ref('')

const { info, getInfo } = useUserStore()

const handleLogin = async (e: any) => {
  if (e.detail.errMsg !== 'getPhoneNumber:ok') {
    wx.showToast({ title: '已取消授权', icon: 'none' })
    return
  }
  console.log(e)
  const phoneCode = e.detail.code
  wx.showLoading({ title: '加载中' })
  try {
    const { code: js_code } = await wx.login()
    const { data } = await AuthAPI.login({
      js_code,
      phoneCode
    })
    wx.setStorageSync('token', data.token)
    wx.setStorageSync('user', data.token_user)
    isLogin.value = true
  } catch {
    //
  }
  wx.showToast({ title: '登录成功', icon: 'success' })
  wx.hideLoading()
}

const navToPrivacy = () => {
  wx.navigateTo({
    url: '/pages/my/privacy/index'
  })
}

const handleLogout = () => {
  isLogin.value = false
  wx.removeStorageSync('token')
  wx.removeStorageSync('user')
}

onShow(() => {
  const token = wx.getStorageSync('token')
  const user = wx.getStorageSync('user')
  isLogin.value = !!token
  if (wx.getAccountInfoSync().miniProgram.version) {
    version.value = `v${wx.getAccountInfoSync().miniProgram.version!}`
  } else {
    version.value = 'v0.0.1'
  }
  if (isLogin.value) {
    getInfo(user.UserId)
  }
})
</script>

<template>
  <view class="page">
    <view
      v-if="isLogin"
      class="flex items-center space-x-2 mb-4"
    >
      <t-avatar
        :image="info.cUrl"
        size="large"
      />
      <text class="text-[48rpx]">{{ info.cEmployeeName }}</text>
    </view>
    <view>
      <t-cell-group
        theme="card"
        class="mx-0!"
      >
        <button
          v-if="!isLogin"
          class="w-full! p-0 m-0!"
          open-type="getPhoneNumber"
          @getphonenumber="handleLogin"
        >
          <t-cell
            v-if="!isLogin"
            class="w-full"
            title="登录"
            leftIcon="login"
            hover
            arrow
          />
        </button>
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
        <t-cell
          title="版本信息"
          :note="version"
          leftIcon="app"
          hover
        />
        <t-cell
          v-if="isLogin"
          title="退出登录"
          leftIcon="poweroff"
          hover
          arrow
          @tap="handleLogout"
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
