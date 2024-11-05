import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const routes = [
	{
		path: '/',
		name: 'main',
		component: MainView
	},
	{
		path: '/notes',
		name: 'notes',
		component: () => import('@/views/NotesView.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
