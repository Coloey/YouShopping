// pages/search/index.js
import { request } from "../../request"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        inputValue: ""

    },
    Timeid: -1,
    handleInput(e) {
        const { value } = e.detail;
        if (value.trim() === "") {
            this.setData({
                goods: [],
                isFocus: false
            })
            return;
        }
        this.setData({ isFocus: true })
            //防抖:一般用在页面中防止重复输入 重复发送请求
        clearTimeout(this.Timeid); //清除上一个定时器，直到不再输入，等待1s发送请求
        this.Timeid = setTimeout(() => {
            this.qsearch(value)

        }, 1500)
    },
    async qsearch(query) {
        const { goods } = await request({ url: "/goods/search", data: { query } })
            //console.log(res)
        this.setData({ goods })


    },
    handleCancel() {
        this.setData({
            inputValue: "",
            isFocus: false,
            goods: []
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },


})