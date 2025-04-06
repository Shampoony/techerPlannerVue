<template>
  <div class="v-student-analytics">
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
        <swiper-slide class="v-student-analytics__prev-item prev-lesson">
          <div class="prev-lesson__content">
            <h3 class="prev-lesson__date">13 марта</h3>
            <div class="prev-lesson__info">
              <div class="prev-lesson__info-row">
                <h4 class="prev-lesson__subtitle">Темы</h4>
                <div class="prev-lesson__block">
                  <p class="prev-lesson__subtitle">Синусы, Косинусы, Котангенсы</p>
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
                  <div class="homework-status rated"><span></span>5</div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="v-student-analytics__prev-item prev-lesson">
          <div class="prev-lesson__content">
            <h3 class="prev-lesson__date">13 марта</h3>
            <div class="prev-lesson__info">
              <div class="prev-lesson__info-row">
                <h4 class="prev-lesson__subtitle">Темы</h4>
                <div class="prev-lesson__block">
                  <p class="prev-lesson__subtitle">Синусы, Косинусы, Котангенсы</p>
                </div>
              </div>
              <div class="prev-lesson__info-row">
                <h4 class="prev-lesson__subtitle red">Проблемы</h4>
                <div class="prev-lesson__block prev-lesson__col">
                  <p class="prev-lesson__subtitle">Использует калькулятор</p>
                </div>
              </div>
              <div class="prev-lesson__info-row">
                <h4 class="prev-lesson__subtitle">ДЗ</h4>
                <div class="prev-lesson__block">
                  <div class="homework-status overdue"><span></span>Не выполнено</div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="v-student-analytics__charts">
      <div class="v-student-analytics__chart">
        <div class="v-student-analytics__chart-ticks">
          <div class="v-student-analytics__chart-tick">5</div>
          <div class="v-student-analytics__chart-tick">4</div>
          <div class="v-student-analytics__chart-tick">3</div>
          <div class="v-student-analytics__chart-tick">2</div>
        </div>
        <div class="v-student-analytics__chart-container">
          <Line v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
      </div>
      <div class="v-student-analytics__chart">
        <div class="v-student-analytics__chart-container">
          <Line v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/* Chart js */
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

/* Swiper */
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]

const swiperOptions = {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: '.analytics-swiper-button-next',
    prevEl: '.analytics-swiper-button-prev',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
</script>
