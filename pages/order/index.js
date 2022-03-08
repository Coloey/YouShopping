// pages/order/index.js
import { request } from "../../request"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "全部",
                isActive: true

            },
            {
                id: 1,
                value: "待付款",
                isActive: false

            },
            {
                id: 2,
                value: "待发货",
                isActive: false

            },
            {
                id: 3,
                value: "退款退货",
                isActive: false

            }
        ],
        orders: []

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(options) {

        //获取当前小程序中的页面栈,长度最大是10页
        let pages = getCurrentPages();
        // 数组中索引最大页面就是当前页面
        let { type } = pages[pages.length - 1].options
            //激活选中页面标题 当type=1 index=0
        this.changeTitleByIndex(type - 1)
        this.getOrders(type)

    },
    // 根据标题索引来激活选中标题数组
    changeTitleByIndex(index) {
        let { tabs } = this.data;
        tabs.forEach((v, i) => { i === index ? v.isActive = true : v.isActive = false });
        this.setData({
            tabs
        })


    },
    handletabsItemChange(e) {
        const { index } = e.detail;
        this.changeTitleByIndex(index)
            //重新发送请求
        this.getOrders(index + 1)

    },

    async getOrders(type) {
        const token = wx.getStorageSync('token');
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            })
        }
        const header = { Authorization: token };
        const { orders } = await request({ url: "/my/orders/all", data: { type }, header })
        orders.forEach(v => v.create_time = new Date(v.create_time).toLocaleString())
        this.setData({ orders });
    },

})