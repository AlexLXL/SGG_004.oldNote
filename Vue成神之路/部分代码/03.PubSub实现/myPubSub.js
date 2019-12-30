/**
 * PubSub实现
 * 
 * PubSub.subscribe(msg, subscriber)	消息订阅的方法 --- 同样多个组件使用会出现一个msg对应多个回调函数
 * PubSub.publish(msg, data)		异步发布消息
 * PubSub.publishSync(msg, data)	同步发布消息
 * PubSub.unsubscribe(token)		token是唯一的
 * 
 * subscriber:回调函数,  token 唯一标识
 * 
 * 容器:{ add:{id-0:f1, id-1:f2}, del:{id-3:f3} } 
 * // 用id的原因是删除的时候要用到token，而token是唯一的，所以删除的时候也是唯一的删
 */

(function (window) {
    // 定义PubSub对象、容器、id
    const myPubSub = {};
    let myPubSubContainer = {}
    let id = -1

    // 定义subscribe方法
    myPubSub.subscribe = function (msg, subscriber) {
        // 判断是否存在，没有就加，然后加入token标志
        const subscribers = myPubSubContainer[msg]
        if (!subscribers) {
            myPubSubContainer[msg] = {}
        }
        const token = 'id-' + ++id
        myPubSubContainer[msg][token] = subscriber
        return token
    }

    // 定义异步publish方法
    myPubSub.publish = function (msg, data) {
        // 判断是否存在
        const subscriber = myPubSubContainer[msg]
        if (subscriber) {
            const subscribers = Object.values(subscriber)
            // 异步
            setTimeout(() => {
                subscribers.forEach(item => {
                    item(data)
                })
            }, 500)
        }
    }

    // 定义publishSync方法
    myPubSub.publishSync = function (msg, data) {
        const subscriber = myPubSubContainer[msg]
        if (subscriber) {
            const subscribers = Object.values(subscribers)
            subscribers.forEach(item => {
                item(data)
            })
        }
    }

    // 定义unsubscribe方法{ add: { id-0: f1, id-1: f2 } }
    myPubSub.unsubscribe = function(token) {
        // 没有传参
        if(token === undefined) {
            myPubSubContainer = {}
        }else if(token.indexOf('id-') === 0) {
            // 传的是id-x
            // 这里返回的不是新生成的数组里面的项吗？[ {id-0:f1,id-1:f2}, {id-3:f3} ]
            // find() 方法返回数组中满足提供的测试函数的第一个元素的值   {id-0:f1,id-1:f2}
            // 因为是引用数据类型，所以删了容器里面的也删了？
            const subscribers = Object.values(myPubSubContainer).find(item => { 
                return item[token]
            })
            subscribers && delete subscribers[token]
        }else {
            // 传的是add这种第一层的key,
            delete myPubSubContainer[token]
        }
    }

    // 暴露PubSub对象给window
    window.myPubSub = myPubSub
})(window)
