<template>
	<div class="notes">
		<NoteModal
			v-if="modal"
			@close-modal="closeModal"
			@add-note="addNote"
		/>
		<div @click="modal = true" class="notes__add">
			<img src="@/assets/icons/plus.svg" alt="">
		</div>
		<div class="container">
			<MainHeader/>
			<div class="notes__list">
				<div v-for="note in notes" :key="note.id" class="notes__item">
					<div class="notes__header">{{ note.title }}</div>
					<div class="notes__text">{{ note.content }}</div>
					<div class="notes__panel">
						<div @click="deleteNote(note.id)" class="notes__delete">
							<img src="@/assets/icons/close.svg" alt="">
							<span>Удалить</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import NoteModal from '@/components/NoteModal.vue';

export default {
	name: 'NotesView',
	components: {
		MainHeader,
		NoteModal,
	},
	data() {
		return {
			modal:false,
			notes: null,
		};
	},
	methods: {
		async addNote(newNote) {
			await this.createNote(newNote);
			this.closeModal();
			this.getNotes();
		},
		closeModal() {
			this.modal = false;
		},
		async getNotes() {
			try {
				let response = await fetch('https://dist.nd.ru/api/notes', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${this.token.accessToken}`,
						'Content-Type': 'application/json;charset=utf-8'
					},
				});
				this.notes = await response.json();
			} catch (error) {
				console.log(error.message);
			}
		},
		async createNote(newNote) {
			try {
				await fetch('https://dist.nd.ru/api/notes', {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${this.token.accessToken}`,
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(newNote),
				});
			} catch (error) {
				console.log(error.message);
			}
		},
		async deleteNote(id) {
			const url = 'https://dist.nd.ru/api/notes/' + id
			try {
				await fetch(url, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${this.token.accessToken}`,
					},
				});
				this.getNotes();
			} catch (error) {
				console.log(error.message);
			}
		},
	},
	computed: {
		token() {
			return this.$store.getters['getToken'];
		},
	},
	mounted() {
		this.getNotes();
	}
}
</script>

<style lang="scss" scoped>
.notes {
	position: relative;
	overflow: hidden;
	&__add {
		z-index: 10;
		box-shadow: 0px 15px 46px -10px rgba(0, 15, 0, 0.6);
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background-color: $GreenLight;
		position: fixed;
		right: 40px;
		bottom: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		@include media("max", "md") {
			right: 8px;
		}
		cursor: pointer;
		img {
			width: 16px;
			height: 16px;
		}
	}
	&__list {
		display: grid;
		grid-gap: 40px;
		grid-row-gap: 40px;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: minmax(0, auto);
		align-items: start;
		padding-bottom: 40px;
		@include media("max", "xl") {
			grid-gap: 20px;
			grid-row-gap: 20px;
		}
		@include media("max", "lg") {
			grid-template-columns: 1fr 1fr;
		}
		@include media("max", "md") {
			grid-template-columns: 1fr;
		}
		
	}
	&__item {
		background-color: $GreenLight;
		color: #fff;
		border-radius: 12px;
		position: relative;
		&::before {
			content: '';
			position: absolute;
			width: 40px;
			height: 40px;
			background-color: $Green;
			top: 0;
			right: 0;
			border-bottom-left-radius: 12px;
		}
		&::after {
			content: '';
			position: absolute;
			width: 60px;
			height: 60px;
			background-color: $Dark;
			top: -31px;
			right: -31px;
			transform: rotate(45deg);
		}
	}
	&__header {
		font-size: 24px;
		font-weight: 600;
		padding: 20px 56px 20px 28px;
		border-bottom: 1px solid $GreenMiddle;
		word-break: break-word;
	}
	&__text {
		font-size: 20px;
		font-weight: 500;
		padding: 20px 28px;
		word-break: break-word;
	}
	&__panel {
		text-align: end;
		margin-bottom: 8px;
		margin-right: 8px;
	}
	&__delete {
		display: inline-flex;
		align-items: center;
		padding: 12px 24px;
		font-size: 20px;
		font-weight: 500;
		cursor: pointer;
		img {
			margin-right: 12px;
		}
	}
}
</style>
