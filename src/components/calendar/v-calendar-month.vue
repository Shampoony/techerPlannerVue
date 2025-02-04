<template>
  <div class="wrapper">
    <v-header />
    <main>
      <section class="v-calendar-month" v-if="!isMobile">
        <div class="v-calendar-month__container container">
          <v-calendar-menu :type="'month'" @setMonth="setMonth" />
          <div
            class="v-calendar-month__content scroll-container"
            v-if="monthLessons.schedule && daysWeek"
          >
            <table class="v-calendar-month__table calendar">
              <thead>
                <tr class="calendar-header">
                  <th class="calendar-header__item" v-for="day in daysWeek" :key="day.id">
                    {{ day.days_week }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="calendar-row"
                  v-for="(week, weekIndex) of monthLessons.schedule"
                  :key="weekIndex"
                >
                  <td
                    class="calendar-row__item"
                    v-for="i in 7"
                    :key="i"
                    @dragover.prevent
                    @drop="(event) => handleDrop(event, i, weekIndex)"
                  >
                    <div class="calendar-row__item-content calendar-card" v-if="week[i]">
                      <div class="calendar-card__num">{{ week[i].day }}</div>
                      <div
                        class="calendar-card__content"
                        v-for="(lesson, lessonIndex) in week[i].lessons"
                        :key="lesson.lesson_id"
                        @click="() => toggleButtonsModal(lesson)"
                        draggable="true"
                        @dragstart="
                          (event) => handleDragStart(event, lesson, weekIndex, i, lessonIndex)
                        "
                      >
                        <div class="calendar-card__lesson">
                          {{ lesson.start_time }} - {{ lesson.end_time }} {{ lesson.student_name }}
                        </div>
                        <div
                          class="calendar-card__lesson break"
                          v-if="monthLessons.breaks && monthLessons.breaks[lesson.lesson_id]"
                        >
                          {{ monthLessons.breaks[lesson.lesson_id].start_time }} -
                          {{ monthLessons.breaks[lesson.lesson_id].end_time }}
                          {{ lesson.student_name }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="loader-container" v-else>
            <div class="loader"></div>
          </div>
        </div>
      </section>
      <section class="v-calendar-month-mob mob-page" v-else>
        <div class="container">
          <div class="v-calendar-month-mob__container">
            <v-calendar-menu :type="'month'" />
            <table class="v-calendar-month-mob__table calendar">
              <thead>
                <tr class="calendar-header">
                  <th class="calendar-header__item" v-for="day in daysWeek" :key="day.id">
                    {{ day.days_week }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="calendar-row"
                  v-for="(week, weekIndex) of monthLessons.schedule"
                  :key="weekIndex"
                >
                  <td
                    class="calendar-row__item"
                    :class="{ active: weekIndex == activeDay[0] && i == activeDay[1] }"
                    @click="toggleActiveDay(weekIndex, i)"
                    v-for="i in 7"
                    :key="i"
                  >
                    <div class="calendar-row__item-content calendar-card" v-if="week[i]">
                      <div class="calendar-card__num">{{ week[i].day }}</div>
                      <div class="calendar-card__content">
                        <div
                          class="calendar-card__lesson"
                          v-for="lesson in week[i].lessons"
                          :key="lesson.lesson_id"
                        ></div>
                        <div
                          class="calendar-card__lesson break"
                          v-if="week[i].breaks && week[i].breaks[lesson.lesson_id]"
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="v-calendar-month-mob__info lesson-info" v-if="activeDayLessons">
            <router-link :to="{ name: 'calendar-day' }">
              <div class="v-calendar-month-mob__day day">
                <div class="day__header">
                  <p class="day__date">{{ activeDayLessons.day }}</p>
                  <img src="../../assets/images/arrowRightCalendar.svg" class="day-el" alt="" />
                  <img
                    src="../../assets/images/arrowRightCalendarNight.svg"
                    class="night-el"
                    alt=""
                  />
                </div>
                <div
                  class="day__content"
                  v-for="lesson in activeDayLessons.lessons"
                  :key="lesson.id"
                >
                  <div class="day__lesson">
                    <div class="day__lesson-time">
                      <div class="day__lesson-circle"></div>
                      <p>{{ lesson.start_time }}</p>
                      <p>-</p>
                      <p>{{ lesson.end_time }}</p>
                    </div>
                    <div class="day__lesson-name">{{ lesson.student_name }}</div>
                  </div>
                  <div
                    class="day__lesson break"
                    v-if="activeDayLessons.breaks && activeDayLessons.breaks[lesson.lesson_id]"
                  >
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
                        <p>{{ activeDayLessons.breaks[lesson.lesson_id].start_time }}</p>
                        <p>-</p>
                        <p>{{ activeDayLessons.breaks[lesson.lesson_id].end_time }}</p>
                      </div>
                    </div>
                    <div class="day__lesson-name">Перерыв</div>
                  </div>
                </div>
                <div v-if="!activeDayLessons.lessons.length">
                  <h2 class="title pb-7">В этот день у вас нет уроков</h2>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </main>
    <v-modals-container ref="modalsContainer" />

    <v-footer />
  </div>
</template>

<script setup>
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'
import VHeader from '../generalComponents/v-header.vue'

import vModalsContainer from '../generalComponents/v-modals-container.vue'

import { useIsMobile } from '@/composables/useIsMobile'
import { ref, onMounted, computed, useTemplateRef } from 'vue'
import { getLessonsOnMonth } from '@/api/requests'
import { useRouter } from 'vue-router'

/* Переменные */

const daysWeek = ref([
  {
    days_week: 'Пн',
    id: 1,
  },
  {
    days_week: 'Вт',
    id: 2,
  },
  {
    days_week: 'Ср',
    id: 3,
  },
  {
    days_week: 'Чт',
    id: 4,
  },
  {
    days_week: 'Пт',
    id: 5,
  },
  {
    days_week: 'Сб',
    id: 6,
  },
  {
    days_week: 'Вс',
    id: 7,
  },
])

/* const monthLessons = ref({
  weeks: {
    1: {
      6: {
        day: 1,
        lessons: [
          {
            lesson_id: 265,
            student_name: 'Даниил',

            start_time: '14:00',
            end_time: '15:00',
          },
          {
            lesson_id: 266,
            student_name: 'Даниил',

            start_time: '16:00',
            end_time: '17:00',
          },
        ],
      },
      7: { day: 2, lessons: [] },
    },
    2: {
      1: { day: 3, lessons: [] },
      2: { day: 4, lessons: [] },
      3: { day: 5, lessons: [] },
      4: {
        day: 6,
        lessons: [
          {
            lesson_id: 265,
            student_name: 'Даниил',

            start_time: '14:00',
            end_time: '15:00',
          },
          {
            lesson_id: 266,
            student_name: 'Даниил',

            start_time: '16:00',
            end_time: '17:00',
          },
          {
            lesson_id: 267,
            student_name: 'Даниил',

            start_time: '20:00',
            end_time: '21:00',
          },
          {
            lesson_id: 268,
            student_name: 'Даниил',

            start_time: '22:00',
            end_time: '23:00',
          },
        ],
      },
      5: { day: 7, lessons: [] },
      6: { day: 8, lessons: [] },
      7: { day: 9, lessons: [] },
    },
    3: {
      1: { day: 10, lessons: [] },
      2: { day: 11, lessons: [] },
      3: { day: 12, lessons: [] },
      4: { day: 13, lessons: [] },
      5: { day: 14, lessons: [] },
      6: { day: 15, lessons: [] },
      7: { day: 16, lessons: [] },
    },
    4: {
      1: { day: 17, lessons: [] },
      2: { day: 18, lessons: [] },
      3: { day: 19, lessons: [] },
      4: { day: 20, lessons: [] },
      5: { day: 21, lessons: [] },
      6: { day: 22, lessons: [] },
      7: { day: 23, lessons: [] },
    },
    5: {
      1: { day: 24, lessons: [] },
      2: { day: 25, lessons: [] },
      3: { day: 26, lessons: [] },
      4: { day: 27, lessons: [] },
      5: { day: 28, lessons: [] },
    },
  },
  breaks: {
    265: {
      start_time: '15:00',
      end_time: '15:30',
    },
  },
}) */

const today = ref(new Date())

const currentMonth = ref(today.value.getMonth() + 1)
const currentYear = ref(today.value.getFullYear())

const router = useRouter()

const monthLessons = ref({})

const activeDay = ref([])

const draggedItem = ref()

const { isMobile } = useIsMobile()

const modalsContainer = useTemplateRef('modalsContainer')

/* Методы */

const toggleActiveDay = (weekIndex, day) => {
  activeDay.value[0] = parseInt(weekIndex)
  activeDay.value[1] = day

  localStorage.setItem('activeDay', JSON.stringify(activeDay.value))
  console.log(JSON.parse(localStorage.getItem('activeDay')))
}

const handleDragStart = (event, lesson, rowIndex, columnIndex, lessonIndex) => {
  draggedItem.value = {
    lesson,
    fromColumnIndex: columnIndex,
    fromRowIndex: rowIndex,
    fromLessonIndex: lessonIndex,
  }
}
const handleDrop = (event, targetColumnIndex, targetRowIndex) => {
  const { lesson, fromColumnIndex, fromRowIndex, fromLessonIndex } = draggedItem.value

  if (fromColumnIndex !== targetColumnIndex || fromRowIndex !== targetRowIndex) {
    // Получаем список уроков из исходной и целевой ячеек
    const sourceLessons = monthLessons.value.schedule[fromRowIndex][fromColumnIndex].lessons
    const targetLessons = monthLessons.value.schedule[targetRowIndex][targetColumnIndex].lessons

    // Преобразуем время в минуты
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    // Время перетаскиваемого урока
    const pickedStart = timeToMinutes(lesson.start_time)
    const pickedEnd = timeToMinutes(lesson.end_time)

    // Проверка на пересечение времени
    for (let targetLesson of targetLessons) {
      const targetStart = timeToMinutes(targetLesson.start_time)
      const targetEnd = timeToMinutes(targetLesson.end_time)

      // Если есть пересечение по времени, показываем предупреждение
      if (!(targetEnd <= pickedStart || targetStart >= pickedEnd)) {
        alert('В этот день уже есть занятие на данное время')
        return
      }
    }

    // Удаляем урок из исходной ячейки
    sourceLessons.splice(fromLessonIndex, 1)

    // Вставляем урок в целевую ячейку
    targetLessons.push(lesson)

    // Сортируем уроки по времени в целевой ячейке
    targetLessons.sort((a, b) => {
      const timeA = timeToMinutes(a.start_time)
      const timeB = timeToMinutes(b.start_time)
      return timeA - timeB
    })
  }

  draggedItem.value = null
}

const toggleButtonsModal = (lesson) => {
  modalsContainer.value.toggleLessonModals('buttons', lesson)
}

const setMonth = (dateData) => {
  router.push({
    query: { selected_date: `${String(dateData.month + 1).padStart(2, '0')}.${dateData.year}` },
  })
  currentMonth.value = dateData.month
  currentYear.value = dateData.year
  console.log(dateData.year, dateData.month + 1)
  getLessonsOnMonth(dateData.year, dateData.month + 1).then((lessons) => {
    monthLessons.value = lessons
  })
}

const setLessonsOnDate = () => {
  const params = new URLSearchParams(window.location.search)
  const queryParams = Object.fromEntries(params.entries())

  if ('selected_date' in queryParams) {
    currentMonth.value = queryParams['selected_date'].split('.')[0]
    currentYear.value = queryParams['selected_date'].split('.')[1]
  }
  console.log(currentYear.value, parseInt(currentMonth.value))
  getLessonsOnMonth(currentYear.value, parseInt(currentMonth.value)).then((lessons) => {
    monthLessons.value = lessons
  })
}
/* computed */

const activeDayLessons = computed(() => {
  if (activeDay.value.length && monthLessons.value.schedule) {
    const value = monthLessons.value.schedule[activeDay.value[0]]
    if (value) {
      return value[activeDay.value[1]]
    }
  }
  return null
})

/* Хуки */

onMounted(() => {
  setLessonsOnDate()
  activeDay.value = JSON.parse(localStorage.getItem('activeDay')) || []
})
</script>
