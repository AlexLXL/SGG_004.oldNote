/**
 * 事件总线的实现：
 * this.$bus.$on('事件名',回调函数)	    监听当前实例上的自定义事件 --- 多个组件使用会出现一个事件名对应多个回调
 * this.$bus.$emit('事件名',数据)		触发当前实例上的事件。
 * this.$off(eventName)		           移除自定义事件监听器      --- 不传参全部溢出
 * 
 * 变量命名: eventName， listener,  data
 * 
 * 容器:{ add: [f1, f2], del: [f1, f2] }	// 最外层是对象的原因是这样可以直接找里面的属性 // 如果是数组套对象，不好找
 */


(function (window) {
    // 定义事件总线对象、容器
    const EventBus = {}
    let listenersContainer = {}

    // 定义on方法
    EventBus.on = function (eventName, listener) {
        // 判断有无这个事件，没有就加
        const listeners = listenersContainer[eventName];
        if (!listeners) {
            listenersContainer[eventName] = []
        }
        listenersContainer[eventName].push(listener)
    }

    // 定义emit方法(触发)
    EventBus.emit = function (eventName, data) {
        // 判断是否存在,是否为空数组
        const listeners = listenersContainer[eventName];
        if (listeners && listeners.length > 0) {
            listeners.forEach((item) => {
                item(data)
            })
        }
    }

    // 定义off方法
    EventBus.off = function (eventName) {
        // 没传参移出全部
        if (eventName === undefined) {
            listenersContainer = {};
        } else {
            // 传参了移出当前的，用delete删除键值对(对象)
            delete listenersContainer[eventName]
        }
    }


    // 暴露事件总线对象给window
    window.EventBus = EventBus
})(window)