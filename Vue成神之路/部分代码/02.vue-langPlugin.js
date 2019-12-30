(function (window) {
    // 定义插件对象
    const langPlugin = {}

    // 定义插件对象.install
    langPlugin.install = function (Vue) { // 第一个参数Vue
        Vue.show1 = function () {
            console.log('Vue的show1');
        }

        // 插件可以自定义指令
        Vue.directive('text-uppercase', function (el, binding) {
            el.innerText = binding.value.toUpperCase();
        })

        Vue.prototype.$show2 = function () {
            console.log('vm的show2');
        }
    }

    window.langPlugin = langPlugin;
})(window)