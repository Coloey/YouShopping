// components/Tabs/Tabs.js.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs: {
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
        changeIndex(e) {
            const { index } = e.currentTarget.dataset;
            //console.log(e.currentTarget);
            this.triggerEvent("tabsItemChange", { index })
            this.setData({

            })
        }

    }
})