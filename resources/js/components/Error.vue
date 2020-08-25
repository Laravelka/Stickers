<template>
	<v-container
		class="text-center"
		fill-height
		style="height: calc(100vh - 100px);"
	>
		<v-row align="center">
			<v-col>
				<h1 class="display-2 red--text mb-3">Упс, ошибка</h1>
				<p class="mb-3">{{ getMessage() }}</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		data: () => ({

		}),
		methods: {
			getMessage() {
				if (Laravel.error)
					return Laravel.message;
				else
					return 'Зайдите чуть позже или обновите страницу.';
			}
		}
	}
</script>