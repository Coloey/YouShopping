// pages/login/index.js
import { getUserProfile } from "../../utils/asyncWx"
Page({

    /**
     * 页面的初始数据
     */
    data: {


    },
    async HandleUserProfile() {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        const { userInfo } = await getUserProfile("获取用户信息用于登录")
            //console.log(userInfo)
        wx.setStorageSync('userInfo', userInfo)
        wx.navigateBack({
            delta: 1,
        })




    },






})