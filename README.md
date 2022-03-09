# YouShopping
一个电商购物小程序
### 部署步骤
将项目下载到微信开发者工具中打开
### 目录结构描述

|—— components
|    |——Search 搜索组件
|    |—— Tabs tab栏组件
|—— images 存放图片
|—— libs 支持 async/await 语法，按需注入 regeneratorRuntime，目录位置与辅助函数一致
|   |—— runtime
|—— pages 页面文件
|   |—— index YOU品商城主页
|   |—— category 分类页面
|   |—— goods_list 商品列表页面
|   |—— goods_detail 商品详情页面
|   |—— collect 收藏商品页面
|   |—— cart 购物车页面
|   |—— order 历史订单页面
|   |—— search 搜索页面
|   |—— user 用户页面
|   |—— feedback 意见反馈页面
|   |—— login 登录页面
|   |—— auth 授予权限页面
|   |—— pay 支付页面
|—— styles 
|   |—— iconfont.wxss 一些用到的图标样式
|—— utils
|   |——asyncW.js 封装的wx的内置函数 方便异步调用
|——request.js 封装了接口函数 便于异步调用
