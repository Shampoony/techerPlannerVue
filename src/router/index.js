import { createRouter, createWebHistory } from 'vue-router'
const vCalendarMonth = () => import('@/components/calendar/v-calendar-month.vue')
const VCalendarWeek = () => import('@/components/calendar/v-calendar-week.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: vCalendarMonth,
    },
    {
      path: '/week',
      name: 'calendar-week',
      component: VCalendarWeek,
    },
    {},
  ],
})

export default router
