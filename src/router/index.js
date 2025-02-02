import Test from '@/components/calendar/test.vue'
import { createRouter, createWebHistory } from 'vue-router'

const vCalendarMonth = () => import('@/components/calendar/v-calendar-month.vue')
const VCalendarWeek = () => import('@/components/calendar/v-calendar-week.vue')
const VCalendarDay = () => import('@/components/calendar/v-calendar-day.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/calendar/',
      name: 'home',
      component: vCalendarMonth,
    },
    {
      path: '/calendar/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/calendar/day',
      name: 'calendar-day',
      component: VCalendarDay,
    },
    {
      path: '/calendar/week',
      name: 'calendar-week',
      component: VCalendarWeek,
    },
  ],
})

export default router
