const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import "@/assets/scss/variables/colors.scss";
					@import "@/assets/scss/mixins/media.scss";
					@import "@/assets/scss/global.scss";
				`
			}
		}
	},
})
