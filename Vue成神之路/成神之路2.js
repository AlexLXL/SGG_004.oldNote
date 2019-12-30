/**
 * Vuex的使用:
 * ----------------------------------------------------------------------------
 * // ***模块{每个 (组件) 的state、mutations、actions、getters}***
 * modules文件夹
 *            | user.js:
 *                  const state = {}
 *                  const mutations = {}
 *                  const actions = {}
 *                  const getters = {}
 *                  
 *                  export default {
 *                    state,
 *                    mutations,
 *                    actions,
 *                    getters
 *                  }
 * 
 * ----------------------------------------------------------------------------
 * //创建store
 *  store.js:      
 *                  import Vue from 'vue'
 *                  import Vuex, { Store } from 'vuex'
 *                  
 *                  import state from './state.js'
 *                  import mutations from './mutations.js'
 *                  import actions from './actions.js'
 *                  import getters from './getters.js'
 *                  import user from './modules/user.js'
 *                  
 *                  Vue.use(Vuex);                      // 使用Vuex
 *                  
 *                  export default new Store({          // 创建store( 配置传 四个对象)
 *                      state,                          
 *                      mutations,
 *                      actions,
 *                      getters,
 *                    **modules: {**
 *                        user,
 *                        xxx,
 *                        yyy
 *                    **}**
 *                  })                                  
 *                                                      
 * ----------------------------------------------------------------------------
 * //暴露{状态数据}
 *  state.js: 
 *                  export default {    // 暴露状态数据
 *                      count: 0
 *                  }
 * 
 * ----------------------------------------------------------------------------
 * //暴露{直接修改数据的方法}
 * //mutations和actions都是可传参option的
 *  mutatiosn.js:
 *                  import { ADD, DEL } from './mutation-types.js'
 *                  
 *                  export default {    
 *                      [ADD](state) {      // 传入state修改状态,store.js引入了，所以可以传         ( ["func"](){} 等价 func:function(){} )
 *                          state.count++
 *                      },
 *                      [DEL](state, option) {
 *                          state.count--
 *                      }
 *                  }
 * 
 * 
 * mutation-types.js:
 *                  export const ADD = 'ADD'
 *                  export const DEL = 'DEL'
 * 
 * ----------------------------------------------------------------------------
 * //暴露{异步 和 methods的方法}
 * //mutations和actions都是可传参option的
 * actions.js:
 *                  // 官网: Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象, 什么commit、state都有
 *                  import { ADD, DEL } from './mutation-types.js'
 *                  
 *                  export default {    // 间接修改state
 *                      add(context) {                          (用法一)
 *                          context.commit(ADD)
 *                      },
 *                      sub({ commit }) {                       (用法二)
 *                          commit(DEL)
 *                      },
 *                      oddToAdd({ commit, state }, option) {   (用法三)
 *                          ((state.count & 1) === 1) && commit(ADD)
 *                      },
 *                  }
 * 
 * ----------------------------------------------------------------------------
 * //暴露{计算属性里get的方法}
 * getters.js:
 *                  export default {
 *                      isOdd(state) {                          // 和上面一样, 可传state
 *                          return ((state.count & 1) === 1) ? "奇数" : "偶数";
 *                       }
 *                  }
 * 
 * ----------------------------------------------------------------------------
 * 使用:
 *      1.main.js里引入store、注册store
 *      2.使用的组件  ---- | this.$store.state.count    --- 前两个结合 组件computed 使用 (不建议html里直接使用)
 *                        | this.$store.getters.isOdd
 * 
 *                        | ...mapState(['xx'])                         // 简写方法要从vuex引
 *                        | ...mapGetters(['xx'])
 * 
 *                        | this.$store.commit(ADD);   --- 这两个结合 组件method 使用 (commit是使用mutations的方法、dispatch是使用actions的方法)
 *                        | this.$store.dispatch('addSync')
 *                        
 *                        | ...mapMutations({ add:ADD, del:Del})        // ADD、DEL要从mutation-types引
 *                        | ...mapActions(['xx', 'xx'])
 * 
 *                  modules:
 *                        | ...mapState({   (使用)
 *                             user:state=>state.user.xxx               // state-总数据    user-模块     xxx-分数据(user里)
 *                          }),
 * 
 *                        | ...mapMutations、...mapActions、...mapGetters // 正常使用, 总 分 都会调用
 * 
 */