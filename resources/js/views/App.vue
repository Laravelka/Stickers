<template>
	<v-app id="inspire">
		<div v-if="$router.currentRoute.path !== '/'">
			<v-app-bar v-if="!hide.appBar" app dark color="primary">
				<v-btn icon @click.prevent="goBack()">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>
				<v-toolbar-title>{{ title }}</v-toolbar-title>
				<v-spacer></v-spacer>
			</v-app-bar>
		</div>
		<div v-else>
			<v-app-bar v-if="!hide.appBar" app dark color="primary">
				<v-toolbar-title>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="money_circle_outline" style="width: 25px; position: relative; top: 5.5px;">
						<g fill="none" fill-rule="evenodd">
							<path d="M0 0h28v28H0z"></path>
							<path d="M14 2c6.627 0 12 5.373 12 12s-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2zm0 2C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4zm1.673 4.5a3.662 3.662 0 110 7.325l-2.458-.001v1.403h1.637a.818.818 0 010 1.637l-1.637-.001v.78a.857.857 0 01-.857.857h-.14a.857.857 0 01-.857-.857l-.001-.78h-.872a.818.818 0 010-1.636h.872v-1.403h-.833a.857.857 0 01-.857-.856v-.156c0-.474.384-.857.857-.857l.833-.001V9.357c0-.473.385-.857.858-.857h3.455zm.036 1.714h-2.494v3.74h2.494a1.87 1.87 0 000-3.74z" fill="currentColor" fill-rule="nonzero"></path>
						</g>
					</svg> 
					{{ title }}
				</v-toolbar-title>
				<v-spacer></v-spacer>
			</v-app-bar>
		</div>
		<v-main class="fill-height">
			<transition
				name="scale"
			>
				<router-view></router-view>
			</transition>
		</v-main>
	</v-app>
</template>
<style>
	
</style>
<script>
	export default {
		data: () => ({
			hide: {
				appBar: false
			},
			title: 'Каталог',
			drawer: false,
		}),
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		},
		mounted() {
			var app = this;

			this.hide.appBar = Laravel.error;
			
			this.$root.$on('changeTitle', function(title) {
				document.title = app.title = title;
			});			
		}
	}
</script>