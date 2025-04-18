<template>
  <div class="v-student-analytics">
    <div class="v-student-analytics__container">
      <div class="v-student-analytics__prev">
        <div class="flex justify-between">
          <h1 class="text-title">Прошедшие задания</h1>

          <div class="flex gap-3">
            <img
              class="rotate-180 day-el analytics-swiper-button-prev"
              src="/src/assets/images/arrow-right-home-day.svg"
              alt=""
            />
            <img
              class="rotate-180 night-el analytics-swiper-button-prev"
              src="/src/assets/images/arrow-right-home-night.svg"
              alt=""
            />
            <img
              class="day-el analytics-swiper-button-next"
              src="/src/assets/images/arrow-right-home-day.svg"
              alt=""
            />
            <img
              class="night-el analytics-swiper-button-next"
              src="/src/assets/images/arrow-right-home-night.svg"
              alt=""
            />
          </div>
        </div>
        <swiper class="v-student-analytics__prev-row" v-bind="swiperOptions" :modules="modules">
          <swiper-slide
            class="v-student-analytics__prev-item prev-lesson"
            v-for="lesson in lessons"
            :key="lesson.id"
          >
            <div class="prev-lesson__content">
              <h3 class="prev-lesson__date">{{ lesson.date }}</h3>
              <div class="prev-lesson__info">
                <div class="prev-lesson__info-row">
                  <h4 class="prev-lesson__subtitle">Темы</h4>
                  <div class="prev-lesson__block">
                    <div
                      class="prev-lesson__theme theme"
                      v-for="theme in lesson.themes"
                      :key="theme.id"
                    >
                      <span class="theme__title"> {{ theme.theme }} </span>
                      <div class="theme__close" @click="() => deleteTheme(theme.id)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M9 3L3 9M3 3L9 9"
                            stroke="#1D4ECC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="prev-lesson__info-row">
                  <h4 class="prev-lesson__subtitle red">Проблемы</h4>
                  <div class="prev-lesson__block prev-lesson__col">
                    <p class="prev-lesson__subtitle">Использует калькулятор</p>
                    <p class="prev-lesson__subtitle">
                      Не выполнено домашнее задание прошлого занятия
                    </p>
                    <p class="prev-lesson__subtitle">Долго решает задачи</p>
                  </div>
                </div>
                <div class="prev-lesson__info-row">
                  <h4 class="prev-lesson__subtitle">ДЗ</h4>
                  <div class="prev-lesson__block">
                    <div
                      class="status"
                      :class="{
                        green: typeof lesson.homework_status === 'number',
                        red: lesson.homework_status === 'Не выполнено',
                      }"
                    >
                      <span></span>{{ lesson.homework_status }}
                    </div>
                    <template v-if="lesson.homework_status === 'Не добавлено'">
                      <div class="contact-link">ДЗ задано вне платформы?</div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="v-student-analytics__charts">
        <div
          class="v-student-analytics__chart"
          v-show="studentAnalytics && !studentAnalytics.chart_homeworks?.length"
        >
          <h2 class="v-student-analytics__chart-title text-section-title">
            Прогресс оценок ученика за домашнее задание
          </h2>
          <div class="v-student-analytics__chart-container">
            <div class="v-student-analytics__chart-ticks sticky-ticks">
              <div class="v-student-analytics__chart-tick">5</div>
              <div class="v-student-analytics__chart-tick">4</div>
              <div class="v-student-analytics__chart-tick">3</div>
              <div class="v-student-analytics__chart-tick">2</div>
            </div>
            <Line v-if="chartData" :data="chartData" :options="chartOptions" />
          </div>
        </div>
        <div
          class="v-student-analytics__chart"
          v-show="studentAnalytics && !studentAnalytics.chart_homeworks.chart_results?.length"
        >
          <h2 class="v-student-analytics__chart-title text-section-title">
            Прогресс оценок ученика за экзамены
          </h2>
          <div class="v-student-analytics__chart-container">
            <div class="v-student-analytics__chart-ticks sticky-ticks">
              <div class="v-student-analytics__chart-tick">5</div>
              <div class="v-student-analytics__chart-tick">4</div>
              <div class="v-student-analytics__chart-tick">3</div>
              <div class="v-student-analytics__chart-tick">2</div>
            </div>
            <Line v-if="chartData" :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
    <v-homework-stat />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentStudentStore } from '@/stores/currentStudentStore' /* Chart js */
import { chartData, chartOptions } from '../../../charts/chartConfig'

import vHomeworkStat from '@/components/generalComponents/v-homework-stat.vue'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

/* Swiper */
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { getStudentAnalytics } from '@/api/requests'

const modules = [Navigation]
const store = useCurrentStudentStore()

const swiperOptions = {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: '.analytics-swiper-button-next',
    prevEl: '.analytics-swiper-button-prev',
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
}

const route = useRoute()

const lessons = [
  {
    date: '13 марта',
    themes: [{ id: 1, theme: 'Синусы' }],
    problems: [{ id: 1, problem: 'Использует калькулятор' }],
    homework_status: 'Не выполнено',
  },
  {
    date: '13 марта',
    themes: [{ id: 1, theme: 'Синусы' }],
    problems: [{ id: 1, problem: 'Использует калькулятор' }],
    homework_status: 5,
  },
]

const studentAnalytics = ref(null)
const studentId = ref(null)

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const loadData = async () => {
  store.setStudentId(route.params.id)
  await store.setStudentAnalytics()
  studentAnalytics.value = store.studentAnalytics
}

onMounted(() => {
  studentId.value = route.params.id
  loadData()
})
</script>
