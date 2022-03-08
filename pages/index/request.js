let ajaxTime = 0;
export const request = (params) => {
    ajaxTime++;
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    return new Promise((resolve, reject) => {
        wx.cloud.database().collection(params).get({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTime--;
                if (ajaxTime == 0) { wx.hideLoading() }
            }
        })

    })
}