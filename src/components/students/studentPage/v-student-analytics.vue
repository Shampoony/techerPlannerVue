<template>
  <div class="v-student-analytics">
    <div class="v-student-analytics__container">
      <div class="v-student-analytics__prev">
        <div class="flex justify-between">
          <h1 class="custom-title">Занятия</h1>

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

        <template v-if="lessons">
          <swiper class="v-student-analytics__prev-row" v-bind="swiperOptions" :modules="modules">
            <swiper-slide
              class="v-student-analytics__prev-item prev-lesson"
              v-for="lesson in lessons"
              :key="lesson.id"
            >
              <div class="prev-lesson__content">
                <h3 class="prev-lesson__date">{{ formatDate(lesson.conducted_date) }}</h3>
                <div class="prev-lesson__info">
                  <div class="prev-lesson__info-row">
                    <h4 class="prev-lesson__subtitle">Темы</h4>
                    <div class="prev-lesson__block">
                      <div class="theme" v-show="!lesson?.themes?.length">
                        <span class="theme__title" @click="openModal('themes')">
                          + Добавить тему</span
                        >
                      </div>
                      <div
                        class="prev-lesson__theme theme"
                        @click="() => openModal('themes')"
                        v-for="theme in lesson.themes"
                        :key="theme.id"
                      >
                        <span class="theme__title"> {{ theme.theme }} </span>
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
                        <span></span>{{ lesson.homework }}
                      </div>
                      <template v-if="lesson.homework_status === 'Не добавлено'">
                        <div class="contact-link" @click="() => openModal('homeWorkOpModal')">
                          ДЗ задано вне платформы?
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </template>

      </div>
      <div class="v-student-analytics__charts">
        <div class="v-student-analytics__chart">
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
        <div class="v-student-analytics__chart">
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
import { getStudentAnalytics, getStudentFutureLessons, getStudentLastLessons } from '@/api/requests'
import { useCurrentStudentStore } from '@/stores/currentStudentStore'
import { chartData, chartOptions } from '../../../charts/chartConfig'

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

import { defineEmits } from 'vue'

/* Swiper */
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import vHomeworkStat from '@/components/generalComponents/v-homework-stat.vue'
import { format } from 'date-fns'
import { formatDate } from '@/utils'

const emit = defineEmits(['toggle-modal'])

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

const lessons = ref([])

const openModal = (modal) => {
  emit('toggle-modal', modal)
}

const studentAnalytics = ref(null)
const studentId = ref(null)

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const loadLEssons = async () => {
  const prevLessons = await getStudentLastLessons(studentId.value, 1, 2)
  const futureLessons = await getStudentFutureLessons(studentId.value, 1, 2)
  lessons.value = [
  ...(Array.isArray(prevLessons) ? prevLessons : []),
  ...(Array.isArray(futureLessons) ? futureLessons : [])
  ]
}

const loadData = async () => {
  await store.setStudentAnalytics()
  await loadLEssons()
}

onMounted(() => {
  studentId.value = route.params.id
  loadData()
})
</script>
