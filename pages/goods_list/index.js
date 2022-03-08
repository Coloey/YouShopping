// pages/goods_list/index.js
import { request } from "../../request"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true

            },
            {
                id: 1,
                value: "销量",
                isActive: false

            },
            {
                id: 2,
                value: "价格",
                isActive: false

            }
        ],
        goods_list: []

    },
    QueryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    totalPages: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.QueryParams.cid = options.cid || "";
        this.QueryParams.query = options.query || ""
        this.getGoodsList();

    },
    handletabsItemChange(e) {
        const { index } = e.detail;
        let { tabs } = this.data;
        tabs.forEach((v, i) => { i === index ? v.isActive = true : v.isActive = false });
        this.setData({
            tabs
        })
    },
    async getGoodsList() {
        const res = await request({ url: "/goods/search", data: this.QueryParams });
        //console.log(res);
        const total = res.total;
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize); //计算总页数
        this.setData({ goods_list: [...this.data.goods_list, ...res.goods] });
        //关闭下拉刷新窗口 如果没有调用下拉刷新窗口 直接关闭也不报错
        wx.stopPullDownRefresh()

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        //重置数据
        this.setData({ goods_list: [] });
        //重置页码
        this.QueryParams.pagenum = 1;
        //发送请求
        this.getGoodsList();

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // 判断当前页码是否大于总页数
        if (this.QueryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '没有下一页',
            })
        } else { //加载下一页
            this.QueryParams.pagenum++; //页码加一
            this.getGoodsList(); //加载

        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})