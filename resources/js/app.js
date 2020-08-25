import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import bridge from '@vkontakte/vk-bridge';
import VuetifyUpload from '@kingscode/vuetify-upload';

import '@/sass/app.scss';
import App from '@/js/views/App';
import Routes from '@/js/routes.js';
import 'vuetify/dist/vuetify.min.css';
import { randomInt } from '@/js/helpers/other';
import { setCookie, getCookie } from '@/js/helpers/cookies';

Vue.use(Vuetify);
Vue.use(VuetifyUpload);
Vue.use(VueAxios, axios);

axios.defaults.baseURL =  Laravel.baseUrl + '/api';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
	axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
	console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

axios.interceptors.response.use((response) => {
	let headers = response.headers;
	
	return response;
});

window.axios = axios;
window.bridge = bridge;

Vue.router = Routes;

Vue.router.beforeEach((to, from, next) => {
	bridge.send("VKWebAppSetLocation", {"location": to.path});

	if (Laravel.error && to.name !== 'error')
	{
		next({name: 'error'});
	}
	next();
});

const app = new Vue({
	el: '#app',
	router: Vue.router,
	render: h => h(App),
	vuetify : new Vuetify({
		icons: {
			iconfont: 'mdi',
		},
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: '#5E35B1',
					accent: '#FF4081',
					secondary: '#ffe18d',
					success: '#4CAF50',
					info: '#2196F3',
					warning: '#FB8C00',
					error: '#FF5252'
				},
				light: {
					primary: '#5E35B1',
					accent: '#e91e63',
					secondary: '#30b1dc',
					success: '#4CAF50',
					info: '#2196F3',
					warning: '#FB8C00',
					error: '#FF5252'
				}
			}
		}
	}),
	created() {
		bridge.send('VKWebAppInit');
		bridge.send('VKWebAppGetUserInfo');

		if (Laravel.user.allow_notify != 1)
			bridge.send("VKWebAppAllowNotifications");

		bridge.send("VKWebAppGetAuthToken", {"app_id": 7080403, "scope": "docs"});

		bridge.subscribe(async(event) => {
			const { type, data } = event.detail;

			if (!event.detail) {
				return;
			}
			
			if (type !== undefined) {
				console.log(type, data);

				if (type == 'VKWebAppUpdateConfig') {
					this.$vuetify.theme.dark = data.scheme !== 'bright_light';
				}

				if (type == 'VKWebAppAllowNotificationsResult') {
					const res = await axios.post('/users/allowNotify', {
						token: Laravel.user.api_token,
					});
				}

				if (type == 'VKWebAppAccessTokenReceived') {
					const res = await axios.post('/users/setAccessToken', {
						token: Laravel.user.api_token,
						access_token: data.access_token
					});
				}
			}
		});
	}
});

export default app;