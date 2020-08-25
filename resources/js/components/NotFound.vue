<template>
	<v-container
		class="text-center"
		fill-height
		style="height: calc(100vh - 100px);"
	>
		<v-row align="center">
			<v-col>
				<h1 class="display-2 red--text mb-3">Упс, 404</h1>
				<p class="mb-3">Страница удалена или не найдена</p>
				<v-btn
					:to="{name: 'home'}"
					dark
				>
					На главную
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {}
</script>