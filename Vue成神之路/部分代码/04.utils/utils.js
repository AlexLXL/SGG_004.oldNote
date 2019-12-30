export default {
    getTodos() {
        return JSON.parse(localStorage.getItem('todos_key') || '[]')    // 没有todos_key的时候传一个默认值空数组
    },
    setTodos(val) {
        localStorage.setItem('todos_key',JSON.stringify(val))
    }
}