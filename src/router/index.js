import { createRouter, createWebHistory } from 'vue-router'
const vCalendarMonth = () => import('@/components/calendar/v-calendar-month.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/calendar',
      name: 'home',
      component: vCalendarMonth,
    },
    {},
  ],
})

export default router
