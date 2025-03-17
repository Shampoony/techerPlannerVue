import { createRouter, createWebHistory } from 'vue-router'

/* ================================================================== Импорты ================================================================== */

/* Календарь */
const VCalendarDay = () => import('@/components/calendar/v-calendar-day.vue')
const VCalendarWeek = () => import('@/components/calendar/v-calendar-week.vue')
const VCalendarIndex = () => import('@/components/calendar/v-calendar-index.vue')
const vCalendarMonth = () => import('@/components/calendar/v-calendar-month.vue')

/* Онбординг */
const VonBoardingHome = () => import('@/components/onboardingPage/vonBoardingHome.vue')
const vOnboardingStart = () => import('@/components/onboardingPage/v-onboarding-start.vue')

/* Главная */
const vHome = () => import('@/components/home/v-home.vue')

/* ================================================================== Маршруты ================================================================== */

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

/* Онбординг */
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

/* Главная учителя */

const homeTeacherRoutes = [
  {
    path: '',
    name: 'home_teacher',
    component: vHome,
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
    {
      path: '/home-teacher-test/',
      children: homeTeacherRoutes,
    },
  ],
})

export default router
