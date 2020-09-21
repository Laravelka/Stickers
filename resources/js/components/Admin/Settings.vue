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
					@click="updateConfigs"
				><v-icon left dark>mdi-refresh</v-icon> Обновить</v-btn>
			</div>
			<div class="d-flex w-100 mt-3 align-center justify-center">
				<Alert :type="messageType" :show="message !== null" :time="10000" :styles="{'min-width': '100%'}" @open="alertOpen" @close="alertClose">{{ message }}</Alert>
			</div>
			<v-col cols="12">
				<v-card>
					<v-card-title>
						<span class="headline">Редактировать настройки</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										label="Qiwi secret"
										v-model="form['qiwi_secret']"
										:error="messages['qiwi_secret'].state"
										:error-messages="messages['qiwi_secret'].label"
										v-on:keyup.enter="editConfigs"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="Qiwi public"
										v-model="form['qiwi_public']"
										:error="messages['qiwi_secret'].state"
										:error-messages="messages['qiwi_public'].label"
										v-on:keyup.enter="editConfigs"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="VK appId"
										v-model="form['vk_appId']"
										:error="messages['vk_appId'].state"
										:error-messages="messages['vk_appId'].label"
										v-on:keyup.enter="editConfigs"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="VK secret"
										v-model="form['vk_secretKey']"
										:error="messages['vk_secretKey'].state"
										:error-messages="messages['vk_secretKey'].label"
										v-on:keyup.enter="editConfigs"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="VK service"
										v-model="form['vk_serviceKey']"
										:error="messages['vk_serviceKey'].state"
										:error-messages="messages['vk_serviceKey'].label"
										v-on:keyup.enter="editConfigs"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="VK token"
										v-model="form['vk_accessToken']"
										:error="messages['vk_accessToken'].state"
										:error-messages="messages['vk_accessToken'].label"
										v-on:keyup.enter="editConfigs"
									></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="indigo" dark rounded @click="editConfigs">Редактировать</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	import { isJson, cutText, ArrUnset } from '@/js/helpers/other';
	
	export default {
		data: () => ({
			error: false,
			loading: false,
			title: 'Настройки',
			messages: {
				'qiwi_public': {
					state: false,
					label: []
				},
				'qiwi_secret': {
					state: false,
					label: []
				},
				'vk_appId': {
					state: false,
					label: []
				},
				'vk_secretKey': {
					state: false,
					label: []
				},
				'vk_serviceKey': {
					state: false,
					label: []
				},
				'vk_accessToken': {
					state: false,
					label: []
				}
			},
			form: {
				'qiwi_public': null,
				'qiwi_secret': null,
				'vk_appId': null,
				'vk_secretKey': null,
				'vk_serviceKey': null,
				'vk_accessToken': null,
			},
			message: null,
			messageType: 'error'
		}),
		created() {
			this.getConfigs();
			this.$root.$emit('changeTitle', this.title);
		},
		methods: {
			alertOpen(e) {
				this.dialogOpen = false;
			},
			alertClose(e) {
				this.message = null;
				this.messageType = 'error';
			},
			cutText(text, limit = 15) {
				return cutText(text, limit);
			},
			getConfigs() {
				var app = this;
				var configs = sessionStorage.getItem('getConfigs');

				if (configs !== null) {
					app.form = JSON.parse(configs);
					app.loading = false;
				} else {
					this.axios.get('/admin/settings/getAll?token=' + Laravel.user.api_token)
					.then(response => {
						const { data } = response;
						
						app.form = (data.configs.length < 1 ? false : data.configs);
						app.loading = false;
						
						if (app.form['qiwi_public'])
							sessionStorage.setItem('getConfigs', JSON.stringify(data.configs));
					})
					.catch(error => {
						const { response } = error;
						const { data } = response;
						app.loading = false;
						
						if (data.message) {
							app.message = data.message;
						} else if (isJson(data)) {
							app.message = JSON.parse(data).message ? JSON.parse(data).message : JSON.parse(data);
						} else {
							app.message = data;
						} 
					});
				}
			},
			updateConfigs() {
				this.loading = true;
				this.form = {
					'qiwi_public': null,
					'qiwi_secret': null,
					'vk_appId': null,
					'vk_secretKey': null,
					'vk_serviceKey': null,
					'vk_accessToken': null,
				};

				sessionStorage.removeItem('getConfigs');
				this.getConfigs();
			},
			editConfigs() {
				this.axios.post('admin/settings/update', this.form)
				.then(response => {
					const { data } = response;
					
					this.dialogOpen = false;
					this.message = data.message;
					this.messageType = 'success';
				})
				.catch((error) => {
					const { response } = error;
					const { data } = response;
					
					if (data.messages)
					{
						for( let index in data.messages)
						{
							this.messages[index].state = true;
							this.messages[index].label = data.messages[index][0];
						}
						setTimeout(function() {
							that.messages = {
								title: {
									state: false,
									label: []
								},
								description: {
									state: false,
									label: []
								},
								price: {
									state: false,
									label: []
								},
								images: {
									state: false,
									label: []
								}
							};
						}, 5000);
					}
					else if (data.message)
					{
						this.message = data.message;
					}
					else
					{
						this.dialogOpen = false;
						this.error = true;
					}
				});
			}
		}
	}
</script>