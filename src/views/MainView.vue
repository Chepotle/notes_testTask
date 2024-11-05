<template>
	<div class="main">
		<MainModal
			v-if="modal"
			:error-message="errorMessage"
			:success-message="succesMessage"
			@close-modal="closeModal"
			@reg-user="regUser"
			@auth-user="authUser"
			@reset-messages="resetMessages"
		/>
		<div class="container">
			<MainHeader @open-modal="openModal"/>
			<div class="main__block">
				<div class="main__section">
					<h1>Мои заметки</h1>
					<h2>Не забывай о важном, <br> храни его в облаке.</h2>
				</div>
				<div class="main__section">
					<img class="main__logo" src="@/assets/img/mainLogo.svg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import MainModal from '@/components/MainModal.vue';

export default {
  name: 'MainView',
	components: {
		MainHeader,
		MainModal,
	},
	data() {
		return {
			modal: false,
			succesMessage: '',
			errorMessage: '',
		};
	},
	methods: {
		resetMessages() {
			this.succesMessage = '';
			this.errorMessage = '';
		},
		closeModal() {
			this.modal = false;
			this.resetMessages();
		},
		openModal() {
			this.modal = true;
		},
		async regUser(user) {
			this.resetMessages();
			const sendData = {
				email: user.email,
				password: user.pass,
				confirm_password: user.repeatPass,
			}
			try {
				const response = await fetch('https://dist.nd.ru/api/reg', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(sendData)
				});
				const result = await response.json();
				if (!response.ok) {
          throw new Error(result.message);
        } else {
					this.succesMessage = `Email ${result.email} успешно зарегистрирован`;
				}
			} catch (error) {
				this.errorMessage = error.message;
			}
		},
		async authUser(user) {
			this.resetMessages();
			const sendData = {
				email: user.email,
				password: user.pass,
			}
			try {
				const response = await fetch('https://dist.nd.ru/api/auth', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(sendData),
				});
				const result = await response.json();
				if (!response.ok) {
          throw new Error(result.message);
        } else {
					this.$store.commit('setToken', result);
					localStorage.setItem('token', JSON.stringify(result));
					await this.getUser(this.currentToken);
					this.$router.push('notes');
				}
			} catch (error) {
				this.errorMessage = error.message;
			}
		},
		async getUser() {
			try {
				let response = await fetch('https://dist.nd.ru/api/auth', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${this.token.accessToken}`,
					},
				});
				const result = await response.json();
				this.$store.commit('setUserData', result);
				localStorage.setItem('userData', JSON.stringify(result));
			} catch (error) {
				this.errorMessage = error.message;
			}
		}
	},
	computed: {
		token() {
			return this.$store.getters['getToken'];
		},
	},
}
</script>

<style lang="scss" scoped>
br {
	@include media("max", "md") {
		display: none;
	}
}
.container {
	height: 100vh;
	overflow: hidden;
	@include media("max", "md") {
		min-height: 100vh;
		height: auto;
	}
}
.main {
	position: relative;
	h1 {
		font-weight: 900;
		font-size: 104px;
		line-height: 104px;
		color: #fff;
		margin-bottom: 40px;
		@include media("max", "sm") {
			font-size: 60px;
			margin-top: 40px;
		}
		@include media("max", "sm") {
			margin-top: 40px;
			line-height: 64px;
		}
	}
	h2 {
		font-size: 32px;
		line-height: 48px;
		color: $Grey;
		@include media("max", "sm") {
			font-size: 24px;
			line-height: 36px;
		}
	}
	&__block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		@include media("max", "md") {
			flex-direction: column;
		}
	}
	&__logo {
		max-width: 100%;
		overflow: auto;
	}
	&__section {
		@include media("max", "md") {
			text-align: center;
		}
	}
}
</style>