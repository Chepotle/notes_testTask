<template>
	<div class="header">
		<img class="header__logo" src="@/assets/img/headerLogo.svg" alt="">
		<button v-if="!currentUser?.email" @click="$emit('openModal')" class="header__btn">
			<img class="header__btn-img" src="@/assets/icons/login.svg" alt="">
			<span>Вход</span>
		</button>
		<div v-else class="header__user">
			<span class="header__email">{{ currentUser?.email }}</span>
			<img @click="showExit = !showExit" src="@/assets/img/user.svg" alt="">
			<div v-if="showExit" class="header__exit">
				<span @click="exit">Выйти</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainHeader',
	data() {
		return {
			showExit: false,
		};
	},
	methods: {
		async exit() {
			try {
				await fetch('https://dist.nd.ru/api/auth', {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${this.token.accessToken}`,
					},
				});
				delete localStorage.token;
				delete localStorage.userData;
				this.$store.commit('setUserData', null);
				this.$store.commit('setToken', null);
				this.$router.push('/');
			} catch (error) {
				console.log(error.message);
			}
		},
	},
	computed: {
		currentUser() {
			return this.$store.getters['getUserData'];
		},
		token() {
			return this.$store.getters['getToken'];
		},
	},
}
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 40px 0;
	&__logo {
		max-width: 100%;
		overflow: auto;
		@include media("max", "sm") {
			padding-right: 22px;
		}
	}
	&__btn {
		padding: 12px 24px;
		border-radius: 32px;
		background-color: $GreenLight;
		font-weight: 500;
		font-size: 20px;
		color: #fff;
		white-space: nowrap;
		transition-duration: .2s;
		&:hover {
			background-color: $GreenMiddle;
		}
		&:active {
			background-color: $GreenDark;
		}
	}
	&__btn-img {
		height: 32px;
		width: 32px;
		margin-right: 12px;
	}
	&__user {
		position: relative;
		span {
			color: #fff;
			margin-right: 12px;
		}
		img {
			width: 56px;
			height: 56px;
			cursor: pointer;
		}
	}
	&__email {
		@include media("max", "sm") {
				&:first-child {
					display: none;
				}
			}
	}
	&__exit {
		position: absolute;
		right: 0;
		z-index: 10;
		bottom: -129px;
		width: 145px;
		height: 108px;
		border-radius: 12px;
		display: flex;
		background-color: $DarkMiddle;
		box-shadow: 0px 15px 46px -10px rgba(0, 15, 0, 0.6);
		transition-duration: .2s;
		&::before {
			content: '';
			width: 14px;
			height: 14px;
			position: absolute;
			transform: rotate(45deg);
			top: -7px;
			right: 20px;
			background-color: inherit;
		}
		span {
			font-size: 18px;
			font-weight: 700;
			color: $GreenLight;
			margin: auto;
			cursor: pointer;
		}
	}
}
</style>