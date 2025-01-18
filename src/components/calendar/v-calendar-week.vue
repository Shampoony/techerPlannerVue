<template>
  <div class="wrapper">
    <v-header />
    <main class="v-calendar-week">
      <div class="v-calendar-week__container container">
        <v-calendar-menu :is-showed-break="true" :type="'week'" />
        <div class="v-calendar-week__content scroll-container calendar">
          <table class="v-calendar-week__table calendar">
            <thead>
              <tr class="calendar-header">
                <th class="calendar-header__item">пн, 6</th>
                <th class="calendar-header__item">вт, 7</th>
                <th class="calendar-header__item">ср, 8</th>
                <th class="calendar-header__item">чт, 9</th>
                <th class="calendar-header__item">пт, 10</th>
                <th class="calendar-header__item">сб, 11</th>
                <th class="calendar-header__item">вс, 12</th>
              </tr>
            </thead>
            <tbody>
              <tr class="calendar-row">
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__content" v-for="lesson in lessons" :key="lesson.id">
                      <div
                        class="calendar-card__lesson"
                        :style="{ height: `${baseHeight * lesson.duration}px` }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__content" v-for="lesson in lessons" :key="lesson.id">
                      <div
                        class="calendar-card__lesson"
                        :style="{ height: `${baseHeight * lesson.duration}px` }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__content" v-for="lesson in lessons" :key="lesson.id">
                      <div
                        class="calendar-card__lesson"
                        :style="{ height: `${baseHeight * lesson.duration}px` }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__content" v-for="lesson in lessons" :key="lesson.id">
                      <div
                        class="calendar-card__lesson"
                        :style="{ height: `${baseHeight * lesson.duration}px` }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__content" v-for="lesson in lessons" :key="lesson.id">
                      <div
                        class="calendar-card__lesson"
                        :style="{ height: `${baseHeight * lesson.duration}px` }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__content" v-for="lesson in lessons" :key="lesson.id">
                      <div
                        class="calendar-card__lesson"
                        :style="{ height: `${baseHeight * lesson.duration}px` }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__content" v-for="lesson in lessons" :key="lesson.id">
                      <div
                        class="calendar-card__lesson"
                        :style="{ height: `${baseHeight * lesson.duration}px` }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <v-footer />
  </div>
</template>

<script setup>
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'
import VHeader from '../generalComponents/v-header.vue'

import { ref } from 'vue'

const baseHeight = 90

const lessons = ref([
  {
    id: 1,
    time_start: '14:00',
    time_end: '15:00',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1,
  },
  {
    id: 2,
    time_start: '14:00',
    time_end: '14:45',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 0.75,
  },
  {
    id: 3,
    time_start: '12:00',
    time_end: '13:00',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1,
  },
  {
    id: 4,
    time_start: '15:15',
    time_end: '16:15',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1,
  },
  {
    id: 5,
    time_start: '14:00',
    time_end: '14:45',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 0.75,
  },
  {
    id: 6,
    time_start: '14:00',
    time_end: '15:30',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1.5,
  },
  {
    id: 7,
    time_start: '14:00',
    time_end: '15:30',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1.5,
  },
  {
    id: 8,
    time_start: '14:00',
    time_end: '15:30',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1.5,
  },
  {
    id: 9,
    time_start: '14:00',
    time_end: '15:30',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1.5,
  },
])
</script>
