<template>
	<v-alert v-model="show" :type="type" dark dismissible :style="styles" elevation="3">
		<div v-if="message">
			{{ message }}
		</div>
		<div v-else>
			<slot></slot>
		</div>
	</v-alert>
</template>
<script>
	export default {
		name: 'Alert',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'success'
			},
			time: {
				type: Number,
				default: 3000
			},
			styles: {
				type: [Object, String]
			},
			message: {
				type: [String, Boolean],
				default: false,
			}
		},
		data: function () {
  			return {}
		},
		watch: {
			show(newValue, oldValue) {
				var that = this;
				
				console.log(newValue);
				
				if (newValue)
				{
					this.$emit('open', new Date());
					if (this.time != false)
					{
						setTimeout(() => {
							console.log(that.show);
							
							that.$emit('close', new Date());
						}, this.time)
					}
				}
			}
		},
		created() {
			var that = this;
			
			if (this.show)
			{
				this.$emit('open', new Date());
				if (this.time != false)
				{
					setTimeout(() => {
						that.$emit('close', new Date());
					}, this.time)
				}
			}
		}
	};
</script>