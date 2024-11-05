<template>
	<div @click="closeModal" class="modal">
		<div @click.stop class="modal__content">
			<button @click="closeModal" class="modal__close">
				<img src="@/assets/icons/close.svg" alt="">
			</button>
			<div class="modal__header">{{ heaerText }}</div>
			<form @submit.prevent="sendData" class="modal__form">
				<div class="modal__field">
					<label for="1" class="modal__label">Email</label>
					<input required v-model="user.email" id="1" class="modal__input" placeholder="Введите значение" type="email">
				</div>
				<div class="modal__field">
					<label for="2" class="modal__label">Пароль</label>
					<input required v-model="user.pass" :type="showPass ? 'text' : 'password'" id="2" class="modal__input" placeholder="Введите пароль">
					<img @click="showPass = !showPass" :src="require(showPass ? '@/assets/icons/passOn.svg' : '@/assets/icons/passOff.svg')" class="modal__pass-icon" alt="">
				</div>
				<div v-if="!authMode" class="modal__field">
					<label for="3" class="modal__label">Пароль ещё раз</label>
					<input required v-model="user.repeatPass" :type="showRepeatPass ? 'text' : 'password'" id="3" class="modal__input" placeholder="Введите пароль">
					<img @click="showRepeatPass = !showRepeatPass" :src="require(showRepeatPass ? '@/assets/icons/passOn.svg' : '@/assets/icons/passOff.svg')" class="modal__pass-icon" alt="">
				</div>
				<div class="modal__info">
					<div class="modal__text">
						<span>{{ authMode ? 'У вас нет аккаунта?' : 'У вас есть аккаунт?' }}</span>
						<span @click="changeMode">{{ authMode ? 'Зарегистрируйтесь' : 'Войдите' }}</span>
					</div>
					<button type="submit" class="modal__btn">{{authMode ? 'Войти' : 'Зарегистрироваться'}}</button>
				</div>
				<div v-if="errorMessage || successMessage" class="modal__message">
					<span v-if="errorMessage" class="modal__error">{{ errorMessage }}</span>
					<span v-if="successMessage" class="modal__success">{{ successMessage }}</span>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainModal',
	props: {
		errorMessage: {
			type: String,
			required: false,
		},
		successMessage: {
			type: String,
			required: false,
		},
	},
	emits: ['closeModal', 'regUser', 'authUser', 'resetMessages'],
	data() {
		return {
			authMode: true,
			user: {
				email: '',
				pass: '',
				repeatPass: '',
			},
			showPass: false,
			showRepeatPass: false,
		};
	},
	methods: {
		sendData() {
			if (this.authMode) {
				this.$emit('authUser', this.user);
			} else {
				this.$emit('regUser', this.user);
			}
		},
		changeMode() {
			this.authMode = !this.authMode;
			this.user.email = '';
			this.user.pass = '';
			this.user.repeatPass = '';
			this.$emit('resetMessages');
		},
		closeModal() {
			this.$emit('closeModal');
		},
	},
	computed: {
		heaerText() {
			if (this.authMode) {
				return 'Вход в ваш аккаунт'
			} else {
				return 'Регистрация'
			}
		},
	},
}
</script>

<style lang="scss">
.modal {
	width: 100%;
	height: 100%;
	background-color: rgba(27, 47, 70, 0.5);
	position: absolute;
	z-index: 10;
	&__content {
		z-index: 15;
		background-color: $DarkMiddle;
		max-width: 780px;
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding: 80px;
		border-radius: 40px;
		@include media("max", "xl") {
			max-width: 594px;
			padding: 56px;
		}
		@include media("max", "sm") {
			padding: 90px 16px;
		}
	}
	&__close {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background-color: $GreenLight;
		position: absolute;
		top: 20px;
		right: 20px;
		transition-duration: .2s;
		&:hover {
			background-color: $GreenMiddle;
		}
		&:active {
			background-color: $GreenDark;
		}
		img {
			width: 16px;
			height: 16px;
		}
	}
	&__header {
		font-weight: 600;
		font-size: 48px;
		text-align: center;
		color: #fff;
		margin-bottom: 40px;
		@include media("max", "sm") {
			font-size: 32px;
			margin-bottom: 28px;
		}
	}
	&__field {
		margin-bottom: 24px;
		position: relative;
	}
	&__label {
		margin-left: 24px;
		font-size: 18px;
		color: $Grey;
		line-height: 28px;
	}
	&__input {
		width: 100%;
		height: 72px;
		border-radius: 32px;
		background-color: #fff;
		padding: 22.5px 58px 22.5px 28px;
		font-size: 18px;
		color: $Dark;
		&::placeholder {
			color: $Grey;
		}
		&:focus {
			outline: 2px $GreenLight solid;
			outline-offset: -2px;
		}
	}
	&__info {
		margin-top: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		@include media("max", "sm") {
			flex-direction: column-reverse;
			align-items: normal;
		}
	}
	&__pass-icon {
		width: 18px;
		height: 14px;
		position: absolute;
		right: 28px;
		bottom: 29px;
		z-index: 20;
		cursor: pointer;
	}
	&__btn {
		padding: 12px 24px;
		border-radius: 32px;
		background-color: $GreenLight;
		font-weight: 500;
		font-size: 20px;
		color: #fff;
		transition-duration: .2s;
		&:hover {
			background-color: $GreenMiddle;
		}
		&:active {
			background-color: $GreenDark;
		}
		@include media("max", "sm") {
			margin-bottom: 12px;
		}
	}
	&__text {
		@include media("max", "sm") {
			text-align: center;
		}
	}
	&__text span:first-child {
		font-size: 18px;
		color: $Grey;
	}
	&__text span:last-child {
		font-size: 18px;
		color: $GreenLight;
		font-weight: 700;
		margin-left: 4px;
		cursor: pointer;
	}
	&__message {
		background-color: #323649;
		padding: 8px 20px;
		width: 100%;
		border-radius: 24px;
		font-size: 18px;
	}
	&__success {
		color: $Green;
	}
	&__error {
		color: #FF7461;
	}
}

</style>