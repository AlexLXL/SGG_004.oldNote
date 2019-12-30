function MVVM(options) {
    // 1. 保存配置对象
    this.$options = options || {};
    // 2. 保存配置对象里的data对象[this._data]
    var data = this._data = this.$options.data;
    // 3. 缓存实例对象vm[方便回调里使用]
    var me = this;

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key) {
        me._proxyData(key);
    });

    this._initComputed();

    // 先劫持数据再模板解析, 传data和实例vm
    observe(data, this);

    // 实例化对象的时候，调用了模板解析-表达式
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    // 通过Object.defineProperty挂载属性和属性值到vm上 [vm.msg = vm._data.msg]
    _proxyData: function(key, setter, getter) {
        var me = this;
        setter = setter || 
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) { // 当设置更新vm.msg的时候，vm._data.msg响应更新
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};