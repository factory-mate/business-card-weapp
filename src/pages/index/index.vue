<script setup lang="ts">
import { onMounted, onReady, onShareAppMessage, onShow, ref } from 'wevu'

definePageJson({
  navigationBarTitleText: '名片'
})

const shareImgUrl = ref('')

const info = ref({
  companySrc:
    'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/company.webp',
  companyName: '上海沂庆贸易有限公司',
  userName: '袁红霞',
  position: '总经理',
  desc: '专业从事化学品原料贸易的外商投资企业\n专业的化学品解决方案提供者',
  phone: '13761299108',
  email: 'service@achemc.com.cn',
  location: '上海市长宁区金钟路968号6号楼902室',
  wechat: 'Bruce_Song_0920'
})

const saveContact = () =>
  wx.addPhoneContact({
    firstName: info.value.userName,
    mobilePhoneNumber: info.value.phone,
    organization: info.value.companyName,
    title: info.value.position,
    email: info.value.email,
    workAddressStreet: info.value.location,
    weChatNumber: info.value.wechat,
    success: () =>
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
  })

const makeCall = () =>
  wx.makePhoneCall({
    phoneNumber: info.value.phone
  })

const copyWeChat = () =>
  wx.setClipboardData({
    data: info.value.wechat,
    success: () => {
      wx.showModal({
        title: '微信号已复制',
        content: `已成功复制微信号: ${info.value.wechat}\n请在微信搜索框中粘贴并添加好友`,
        showCancel: false
      })
    }
  })

const openMap = () =>
  wx.openLocation({
    latitude: 31.22114,
    longitude: 121.35339,
    name: info.value.companyName,
    address: info.value.location
  })

const createSharePoster = async (): Promise<string> => {
  const SHARE_W = 750
  const SHARE_H = 600
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()

    query
      .select('#shareCanvas')
      .fields({ node: true })
      .exec(async (res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        canvas.width = SHARE_W
        canvas.height = SHARE_H

        const bgImg = canvas.createImage()
        bgImg.src =
          'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/card_bg.jpg'

        await new Promise((r) => {
          bgImg.onload = r
        })

        ctx.drawImage(bgImg, 0, 0, SHARE_W, SHARE_H)

        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
        ctx.fillRect(0, 0, SHARE_W, SHARE_H)

        ctx.fillStyle = '#111827'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText(info.value.companyName, 80, 86)

        ctx.font = 'bold 48px sans-serif'
        ctx.fillText(info.value.userName, 80, 210)

        ctx.font = '28px sans-serif'
        ctx.fillStyle = '#6b7280'
        ctx.fillText(info.value.position, 80, 258)

        const descLines = info.value.desc.split('\n')
        descLines.forEach((line, index) => {
          ctx.fillText(line, 420, 210 + index * 36)
        })

        ctx.font = '26px sans-serif'
        ctx.fillStyle = '#374151'

        const contactY = 340
        const lineHeight = 42

        ctx.fillText(`电话：${info.value.phone}`, 80, contactY)
        ctx.fillText(`邮箱：${info.value.email}`, 80, contactY + lineHeight)
        ctx.fillText(`地址：${info.value.location}`, 80, contactY + lineHeight * 2)

        console.log('canvas', canvas)

        wx.canvasToTempFilePath({
          canvas: canvas,
          x: 0,
          y: 0,
          width: SHARE_W,
          height: SHARE_H,
          destWidth: SHARE_W,
          destHeight: SHARE_H,
          fileType: 'jpg',
          quality: 0.8,
          success: (r: any) => resolve(r.tempFilePath)
        })
      })
  })
}

onShareAppMessage(() => ({
  title: `${info.value.userName}的名片`,
  path: '/pages/index/index',
  imageUrl: shareImgUrl.value
}))

onShow(() =>
  wx.setNavigationBarTitle({
    title: `${info.value.userName}的名片`
  })
)

onMounted(async () => {
  try {
    const tempPath = await createSharePoster()
    shareImgUrl.value = tempPath
  } catch (e) {
    console.error('生成分享海报失败', e)
  }
})
</script>

<template>
  <view class="min-h-screen bg-[#f6f7fb] p-[32rpx]">
    <view
      :style="{
        backgroundImage: `url(https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/card_bg.jpg)`
      }"
      class="rounded-[14rpx] flex flex-col justify-between h-[450rpx] w-full bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
    >
      <view class="flex items-center">
        <image
          class="h-[64rpx] w-[64rpx]"
          :src="info.companySrc"
        />
        <text class="ml-1">{{ info.companyName }}</text>
      </view>
      <view class="my-[50rpx] flex items-center justify-between">
        <view class="flex flex-col items-center">
          <text class="text-2xl font-bold">{{ info.userName }}</text>
          <text class="text-sm">{{ info.position }}</text>
        </view>
        <view class="whitespace-pre-line text-center text-xs">
          <text>{{ info.desc }}</text>
        </view>
      </view>
      <view class="flex flex-col space-y-1 text-xs">
        <text>电话：{{ info.phone }}</text>
        <text>邮箱：{{ info.email }}</text>
        <text>地址：{{ info.location }}</text>
      </view>
    </view>

    <view
      class="mt-2 bg-white rounded-[14rpx] bg-cover bg-center bg-no-repeat p-[28rpx] shadow-[0_18rpx_40rpx_rgba(17,24,39,0.08)]"
    >
      <view class="flex">
        <t-button
          open-type="share"
          size="large"
          theme="light"
          variant="outline"
        >
          分享该名片
        </t-button>
        <t-button
          size="large"
          theme="primary"
          class="ml-2!"
          @tap="saveContact"
        >
          存入通讯录
        </t-button>
      </view>

      <view class="mt-4 flex justify-between text-xs">
        <view class="flex flex-col">
          <t-button
            theme="primary"
            size="large"
            icon="call"
            shape="circle"
            @tap="makeCall"
          />
          <text class="mt-1">拨打电话</text>
        </view>
        <view class="flex flex-col">
          <t-button
            style="--td-button-default-bg-color: #07c160; --td-button-default-color: #ffffff"
            size="large"
            icon="logo-wechat-stroke-filled"
            shape="circle"
            @tap="copyWeChat"
          />
          <text class="mt-1">添加微信</text>
        </view>
        <view class="flex flex-col">
          <t-button
            theme="primary"
            size="large"
            icon="location-filled"
            shape="circle"
            @tap="openMap"
          />
          <text class="mt-1">查看地址</text>
        </view>
      </view>
    </view>

    <view class="mt-2">
      <view class="flex flex-wrap">
        <image
          v-for="(item, index) in [
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home1.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home2.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home3.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home4.png',
            'https://mdwipnyhqileocalrcsw.supabase.co/storage/v1/object/public/business-card/home5.png'
          ]"
          :key="index"
          :src="item"
          class="w-full"
          mode="widthFix"
        />
      </view>
    </view>
  </view>
  <!-- <canvas
    type="2d"
    id="shareCanvas"
    style="width: 750px; height: 600px; position: fixed; left: -9999rpx; top: -9999rpx"
  /> -->
</template>
