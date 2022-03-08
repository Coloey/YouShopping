// pages/feedback/index.js
import { chooseImage } from "../../utils/asyncWx"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textVal: "",
        imgs: []

    },
    UpImgs: [],
    handleInput(e) {
        const textVal = e.detail.value;
        this.setData({ textVal })


    },
    async handleChoose() {
        const { tempFilePaths } = await chooseImage()
        this.setData({ imgs: tempFilePaths })

    },
    removeImgs(e) {
        const { index } = e.detail
        const { imgs } = this.data
        imgs.splice(index, 1)
        this.setData({
            imgs
        })

    },
    handleSubmit() {
        const { textVal, imgs } = this.data
        if (textVal.trim() === "") {
            wx.showToast({
                title: "输入不合法",
                icon: "error"
            })
            return;
        }
        wx.showLoading({
            title: "正在上传中"
        })
        if (imgs.length > 0) {
            imgs.forEach((v, i) => {
                wx.uploadFile({
                    url: 'https://media.mogu.com/image/scale?appKey=15m&w=500&h=500&quality=100',
                    filePath: v,
                    name: 'image',
                    // header: {}, // 设置请求的 header
                    // formData: {}, // HTTP 请求中其他额外的 form data
                    success: (res) => {
                        // success
                        let url = JSON.parse(res.data).url
                        this.UpImgs.push(url)
                        if (i === imgs.length - 1) {
                            wx.hideLoading();
                            wx.showToast({
                                title: "提交成功",
                                icon: "success"
                            })
                            this.setData({
                                textVal: "",
                                imgs: []
                            })

                        }
                    },
                })
            })

        } else {
            wx.hideLoading();
            console.log("只上传文字")
            wx.showToast({
                title: "提交成功",
                icon: "success"
            })
            this.setData({
                textVal: "",
            })

        }
    }


})