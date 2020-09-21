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
					@click="updateStickers"
				><v-icon left dark>mdi-refresh</v-icon> Обновить</v-btn>
			</div>
			<div class="d-flex w-100 mt-3 align-center justify-center">
				<Alert :type="messageType" :show="message !== null" :time="10000" :styles="{'min-width': '100%'}" @open="alertOpen" @close="alertClose">{{ message }}</Alert>
			</div>
			<v-dialog v-model="dialogOpen" persistent max-width="435px">
				<v-card>
					<v-card-title>
						<span class="headline">Добавить стикеры</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										label="Название"
										v-model="form.title"
										:error="messages.title.state"
										:error-messages="messages.title.label"
										v-on:keyup.enter="createStickers"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-textarea
										label="Описание"
										v-model="form.description"
										:error="messages.description.state"
										:error-messages="messages.description.label"
										v-on:keyup.enter="createStickers"
									></v-textarea>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="Цена"
										type="number"
										v-model="form.price"
										:error="messages.price.state"
										:error-messages="messages.price.label"
										v-on:keyup.enter="createStickers"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<input type="file" hidden multiple ref="files" accept="image/*" @change="listFiles">
									<v-select
										v-model="files"
										:items="files"
										chips
										clearable
										clear-icon="mdi-cancel"
										readonly
										prepend-icon="mdi-attachment"
										multiple
										@click="$refs.files.click()"
										@click:prepend="$refs.files.click()"
										label="Стикеры"
									>
										<template v-slot:selection="data">
											<v-chip
												close
												class="ma-2"
												color="primary"
												text-color="white"
												@click:close="deleteFile(data.index)"
											>
												{{ cutText(data.item) }}
											</v-chip>
										</template>
										<template v-slot:item="data">
											<v-chip
												close
												class="ma-2"
												color="primary"
												text-color="white"
												@click:close="deleteFile(data.index)"
											>
												{{ cutText(data.item) }}
											</v-chip>
										</template>
									</v-select>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn text rounded @click="dialogOpen = false" :disabled="btnLoading">Отмена</v-btn>
						<v-btn v-if="!btnLoading" color="indigo" dark rounded @click="createStickers" :loading="btnLoading">Создать</v-btn>
						<v-btn color="indigo" dark rounded disable v-else>{{ percent }}%</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-col width="100%" v-if="stickers">
				<v-card tile>
					<v-list two-line>
						<v-subheader>{{ title }}</v-subheader>
						<v-list-item-group v-model="stickers">
							<v-list-item
								v-for="(sticker, i) in stickers"
								:key="i"
								:to="{
									name: 'sticker', params: {
										id: sticker.id
									}
							}">	
								<v-list-item-avatar>
									<v-img :src="'/storage' + sticker.images[0].url"></v-img>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="d-flex justify-space-between" @click="return;">{{ sticker.title }}</v-list-item-title>
									<v-list-item-subtitle v-text="sticker.description"></v-list-item-subtitle>
								</v-list-item-content>
								<v-list-item-action>
									<v-btn icon v-on:click.prevent="deleteSticker(sticker.id)">
										<v-icon color="primary">mdi-delete</v-icon>
									</v-btn>
								</v-list-item-action>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
		<v-btn
			fab
			dark
			fixed
			bottom
			right
			color="primary"
			@click="dialogOpen = true"
		>
			<v-icon>mdi-plus</v-icon>
		</v-btn>
	</v-container>
</template>
<script>
	import { isJson, cutText, ArrUnset } from '@/js/helpers/other';
	
	export default {
		data: () => ({
			files: [],
			images: [],
			percent: 0,
			error: false,
			loading: true,
			stickers: false,
			title: 'Стикеры',
			btnLoading: false,
			dialogOpen: false,
			messages: {
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
			},
			form: {
				title: null,
				price: null,
				images: [],
				description: null,
			},
			message: null,
			messageType: 'error'
		}),
		created() {
			this.getStickers();
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
			deleteFile(index) {
				this.$delete(this.files, index);
				this.$delete(this.form.images, index);
			},
			deleteSticker(id) {
				console.log(id);
				
				this.axios.delete('admin/stickers/delete?id=' + id + '&token=' + Laravel.user.api_token)
					.then(response => {
						const { data } = response;
					
						this.message = data.message;
						this.messageType = 'success';
					
						this.updateStickers();
					})
					.catch(error => {
						const { response } = error;
						const { data } = response;

						this.loading = false;
						this.messageType = 'error';

						if (isJson(response.data)) {
							this.message = JSON.parse(response.data).message ? JSON.parse(response.data).message : JSON.parse(response.data);
						} else if (error.response.data.message) {
							this.message = response.data.message;
						} else {
							this.message = response.data;
						}
					});
			},
			updateStickers() {
				this.loading = true;
				this.stickers = false;

				sessionStorage.removeItem('getAdminStickers');
				this.getStickers();
			},
			getStickers() {
				var app = this;
				var stickers = sessionStorage.getItem('getAdminStickers');

				if (stickers !== null) {
					app.stickers = JSON.parse(stickers);
					app.loading = false;
				} else {
					this.axios.get('admin/stickers/getAll?token=' + Laravel.user.api_token)
					.then(response => {
						const { data } = response;
						
						app.stickers = (data.stickers.length < 1 ? false : data.stickers);
						app.loading = false;
						
						if (app.stickers)
							sessionStorage.setItem('getAdminStickers', JSON.stringify(data.stickers));
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
			createStickers() {
				var that = this;
				let formData = new FormData();
				
				this.btnLoading = true;
				for(let item in this.form) {
					if (item == 'images')
					{
						if (this.form[item].length > 0)
						{
							for(let i = 0; i < this.form[item].length; i++)
							{
								let img = this.form[item][i];
								
								formData.append(item + '.' + i, img);
							}
						}
					}
					else
					{
						if (this.form[item] !== null)
							formData.append(item, this.form[item]);
					}
				}
				
				this.axios.post('admin/stickers/create', formData, {
					onUploadProgress: (e) => {
						this.percent = Math.round(e.loaded / e.total * 100);
					}
				})
				.then(response => {
					const { data } = response;
					
					this.btnLoading = false;
					this.dialogOpen = false;
					this.message = data.message;
					this.messageType = 'success';
					
					this.form = {
						title: null,
						price: null,
						images: [],
						description: null,
					};
					this.files = [];
					this.updateStickers();
					this.percent = 0;
				})
				.catch((error) => {
					const { response } = error;
					const { data } = response;
					
					this.messageType = 'error';
					
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
					this.btnLoading = false;
				});
			},
			listFiles(e) {
				this.files = [];
				
				let newFiles = [];
				for (let i = 0; i < e.target.files.length; i++) {
					let file = e.target.files[i];
					
					this.files.push(file.name);
					
					for (let j = 0; j < this.files.length; j++) {
						let thisFile = this.files[j];
						
						if (file.name === thisFile) newFiles.push(file);
					}
				}
				this.form.images = newFiles;
			}
		}
	}
</script>