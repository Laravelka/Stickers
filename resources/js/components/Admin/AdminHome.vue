<template>
	<v-container>
		<v-row align="center">
			<v-col width="100%">
				<v-card tile>
					<v-list shaped>
						<v-subheader>Основное</v-subheader>
						<v-list-item-group v-model="item">
							<v-list-item
								v-for="(item, i) in items"
								:key="i"
								:to="item.to"
							>
								<v-list-item-icon>
									<v-icon v-text="item.icon"></v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title v-text="item.text"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	export default {
		data: () => ({
			title: 'Панель',
			item: 0,
			items: [
				{ text: 'Настройки', icon: 'mdi-cog', to: '/admin/settings' },
				{ text: 'Стикеры', icon: 'mdi-sticker-emoji', to: '/admin/stickers' },
				{ text: 'Платежи', icon: 'mdi-credit-card-outline', to: '/admin/paidStickers' },
			],
		}),
		created() {
			this.$root.$emit('changeTitle', this.title);
		}
	}
</script>
