import { request } from "../../request"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx"

// pages/goods_detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: [],
        isCollect: false

    },
    GoodsInfo: [],
    /**
     * 生命周期函数--监听页面加载
     */
    //页面加载时所带的options就是页面的参数
    onShow: function(options) {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        const { goods_id } = currentPage.options;
        this.getGoodsDetail(goods_id);

    },
    async getGoodsDetail(goods_id) {
        const res = await request({ url: "/goods/detail", data: { goods_id } });
        this.GoodsInfo = res;
        //获取缓存中的收藏数组
        let collect = wx.getStorageSync("collect") || [];
        //判断该商品是否在收藏数组里
        let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);

        this.setData({
            goodsObj: {
                goods_name: res.goods_name,
                goods_price: res.goods_price,
                //iphone部分手机不识别web图片格式
                //最好找到后台修改
                //临时自己改 确保后台存在.webp文件
                goods_introduce: res.goods_introduce.replace(/\.webp/g, ".jpg"),
                pics: res.pics,
                goods_id: res.goods_id,


            },
            isCollect
        })
    },
    handleTap(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
        const { index } = e.currentTarget.dataset
            //console.log(curr);
        wx.previewImage({
            current: urls[index],
            urls
        })


    },
    /*login(){
        //先判断登录状态
        const userInfo = wx.getStorageSync('userInfo') || []
        if (userInfo.length === 0) {
            wx.navigateTo({
                url: '/pages/login/index',
            })
            return true;
        }
        else return false;
    },*/
    async handleCart() {
        //先判断登录状态
        const userInfo = wx.getStorageSync('userInfo') || []
        if (userInfo.length === 0) {
            await login()
        }
        //获取缓存中的购物车数组
        else {
            let cart = wx.getStorageSync("cart") || [];
            //判断当前商品是否存在于购物车数组中
            let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
                // console.log(this.GoodsInfo.goods_id)

            // console.log(index);
            if (index === -1) {
                //不存在则第一次添加
                this.GoodsInfo.num = 1;
                this.GoodsInfo.checked = true;
                cart.push(this.GoodsInfo)
            } else {
                //已经存在于购物车中执行num++;
                cart[index].num++;
            }
            //把购物车添加进缓存
            //console.log(cart)
            wx.setStorageSync("cart", cart);
            //弹窗提示
            wx.showToast({
                title: '加入成功',
                icon: 'success',
                //防止用户手抖疯狂点击按钮
                mask: true
            })

        }

    },
    async handleCollect() {
        //先判断登录状态
        const userInfo = wx.getStorageSync('userInfo') || []
        if (userInfo.length === 0) {
            await login()
        } else {
            let collect = wx.getStorageSync("collect") || [];
            //判断该商品是否在收藏数组里
            let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
            //不在则加入
            let isCollect = false;
            if (index === -1) {
                collect.push(this.GoodsInfo);
                isCollect = true;
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success'
                })
            }
            //如果在则移除
            else {
                collect.splice(index, 1);
                isCollect = false;
                wx.showToast({
                    title: '取消收藏',
                    icon: 'success'
                })
            }
            wx.setStorageSync('collect', collect)
            this.setData({
                collect,
                isCollect
            })
        }


    }
})