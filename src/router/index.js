import Test from '@/components/calendar/test.vue'
import VCalendarIndex from '@/components/calendar/v-calendar-index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const VCalendarDay = () => import('@/components/calendar/v-calendar-day.vue')
const VCalendarWeek = () => import('@/components/calendar/v-calendar-week.vue')
const vCalendarMonth = () => import('@/components/calendar/v-calendar-month.vue')
const VonBoardingHome = () => import('@/components/onboardingPage/vonBoardingHome.vue')
const vOnboardingStart = () => import('@/components/onboardingPage/v-onboarding-start.vue')

/* Календарь */
const calendarRoutes = [
  {
    path: '',
    name: 'home',
    component: VCalendarIndex,
  },
  {
    path: 'day',
    name: 'calendar-day',
    component: VCalendarDay,
  },
  {
    path: 'week',
    name: 'calendar-week',
    component: VCalendarWeek,
  },
]

const onBoardingRoutes = [
  {
    path: 'guide',
    name: 'onboarding_home',
    component: VonBoardingHome,
  },
  {
    path: '',
    name: 'onboarding',
    component: vOnboardingStart,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/calendar/',
      children: calendarRoutes,
    },

    {
      path: '/onboarding/guide',
      name: 'onboarding_home',
      component: VonBoardingHome,
    },
    {
      path: '/onboarding/',
      children: onBoardingRoutes,
    },
  ],
})

export default router
