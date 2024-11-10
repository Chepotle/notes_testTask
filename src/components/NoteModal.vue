<template>
	<div @click="closeModal" class="modal">
		<div @click.stop class="modal__content">
			<button @click="closeModal" class="modal__close">
				<img src="@/assets/icons/close.svg" alt="">
			</button>
			<div class="modal__header">Добавление <br> заметки</div>
			<form @submit.prevent="addNote" class="modal__form">
				<div class="modal__field">
					<label for="1" class="modal__label">Название заметки</label>
					<input required v-model="newNote.title" id="1" class="modal__input" maxlength="100" placeholder="Введите название" type="text">
					<div class="modal__counter">{{ `${newNote.title.length}/100` }}</div>
				</div>
				<div class="modal__text">
					<label for="2" class="modal__label">Текст заметки</label>
					<textarea v-model="newNote.content" id="2" class="modal__area" maxlength="255" placeholder="Введите текст"></textarea>
					<div class="modal__counter">{{ `${newNote.content.length}/255` }}</div>
				</div>
				<div class="modal__info">
					<button type="submit" class="modal__btn">Добавить</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NoteModal',
	emits: ['closeModal', 'addNote'],
	data() {
		return {
			newNote: {
				title: '',
				content: '',
			},
		};
	},
	methods: {
		closeModal() {
			this.$emit('closeModal');
		},
		addNote() {
			this.$emit('addNote', this.newNote);
		},
	},
}
</script>

<style lang="scss" scoped>
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
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding: 80px;
		border-radius: 40px;
		@include media("max", "xl") {
			padding: 56px;
			max-width: 594px;
		}
		@include media("max", "lg") {
			max-width: 688px;
		}
		@include media("max", "sm") {
			padding: 24px 16px;
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
		br {
			display: none;
		}
		@include media("max", "xl") {
			br {
				display: inline;
			}
			text-align: start;
		}
		@include media("max", "md") {
			br {
				display: none;
			}
			@include media("max", "sm") {
				font-size: 32px;
				margin-bottom: 28px;
				br {
				display: inline;
			}
			}
		}
	}
	&__field {
		margin-bottom: 24px;
		position: relative;
		@include media("max", "sm") {
			margin-bottom: 16px;
		}
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
		padding: 22.5px 28px 22.5px 28px;
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
		justify-content: flex-end;
		align-items: center;
		margin-bottom: 20px;
		@include media("max", "sm") {
			margin-top: 28px;
			margin-bottom: 0;
		}
	}
	&__btn {
		@include media("max", "sm") {
			width: 100%;
			margin-bottom: 0;
		}
	}
	&__counter {
		text-align: end;
		margin-top: 8px;
		margin-right: 24px;
		font-size: 18px;
		color: $Grey;
	}
	&__area {
		height: 186px;
		width: 100%;
		resize: none;
		border-radius: 36px;
		padding: 16px 28px;
		font-size: 18px;
		color: $Dark;
		scroll-margin-block-end: 15px;
		scroll-margin-block-start: 15px;
		&::-webkit-scrollbar {
        background-color: #f5f5f5;
        width: 5px;
				border-radius: 25px;
        }
    &::-webkit-scrollbar-thumb {
        background-color: $Grey;
        border-radius: 25px;
    }
		&::placeholder {
			color: $Grey;
		}
		&:focus {
			outline: 2px $GreenLight solid;
			outline-offset: -2px;
		}
	}
}
</style>