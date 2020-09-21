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
		<v-card>
			<form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml" target="_blank">
				<v-card-title>
					<span class="headline" small>Покупка стикеров {{ sticker.title }}</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<img
								:src="image"
								style="width: 100px; float:left; margin-left:-9px; margin-right: 20px; margin-bottom:0px;"
							>
							<v-radio-group v-model="radios" @change="onChange" name="paymentType">
								<v-radio label="Яндекс.деньги" value="PC"></v-radio>
								<v-radio label="Картой" value="AC"></v-radio>
								<v-radio label="С мобильного" value="MC"></v-radio>
								<v-radio label="Qiwi кошельком" value="qiwi"></v-radio>
							</v-radio-group>
							<v-text-field v-for="(input, i) in inputs" v-show="input.show" :name="input.key" :value="input.value" :key="i" v-model="inputs[i].value"></v-text-field>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						dark
						rounded
						type="submit"
						color="primary"
						:loading="btnLoading"
						v-if="(this.radios == 'qiwi')"
						@click.prevent="createQiwiPayment"
					>
						Оплатить {{ sticker.price + ' ₽' }}
					</v-btn>
					<v-btn type="submit" v-else color="primary" dark rounded>Оплатить {{ sticker.price + ' ₽' }}</v-btn>
				</v-card-actions>
			</form>
   		</v-card>
	</v-container>
</template>
<script>
	import { isJson } from '@/js/helpers/other';

	export default {
		data: () => ({
			title: 'Покупка стикеров',
			radios: 'PC',
			image: '/img/yandex.svg',
			sticker: null,
			error: false,
			loading: true,
			btnLoading: false,
			message: null,
			inputs: [],
			iframeSrc: null,
		}),
		methods: {
			log(...data) {
				console.log(...data);
			},
			reloadPage() {
				location.reload();
			},
			onChange() {
				if (this.radios == 'PC')
					this.image = '/img/yandex.svg';
				else if (this.radios == 'AC')
					this.image = '/img/cards.svg';
				else if (this.radios == 'MC')
					this.image = '/img/mobile.svg';
				else if (this.radios == 'qiwi')
					this.image = '/img/qiwi.svg';
			},
			getSticker() {
				this.axios.get('/stickers/getById?id=' + this.$route.params.sticker_id + '&token=' + Laravel.user.api_token)
					.then(response => {
						this.sticker = (response.data.sticker.length < 1 ? false : response.data.sticker);
						this.loading = false;

						this.inputs = [
							{key: 'sum', value: this.sticker.price},
							{key: 'label', value: Laravel.user.id + '|' + this.sticker.id},
							{key: 'receiver', value: '410012710005837'},
							{key: 'quickpay-form', value: 'shop'},
							{key: 'need-fio', value: 'false'},
							{key: 'need-email', value: 'false'},
							{key: 'need-phone', value: 'false'},
							{key: 'successURL', value: 'https://vk.com/app' + Laravel.appId + '#/sticker/' + this.sticker.id},
							{key: 'need-address', value: 'false'},
							{key: 'targets', value: 'Стикеры ' + this.sticker.title},
							{key: 'formcomment', value: 'Покупка стикеров ' + this.sticker.title},
						];
					})
					.catch(error => {
						this.loading = false;
						this.error = true;
						
						if (isJson(error.response.data)) {
							this.message = JSON.parse(error.response.data).message ? JSON.parse(error.response.data).message : JSON.parse(error.response.data);
						} else if (error.response.data.message) {
							this.message = error.response.data.message;
						} else {
							this.message = error.response.data;
						}
					});
			},
			createQiwiPayment() {
				this.btnLoading = true;
				this.axios.post('/qiwi/invoicing', {
					token: Laravel.user.api_token,
					sticker_id: this.sticker.id
				})
				.then(response => {
					this.btnLoading = false;
					window.open(response.data.url);
				})
				.catch(error => {
					this.loading = false;
					this.error = true;
					
					if (isJson(error.response.data)) {
						this.message = JSON.parse(error.response.data).message ? JSON.parse(error.response.data).message : JSON.parse(error.response.data);
					} else if (error.response.data.message) {
						this.message = error.response.data.message;
					} else {
						this.message = error.response.data;
					}
				});
			}
		},
		async mounted() {
			await this.getSticker();

			this.$root.$emit('changeTitle', this.title);
		}
	}
</script>