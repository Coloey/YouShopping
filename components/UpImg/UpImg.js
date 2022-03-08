// components/UpImg/UpImg.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgs: {
            type: Array,
            value: []
        }

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleDelImg(e) {
            const {index}=e.currentTarget.dataset;
            //子组件传递数据给父组件
            this.triggerEvent("removeImgs",{index})
        }

    }
})