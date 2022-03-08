// pages/cart/index.js
import { chooseAddress, showModal, showToast, login } from "../../utils/asyncWx"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        //先判断登录状态
        const userInfo = wx.getStorageSync('userInfo') || []
        if (userInfo.length === 0) {
            await login()
        }

    },

    async handleAddress() {
        const address = await chooseAddress()
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        wx.setStorageSync("address", address)
    },
    onShow() {
        //获取缓存中的收货地址信息
        const address = wx.getStorageSync("address");
        this.setData({ address })
            //设置地址信息
        const cart = wx.getStorageSync('cart') || [];
        //const allChecked = cart.length == 0 ? false : cart.every(v => v.checked);
        this.setCart(cart);


    },
    change(e) {
        const goods_id = e.currentTarget.dataset.id;
        const { cart } = this.data;
        //找到被选中商品
        let index = cart.findIndex(v => v.goods_id === goods_id);
        //将其选中标志取反
        cart[index].checked = !cart[index].checked;
        //购物车数据重新设置回data和缓存中,并且改变商品状态
        this.setData({ cart });
        this.setCart(cart);
    },
    allChange() {
        const { cart } = this.data;
        cart.forEach(v => v.checked = !v.checked);
        this.setCart(cart);

    },
    //设置购物车状态
    setCart(cart) {
        let allChecked = true;
        let totalPrice = 0,
            totalNum = 0;
        cart.forEach(v => {
                if (v.checked) {
                    //计算商品价格和数量
                    totalPrice += v.goods_price * v.num;
                    totalNum += v.num;
                } else {
                    allChecked = false;
                }

            })
            //如果cart为空allChecked应该为false
        allChecked = cart.length ? allChecked : false;
        this.setData({ cart, allChecked, totalPrice, totalNum })
        wx.setStorageSync("cart", cart)

    },
    async handleItemNumEdit(e) {
        const { cart } = this.data;
        const { operation, id } = e.currentTarget.dataset;
        //console.log(e);
        let index = cart.findIndex(v => v.goods_id === id);

        if (cart[index].num === 0 && operation === -1) {
            const res = await showModal("该宝贝不能减少了呦，是否删除?")
            if (res.confirm) {
                cart.splice(index, 1);

            }

        } else {
            cart[index].num += operation;
        }
        this.setCart(cart);
    },
    async handlePay() {
        const { address, totalNum } = this.data
        if (!address.userName) {
            await showToast("请添加收货地址");
            return;
        }
        if (totalNum === 0) {
            await showToast("您还未选购商品")
            return;
        }
        //跳转到支付页面
        wx.navigateTo({
            url: '/pages/pay/index?',
        })


    }


})