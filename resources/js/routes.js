import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


import Home from '@/js/components/Home';
import Error from '@/js/components/Error';
import Sticker from '@/js/components/Sticker';
import Payment from '@/js/components/Payment';
import NotFound from '@/js/components/NotFound';

import AdminHome from '@/js/components/Admin/AdminHome';
import AdminStickers from '@/js/components/Admin/Stickers';
import AdminSettings from '@/js/components/Admin/Settings';
import AdminPaidStickers from '@/js/components/Admin/PaidStickers';

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
			path: '/admin/stickers',
			name: 'admin.stickers',
			component: AdminStickers
		},
		{
			path: '/admin/settings',
			name: 'admin.settings',
			component: AdminSettings
		},
		{
			path: '/admin/paidStickers',
			name: 'admin.paidStickers',
			component: AdminPaidStickers
		},
		{
			path: '*',
			component: NotFound
		}
	]
});

export default router;