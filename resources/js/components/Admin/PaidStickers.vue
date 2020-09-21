<template>
	<v-container
		class="text-center"
		fill-height
		style="height: calc(100vh - 100px);" 
		v-if="loading"
	>
		<v-row align="center">
			<v-col class="loading" align="center">
				<v-progress-circular
					:size="50"
					:width="4"
					color="primary"
					indeterminate
				></v-progress-circular>
			</v-col>
		</v-row>
	</v-container>
	<v-container
		class="text-center"
		fill-height
		style="height: calc(100vh - 100px);" 
		v-else-if="error"
	>
		<v-row align="center">
			<v-col class="loading">
				<h2 class="red--text lighten-2">
					Упс, ошибка
				</h2>
				<p>
					Зайдите чуть позже или обновите страницу
				</p>
				<v-btn @click="reloadPage" dark>Обновить</v-btn>
			</v-col>
		</v-row>
	</v-container>
    <v-container class="pa-3" v-else>
		<v-row dense class="mb-7" align="center">
			<div class="d-flex w-100 align-center justify-center">
				<v-btn
					text
					@click="updatePaids"
				><v-icon left dark>mdi-refresh</v-icon> Обновить</v-btn>
			</div>
			<div class="d-flex w-100 mt-3 align-center justify-center">
				<Alert :type="messageType" :show="message !== null" :time="5000" :styles="{'min-width': '100%'}" @open="alertOpen" @close="alertClose">{{ message }}</Alert>
			</div>
			<v-col width="100%" v-if="paids">
				<v-card tile>
					<v-list>
						<v-subheader>{{ title }}</v-subheader>
						<v-list-item-group v-model="paids">
							<v-list-item
								v-for="(paid, i) in paids"
								:key="i"
								@click.prevent="goToProfile(paid)"
							>	
								<v-list-item-avatar>
									<v-img :src="paid.avatar"></v-img>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="d-flex justify-space-between" @click="return;">{{ paid.nick }}</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action>
									{{ paid.price }} ₽
								</v-list-item-action>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	import { isJson } from '@/js/helpers/other';
	
	export default {
		data: () => ({
			error: false,
			loading: true,
			paids: false,
			title: 'Платежи',
			message: null,
			messageType: 'error'
		}),
		created() {
			this.getPaids();
			this.$root.$emit('changeTitle', this.title);
		},
		methods: {
			alertOpen(e) {
				this.loading = false;
			},
			alertClose(e) {
				this.message = null;
				this.messageType = 'error';
			},
			updatePaids() {
				this.loading = true;
				this.paids = false;

				sessionStorage.removeItem('getPaids');
				this.getPaids();
			},
			getPaids() {
				var app = this;
				var paids = sessionStorage.getItem('getPaids');

				if (paids !== null) {
					app.paids = JSON.parse(paids);
					app.loading = false;
				} else {
					this.axios.get('admin/stickers/getPaid?token=' + Laravel.user.api_token)
					.then(response => {
						const { data } = response;
						
						app.paids = (data.paids.length < 1 ? false : data.paids);
						app.loading = false;
						
						if (app.paids)
							sessionStorage.setItem('getPaids', JSON.stringify(data.paids));
					})
					.catch(error => {
						const { response } = error;
						const { data } = response;
						
						this.loading = false;
						this.messageType = 'error';
						
						if (isJson(data)) {
							this.message = JSON.parse(data).message ? JSON.parse(data).message : JSON.parse(data);
						} else if (data.message) {
							this.message = data.message;
						} else {
							this.message = data;
						}
					});
				}
			},
			goToProfile(paid) {
				window.open('https://vk.com/id' + paid.vk_id);
				
				this.updatePaids();
			}
		}
	}
</script>