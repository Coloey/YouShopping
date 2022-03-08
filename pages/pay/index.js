// pages/pay/index.js
import { request, requestPayment } from "../../request"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { showToast } from "../../utils/asyncWx"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


    },
    onShow() {
        //获取缓存中的收货地址信息
        const address = wx.getStorageSync("address");
        let cart = wx.getStorageSync('cart') || [];
        //获取过滤后的购物车数组
        cart = cart.filter(v => v.checked);
        let totalPrice = 0,
            totalNum = 0;
        cart.forEach(v => {
                //计算商品价格和数量
                totalPrice += v.goods_price * v.num;
                totalNum += v.num
            })
            //如果cart为空allChecked应该为false
        this.setData({ cart, totalPrice, totalNum, address })

    },
    async handleOrderPay() {
        // 判断缓存中有没有token
        try {
            const token = wx.getStorageSync("token");
            //没有token转到授权页面获取token
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/index',
                })
            }

            // 创建订单
            //准备请求头参数
            const header = { Authorization: token };
            //准备请求体参数
            const order_price = 0.001;
            const consignee_addr = this.data.address.all;
            const cart = this.data.cart;
            let goods = [];
            cart.forEach(v => goods.push({
                goods_id: v.goods_id,
                goods_number: v.num,
                goods_price: v.goods_price
            }));
            const params = { order_price, consignee_addr, goods };
            //发送请求 创建订单 获取订单编号
            const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: params, header });
            //发起预支付接口
            const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", header, data: { order_number } });
            //发起微信支付这里用的是别人的token，支付不被允许
            //const res = await requestPayment(pay)
            //查看订单支付状态
            const res = await request({ url: "/my/orders/chkOrder", method: "POST", header, data: { order_number } })
            console.log(res)
                //假装支付成功
            wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 5000,
                    success: (res) => {
                        console.log("支付成功")
                    },
                    fail: (err) => {
                        console.error(err)

                    }
                })
                //支付成功，删除缓存中已经支付的商品
            let newCart = wx.getStorageSync('cart')
            newCart = newCart.filter(v => !v.checked)
            wx.setStorageSync('cart', newCart)

            //跳转到订单页面
            wx.navigateTo({ url: "/pages/order/index" })

        } catch (err) {
            await showToast("支付失败")

        }


    }




})