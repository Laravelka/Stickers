import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


import Home from '@/js/components/Home';
import Error from '@/js/components/Error';
import Sticker from '@/js/components/Sticker';
import Payment from '@/js/components/Payment';
import NotFound from '@/js/components/NotFound';

import AdminHome from '@/js/components/Admin/Home';

/*
const Home = () => import('@/js/components/Home');
const Error = () => import('@/js/components/Error');
const Sticker = () => import('@/js/components/Sticker');
const Payment = () => import('@/js/components/Payment');
const NotFound = () => import('@/js/components/NotFound');
*/

const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/error',
			name: 'error',
			component: Error
		},
		{
			path: '/sticker/:id',
			name: 'sticker',
			component: Sticker
		},
		,
		{
			path: '/payment/:sticker_id',
			name: 'payment',
			component: Payment
		},
		{
			path: '/admin',
			name: 'admin.home',
			component: AdminHome
		},
		{
			path: '*',
			component: NotFound
		}
	]
});

export default router;