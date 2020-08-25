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
        props: {
            source: String,
        },
		data: () => ({
			title: 'Админ панель',
			item: 1,
			items: [
				{ text: 'Пользователи', icon: 'mdi-account-multiple', to: '/admin/users' },
				{ text: 'Администраторы', icon: 'mdi-account-multiple', to: '/admin/admins' },
			],
		}),
		created() {
			this.$root.$emit('changeTitle', this.title);
		}
	}
</script>
