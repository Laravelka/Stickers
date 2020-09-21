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
	<v-container v-else>
		<div class="ma-4">
			<v-btn rounded color="primary" v-if="user.is_admin == 1" :to="{
			name: 'admin.home'}">
				Панель управления
			</v-btn>
		</div>
		<v-alert v-if="!stickers" type="error">Пока что пусто</v-alert>
		<v-card
			v-else
			class="mb-3"
			:key="index"
			v-for="(stick, index) in stickers"
			:to="{name: 'sticker', params: {id: stick.id}}"
		>
			<div class="d-flex flex-no-wrap justify-space-between">
				<div>
					<v-card-title
						class="headline"
						v-text="stick.title"
					></v-card-title>
					<v-card-subtitle v-text="stick.description"></v-card-subtitle>
					<v-card-actions>
						<v-btn
							block
							outlined
							color="primary"
							v-if="stick.is_paid == 1"
							:to="{
							name: 'sticker', params: {
								id: stick.id
							}
						}">
							Перейти
						</v-btn>
						<v-btn outlined color="primary" v-else v-text="stick.price + ' ₽'" :to="{
							name: 'payment', params: {
								sticker_id: stick.id
							}
						}"></v-btn>
					</v-card-actions>
				</div>
				<v-avatar
					class="ma-3"
					size="125"
					tile
				>
					<v-img :src="'/storage' + stick.url"></v-img>
				</v-avatar>
			</div>
		</v-card>
	</v-container>
</template>

<script>
	import { isJson } from '@/js/helpers/other';

	export default {
		data: () => ({
			user: Laravel.user,
			title: 'Главная',
			error: false,
			loading: true,
			message: null,
			stickers: [],
			isInstallation: false,
		}),
		methods: {
			reloadPage() {
				location.reload();
				sessionStorage.removeItem('getStickers');
			},
			updateStickers() {
				this.loading = true;
				this.stickers = false;

				sessionStorage.removeItem('getStickers');
				this.getStickers();
			},
			getStickers() {
				var app = this;
				var stickers = sessionStorage.getItem('getStickers');

				if (stickers !== null) {
					app.stickers = JSON.parse(stickers);
					app.loading = false;
				} else {
					this.axios.get('/stickers/getAll?token=' + Laravel.user.api_token)
					.then(response => {
						app.stickers = (response.data.stickers.length < 1 ? false : response.data.stickers);
						app.loading = false;
						
						if (app.stickers)
							sessionStorage.setItem('getStickers', JSON.stringify(response.data.stickers));
					})
					.catch(error => {
						const { response } = error;
						app.loading = false;
						// app.error = true;
						
						if (isJson(response.data)) {
							app.message = JSON.parse(response.data).message ? JSON.parse(response.data).message : JSON.parse(response.data);
						} else if (error.response.data.message) {
							app.message = response.data.message;
						} else {
							app.message = response.data;
						}
					});
				}
			},
			installSticker(sticker) {
				this.axios.get('/stickers/installation?id=' + sticker.id + '&token=' + Laravel.user.api_token)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					const { response } = error;

					this.loading = false;
					this.error = true;
					
					if (isJson(response.data)) {
						this.message = JSON.parse(response.data).message ? JSON.parse(response.data).message : JSON.parse(response.data);
					} else if (response.data.message) {
						this.message = response.data.message;
					} else {
						this.message = response.data;
					}
				});
			}
		},
		created() {
			this.updateStickers();
			
			this.$root.$emit('changeTitle', this.title);
		}
	}
</script>