import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			token: JSON.parse(localStorage.getItem('token')) || null,
			userData: JSON.parse(localStorage.getItem('userData')) || null,
		};
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
		},
		setUserData(state, userData) {
			state.userData = userData;
		},
	},
	actions: {},
	getters: {
		getToken(state) {
			return state.token;
		},
		getUserData(state) {
			return state.userData;
		},
	}
});

export default store;