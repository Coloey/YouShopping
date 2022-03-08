export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
export const showModal = (content) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: "提示",
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }


        })
    })
}
export const showToast = (title) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'error',
            duration: 2000,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }


        })
    })
}
export const getUserProfile = (desc) => {
        return new Promise((resolve, reject) => {
            wx.getUserProfile({
                desc,
                success: (res) => {
                    resolve(res)
                },
                fail: (err) => {
                    reject(err)
                }
            })
        })
    }
    //promise 登陆
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.navigateTo({
            url: '/pages/login/index',
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
//promise 上传图片
export const chooseImage=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseImage({
            count: 9, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: (res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
            
        })
    })
}