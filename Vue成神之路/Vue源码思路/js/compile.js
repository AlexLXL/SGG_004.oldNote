// 模板解析
function Compile(el, vm) {
    // this是编译对象，上面有挺多方法的，保存实例对象vm
    this.$vm = vm;
    // 拿到入口的DOM节点
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    // 判断是否存在入口DOM节点
    if (this.$el) {
        // 1、创建文档碎片
        this.$fragment = this.node2Fragment(this.$el);
        // 2、进行模板解析 (文档碎片里)
        this.init();
        // 3、把文档碎片里的节点移回到入口节点
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    // 1.1 创建文档碎片，把所有#app里的节点移进去[包括回车的text节点]
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        // 2.1 真正实现模板解析的方法compileElement - 传入了文档碎片
        this.compileElement(this.$fragment);
    },

    // 2.1同步
    compileElement: function(el) {
        // 2.1.1 拿文档碎片的子节点保存在childNodes: [text↙, p标签, text↙]
        var childNodes = el.childNodes,
        // 2.1.2 缓存编译对象
            me = this;

        // 2.1.3循环遍历文档碎片子节点数组childNodes
        [].slice.call(childNodes).forEach(function(node) {
            // 2.1.3-1拿到childNodes数组里每一项
            var text = node.textContent;
            // 匹配{{}}的正则，$1匹配正则第一个括号
            var reg = /\{\{(.*)\}\}/;

            // 判断是不是元素节点 ( nodetype = 1 ) 
            if (me.isElementNode(node)) {
                me.compile(node);           // complie --- 检测属性里是否存在  指令

            // 判断是不是 {{}} 这样的文本节点 
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1.trim()); // 第一个参数是节点，第二个参数是{{xx}}里的xx
                // compileText ---> compileUtil ---> bind ---> _getVMVal(拿值)

                // ★这个还会走到bind---> new Watcher() ----> 创建depIds , 所以每个表达式创建一个watch (watch.depIds={})
            }

            // 递归检测子元素，=== <p>{{msg}}</p>就是走这里，然后拿到{{msg}}走上面这行 ===
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    // 检测属性里是否存在 指令，并解析
    compile: function(node) {
        // 拿到节点的所有属性--伪数组 
        var nodeAttrs = node.attributes,
            me = this;

        // 循环遍历每一个属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // v-on:click
            var attrName = attr.name;
            // 判断是不是指令
            if (me.isDirective(attrName)) {
                var exp = attr.value;               // 拿到表达式
                var dir = attrName.substring(2);    // 去掉v- ---> on:click
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                // 移出所有指令的(标签内)
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);  // 节点, 实例对象vm, msg
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合(编译工具)
var compileUtil = {
    // v-text
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    // v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    // v-model
    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    // v-class
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    // 上面的bind
    bind: function(node, vm, exp, dir) {
        // 拼成 updater.textUpdater
        var updaterFn = updater[dir + 'Updater'];

        // 执行 updater.textUpdater、_getVMVal通过vm.msg获取值，然后去到updater.textUpdater执行
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // ★创建watcher
        new Watcher(vm, exp, function(value, oldValue) {
            // 通过updater更新页面
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件指令处理
    eventHandler: function(node, vm, exp, dir) {    // 节点、实例对象、表达式、指令去掉v-
        // 拿到事件类型
        var eventType = dir.split(':')[1],
            // 拿到实例对象的method
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            // 绑定事件
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    // _getVMVal通过vm.msg获取值
    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    // 替换文档碎片的{{msg}} 为 真正的值, 到这里完成表达式的替换    v-text也是用这个解析
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    // v-html替换为真正的值
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    // v-class替换为真正的值
    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    // v-model替换为真正的值
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};