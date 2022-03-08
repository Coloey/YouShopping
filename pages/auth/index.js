// pages/auth/index.js
import { getUserProfile, login } from "../../utils/asyncWx"
import { request } from "../../request"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {


    },

    async getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        // const { encryptedData, iv, rawData, signature } = await getUserProfile("用于支付")
        // const { code } = await login();
        // const Appid = "wx4741b8b5f9fa2b32"
        // const AppSecret = "4d1d4a068b"
        //     //发送请求获取用户token
        // let token = await request({ url: "/users/wxlogin", data: { encryptedData, iv, rawData, signature, code } })

        wx.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
            //跳转回上一个页面
        wx.navigateBack({
            delta: 1,
        })



    },


})