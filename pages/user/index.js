// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        collectNum: 0

    },
    onShow() {
        const userInfo = wx.getStorageSync('userInfo')
        const collectNum = wx.getStorageSync('collect').length
        this.setData({ userInfo, collectNum });

    }


})