// pages/category/index.js
import { request } from "../../request"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrolltop: 0

    },
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const Cates = wx.getStorageSync('cates')
        if (!Cates) {
            //数据不存在，发请求
            this.getCate();
        } else {
            //有旧的数据 但是时间过期还是要发请求
            if (Date.now() - Cates.time > 60000 * 5) {
                this.getCate()
            } else {
                //数据有效，使用旧数据

                this.Cates = Cates.data;
                let rightContent = this.Cates[0].children;
                let leftMenuList = this.Cates.map(v => v.cat_name);
                this.setData({ leftMenuList, rightContent });

            }
        }



    },
    async getCate() {
        // request({
        //         url: "/categories"
        //     })
        //     .then(res => {
        //         this.Cates = res.data.message;
        //         wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
        //         let rightContent = this.Cates[0].children;
        //         let leftMenuList = this.Cates.map(v => v.cat_name);
        //         this.setData({ leftMenuList, rightContent });

        //     })
        //使用async await发送请求
        const res = await request({ url: "/categories" });
       
        this.Cates = res;
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
        let rightContent = this.Cates[0].children;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        this.setData({ leftMenuList, rightContent });


    },
    changeIndex(e) {
        const { index } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children;
        this.setData({ currentIndex: index, rightContent, scrolltop: 0 });
    }

})