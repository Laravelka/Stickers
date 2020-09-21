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
		<v-alert v-model="alert" type="success">
			{{ message }}
		</v-alert>
		<v-card
			class="mb-3"
		>
			<v-card-title
				class="headline"
				v-text="sticker.title"
			></v-card-title>
			<v-card-subtitle v-text="sticker.description"></v-card-subtitle>
			<v-card-actions>
				<v-btn
					block
					outlined
					color="primary"
					@click="installSticker"
					:loading="isInstallation"
					v-if="sticker.is_paid == 1"
				>
					Установить
				</v-btn>
				<v-btn
					:to="{
						name: 'payment', 
						params: {
							sticker_id: sticker.id
						}
					}"
					block
					v-else
					outlined
					color="primary"
					v-text="'Купить ' + sticker.price + ' ₽'"
				></v-btn>
			</v-card-actions>
			<v-container fluid>
				<v-row>
					<v-col
						v-for="image in sticker.images"
						:key="image.id"
						class="d-flex child-flex"
						style="padding: 4px!important"
						cols="4"
					>
						<v-card flat tile class="d-flex">
							<v-img
								:src="'/storage' + image.url"
								:lazy-src="'/storage' + image.url"
								aspect-ratio="1"
								style="border-radius: .25rem;"
							>
								<template v-slot:placeholder>
									<v-row
										class="fill-height ma-0"
										align="center"
										justify="center"
									>
										<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
									</v-row>
								</template>
							</v-img>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
	import { isJson, randomInt } from '@/js/helpers/other';
	
	export default {
		data: () => ({
			alert   : false,
			title   : 'Стикер',
			error   : false,
			payUrl  : null,
			loading : true,
			sticker : null,
			message : null,
			isInstallation   : false,
			isCreatedPayment : false,
		}),
		methods: {
			onError(...error) {
				console.log('ERROR: ', error);
			},
			reloadPage() {
				location.reload();
			},
			updateSticker() {
				this.loading = true;
				this.sticker = null;

				this.getSticker();
			},
			getSticker() {
				this.axios.get('/stickers/getById?id=' + this.$route.params.id + '&token=' + Laravel.user.api_token)
					.then(response => {
						this.sticker = (response.data.sticker.length < 1 ? false : response.data.sticker);
						this.$root.$emit('changeTitle', this.sticker.title);
						this.loading = false;
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
			},
			installSticker() {
				var that = this;
				this.isInstallation = true;
				this.axios.get('/stickers/installation?id=' + this.$route.params.id + '&token=' + Laravel.user.api_token)
					.then(response => {
						const { data } = response;

						data.images.forEach((item) => {
							that.uploadToDocs(item.url, item.title);
						});
					})
					.catch(error => {
						const { response } = error;

						this.isInstallation = false;
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
			},
			uploadToDocs(file, title) {
				let that = this;

				bridge.sendPromise("VKWebAppCallAPIMethod", {
					"method": "docs.getUploadServer",
					"request_id": "324nnefj_" + randomInt(10000, 99999),
					"params": {
						"v": 5.122,
						"access_token": Laravel.user.access_token
					}
				})
				.then((result) => {
					const { response } = result;

					console.log('getUploadServer', response);

					this.axios.post('/stickers/sendFiles', {
						file: file,
						id: this.sticker.id, 
						url: response.upload_url,
						token: Laravel.user.api_token
					})
					.then((res) => {
						const { data } = res;

						bridge.sendPromise("VKWebAppCallAPIMethod", {
							"method": "docs.save",
							"request_id": "324nnefj1_" + randomInt(10000, 99999),
							"params": {
								"v": 5.122,
								"file" : data.file,
								"title" : this.sticker.title,
								"access_token": Laravel.user.access_token
							}
						}).then((result) => {
							const { response } = result;

							if (response.graffiti || response.doc)
							{
								this.alert = true;
								this.message = 'Стикеры успешно установлены!';
								this.isInstallation = false;
								
								setTimeout(() => {
									that.alert = false;
									that.message = null;
								}, 2000);
							}
						})
						.catch(this.onError);
					});
				})
				.catch(this.onError);
			}
		},
		created() {
			this.getSticker();
		}
	}
</script>