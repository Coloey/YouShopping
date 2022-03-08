// pages/index/index.js
import { request } from "../../request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //轮播图数组
        swiperList: [],
        floorList: [],
        cateList: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    //将图片存储在云数据库
    onLoad: function() {
        this.getSwiperList();
        this.getFloorList();
        this.getCateList()
    },
    async getSwiperList() {
        const swiperList = await request({ url: "/home/swiperdata" })
        this.setData({ swiperList })
    },
    async getFloorList() {
        const floorList = await request({ url: "/home/floordata" })
        this.setData({ floorList })
    },
    async getCateList() {
        const cateList = await request({ url: "/home/catitems" })
        this.setData({ cateList });
    }

})