<template>
  <div class="wrapper">
    <v-header />
    <main class="v-calendar-week" v-if="!isMobCalendar">
      <div class="v-calendar-week__container container">
        <v-calendar-menu :is-showed-break="true" :type="'week'" />
        <div class="v-calendar-week__content scroll-container">
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
                  <div class="calendar-row__item-content calendar-card scroll-container">
                    <div
                      class="calendar-card__content"
                      v-for="lesson in lessons"
                      :key="lesson.id"
                      @click="toggleButtonsModal(lesson.id)"
                    >
                      <div
                        class="calendar-card__lesson"
                        :style="{
                          height: getHeight(lesson.duration),
                          gap: `${baseGap * lesson.duration}px`,
                        }"
                      >
                        <p>{{ lesson.time_start }} - {{ lesson.time_end }}</p>
                        <p>{{ lesson.student_name }}</p>
                      </div>
                      <div class="calendar-card__break">{{ lesson.break }}</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item"></td>
                <td class="calendar-row__item"></td>
                <td class="calendar-row__item"></td>
                <td class="calendar-row__item"></td>
                <td class="calendar-row__item"></td>
                <td class="calendar-row__item"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <main class="v-calendar-week v-calendar-week-mob" v-else>
      <div class="v-calendar-week-mob__container container">
        <v-calendar-menu :is-showed-break="true" :type="'week'" />
        <ul class="v-calendar-week-mob__list">
          <li class="v-calendar-week-mob__list-item day" v-for="lesson in lessons" :key="lesson.id">
            <div class="day__header" @click="toggleLesson(lesson.id)">
              <p class="day__date">30 декабря</p>
              <img src="../../assets/images/arrowRightCalendar.svg" class="day-el" alt="" />
              <img src="../../assets/images/arrowRightCalendarNight.svg" class="night-el" alt="" />
            </div>

            <transition name="fade">
              <router-link :to="{ name: 'calendar-day' }">
                <div class="day__content" v-if="lessonOpened[lesson.id]">
                  <div class="day__lesson">
                    <div class="day__lesson-time">
                      <div class="day__lesson-circle"></div>
                      <p>10:00</p>
                      <p>-</p>
                      <p>11:00</p>
                    </div>
                    <div class="day__lesson-name">Даниил</div>
                  </div>

                  <div class="day__lesson break">
                    <div class="day__lesson-block">
                      <img
                        src="../../assets/images/button_add_calendar.svg"
                        class="day-el"
                        alt=""
                      />
                      <img
                        src="../../assets/images/button_add_calendar_night.svg"
                        class="night-el"
                        alt=""
                      />
                      <div class="day__lesson-time">
                        <p>11:00</p>
                        <p>-</p>
                        <p>11:15</p>
                      </div>
                    </div>
                    <div class="day__lesson-name">Перерыв</div>
                  </div>
                </div>
              </router-link>
            </transition>
          </li>
        </ul>
      </div>
    </main>
    <v-footer />
    <transition name="fade">
      <v-buttons-modal
        v-if="modals.buttons"
        @toggleLessonModals="toggleLessonModals"
        @close="toggleButtonsModal"
      />
    </transition>
    <transition name="fade">
      <v-delete-lesson-modal
        v-if="modals.delete_lesson"
        @close="toggleLessonModals('delete_lesson')"
      />
    </transition>
  </div>
</template>

<script setup>
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'
import VHeader from '../generalComponents/v-header.vue'
import vButtonsModal from '../modals/calendar/v-buttons-modal.vue'
import vDeleteLessonModal from '../modals/calendar/v-delete-lesson-modal.vue'

import { onMounted, ref } from 'vue'

const baseHeight = 90
const minHeight = 50
const baseGap = 10

const isMobCalendar = ref(false)

const pickedLesson = ref(null)

const lessonOpened = ref({})

const lessons = ref([
  {
    id: 1,
    time_start: '14:00',
    time_end: '15:00',
    student_name: 'Даниил',
    break: '15 минут',
    duration: 1,
  },
])

const modals = ref({
  buttons: false,
  delete_lesson: false,
})

const checkSize = () => {
  isMobCalendar.value = innerWidth < 480
}

const toggleLesson = (lesson_id) => {
  if (lesson_id in lessonOpened.value) {
    delete lessonOpened.value[lesson_id]
  } else {
    lessonOpened.value[lesson_id] = true
  }
}

const getHeight = (duration) => {
  const resultHeight = baseHeight * duration < minHeight ? minHeight : baseHeight * duration
  return `${resultHeight}px`
}

const toggleLessonModals = (modalName) => {
  modals.value[modalName] = !modals.value[modalName]
}

const toggleButtonsModal = (lesson) => {
  toggleLessonModals('buttons')
  pickedLesson.value = lesson
}

onMounted(() => {
  checkSize()
  window.addEventListener('resize', checkSize)
})
</script>
