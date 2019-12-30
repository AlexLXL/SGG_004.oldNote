// 2. 劫持构造函数
function Observer(data) {
    // this-劫持对象(把data保存在劫持对象上)
    this.data = data;
    // 走起
    this.walk(data);
}

Observer.prototype = {
    // 走起
    walk: function(data) {
        var me = this;
        // 循环遍历data，data里有多少key:value遍历几次 ----- 先写第一次  ----- 
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);     // 传入第一次 key:value
        });
    },
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);   // 传入 劫持对象.data、第一次 key:value
    },

    defineReactive: function(data, key, val) {  // 这里的data是劫持对象的data
        // 第一次创建dep{id: , subs:}
        var dep = new Dep();
        // 判断key:value的值是否还是对象
        var childObj = observe(val);

        Object.defineProperty(data, key, {  // 劫持对象的data加key
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {   // watch.js将Dep.target --保存为--> watch
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {     // 改变劫持对象的data时,val就是 ‘哇哈哈’
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                // 判断key:value的值是否还是对象
                childObj = observe(newVal); 
                // 通知订阅者 - 劫持给订阅者watcher发通知
                dep.notify();
            }
        });
    }
};

// 1. MVVM入口
function observe(value, vm) {
    // value就是data，判断data是都为空和是不是object  [主要是为了判断   data里的属性的值  是否还是对象]
    if (!value || typeof value !== 'object') {
        return;
    }

    // MVVM进来创建劫持者(监视者)
    return new Observer(value);
};


var uid = 0;

// dep构造函数
function Dep() {
    this.id = uid++;
    this.subs = []; // subs放表达式的创建的watch
}

Dep.prototype = {
    // subs添加watcher
    addSub: function(sub) {
        this.subs.push(sub);    
    },

    depend: function() {
        Dep.target.addDep(this);     // 把这两句合起来:watch.addDep(dep)  - dep调的depend，所以this是dep
                                     // 去watcher.js文件调用addDep的时候，那边又调用了dep.addSub(this);
                                     //        | dep是这里传过去的this
                                     //        | 形参this是这里的Dep.target(即watcher)
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();   // subs放的是watcher,所以这里是遍历watcher，调用watcher.update()
        });
    }
};

Dep.target = null;