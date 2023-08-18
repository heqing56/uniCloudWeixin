// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from '@/store/modules/moduleA'
import moduleB from '@/store/modules/moduleB'
Vue.use(Vuex);//vue的插件机制
export default new Vuex.Store({
	modules:{
		moduleA,moduleB
	}
})


// //Vuex.Store 构造器选项
// const store = new Vuex.Store({
// 	state:{//存放状态
// 		"username":"foo",
// 		"age":18,
// 		count:1,

// 	},
// 	mutations: {
// 		add(state, payload) {
// 			state.count += payload.amount
// 		}
// 	},
// 	actions:{
// 		addCountAction (context) {
// 		    context.commit('add')
// 		}
// 	}
// })
// export default store