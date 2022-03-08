let ajaxTime = 0;
export const request = (params) => {
        //显示加载
        ajaxTime++;
        wx.showLoading({
            title: '加载中',
        })
        var that=this
        const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
        return new Promise((resolve, reject) => {
            wx.request({
                ...params,
                url: baseUrl + params.url,
                success: (res) => {
                    resolve(res.data.message);
                },
                fail: (err) => {
                    reject(err)
                },
                complete: () => {
                    ajaxTime--; //发送多个请求的时候需要全部请求都返回时才关闭加载页面
                    if (ajaxTime === 0) { wx.hideLoading() }

                }

            })
        })
    }
    // 支付
export const requestPayment = (pay) => {
        return new Promise((resolve, reject) => {
            wx.requestPayment({
                ...pay,
                success: (res) => {
                    resolve(res)
                },
                fail: (err) => {
                    reject(err)
                }
            })
        })
    }
    