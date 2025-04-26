<template>
  <v-base>
    <section class="v-calendar-week" v-show="!isMobile">
      <div class="container">
        <div class="v-calendar-week__container layout">
          <v-calendar-menu
            :is-showed-break="true"
            :type="'calendar-week'"
            @setWeek="setLessonsOnWeek"
            @paginateWeek="paginateWeek"
            @toggleBreakMode="toggleBreakMode"
          />
          <div class="sec-hidden-content showing" v-if="isWeekEmpty">
            <h1 class="text-title text-blue">Еще не запланировано ни одного занятия!</h1>
          </div>
          <div
            class="v-calendar-week__content scroll-container"
            :class="{ blur: isWeekEmpty }"
            v-if="(!breakMode && dayOfTheWeek) || isWeekEmpty"
          >
            <transition name="fade">
              <table class="v-calendar-week__table calendar" v-if="dayOfTheWeek">
                <thead>
                  <tr class="calendar-header">
                    <th v-for="(day, index) in dayOfTheWeek.week.days" :key="index">
                      <div class="calendar-header__item">
                        {{ formatDay(day.day) }}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="calendar-row"
                    v-if="dayOfTheWeek && dayOfTheWeek.week"
                    :key="dayOfTheWeek.week.start_date"
                  >
                    <td
                      v-for="(day, columnIndex) in dayOfTheWeek.week.days"
                      :key="columnIndex"
                      class="calendar-row__item"
                      @dragover.prevent
                      @drop="(event) => handleDrop(event, columnIndex)"
                    >
                      <div class="calendar-row__item-content calendar-card">
                        <div
                          class="calendar-card__content"
                          :class="{ completed: lesson.completed }"
                          v-for="(lesson, lessonIndex) in day.lessons"
                          :key="lesson.lesson_id"
                          @click="toggleButtonsModal(lesson)"
                          draggable="true"
                          @dragstart="
                            (event) => handleDragStart(event, lesson, columnIndex, lessonIndex)
                          "
                        >
                          <transition name="flip">
                            <div
                              v-if="lesson"
                              class="calendar-card__lesson"
                              :class="{ trial: lesson.trial }"
                              :style="{
                                height: getHeight(lesson.duration),
                                gap: `${baseGap * lesson.duration}px`,
                              }"
                            >
                              <p class="calendar-card__lesson-time">
                                {{ cutSeconds(lesson.start_time) }} -
                                {{ cutSeconds(lesson.end_time) }}
                              </p>
                              <p class="calendar-card__lesson-name">{{ lesson.student_name }}</p>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </transition>
          </div>
          <div
            class="v-calendar-week__break scroll-container"
            v-show="breakMode && dayOfTheWeek && !isWeekEmpty"
          >
            <DayPilotCalendar :config="config" :events="events" ref="calendarRef" v-if="events">
              <template #event="{ event }">
                <div class="event" @click="toggleButtonsModal(event.data)">
                  <div class="event-header">
                    <div
                      class="calendar-card__content"
                      :class="{ completed: event.data.completed }"
                    >
                      <div class="calendar-card__lesson" :class="{ trial: event.data.trial }">
                        <p class="calendar-card__lesson-time">
                          {{ event.data.start_time }} - {{ event.data.end_time }}
                        </p>
                        <p class="calendar-card__lesson-name">{{ event.data.student_name }}</p>
                      </div>
                      <div
                        class="calendar-card__break"
                        v-if="event.data.break && event.data.break.duration"
                      >
                        {{ event.data.break.duration }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </DayPilotCalendar>
          </div>
          <div class="loader-container" v-if="!dayOfTheWeek">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="v-calendar-week-mob mob-page" v-if="isMobile">
      <div class="container">
        <div class="v-calendar-week-mob__container layout">
          <v-calendar-menu
            :is-showed-break="true"
            :type="'calendar-week'"
            @setWeek="setLessonsOnWeek"
            @paginateWeek="paginateWeek"
            @toggleBreakMode="toggleBreakMode"
          />
          <ul class="v-calendar-week-mob__list" v-if="dayOfTheWeek && dayOfTheWeek.week">
            <li
              v-for="(day, id) in dayOfTheWeek.week.days"
              :key="id"
              class="v-calendar-week-mob__list-item"
            >
              <div class="day" v-if="day">
                <div class="day__header">
                  <p class="day__date">{{ getDayLetters(day.day) }}</p>
                    <svg class="opacity-50" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66663 11.3333L11.3333 4.66663M11.3333 4.66663H4.66663M11.3333 4.66663V11.3333" stroke="#717680" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div
                  class="day__content"
                  v-for="lesson in day.lessons"
                  :key="lesson.id"
                >
                  <div class="day__lesson" :class="{ trial: lesson.trial }">
                    <h4 class="day__lesson-name">
                        Петров
                      </h4>
                    <div class="day__lesson-time" >
                      <p>{{ lesson.start_time }}</p>
                      <p>-</p>
                      <p>{{ lesson.end_time }}</p>
                    </div>
                    <div class="day__lesson-name">{{ lesson.student_name }}</div>
                  </div>

                </div>
             </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </v-base>
  <v-modals-container ref="modalsContainer" />
</template>

<script setup>
import vBase from '../v-base.vue'
import vCalendarMenu from './v-calendar-menu.vue'
import vModalsContainer from '../generalComponents/v-modals-container.vue'

import { getDayOfWeek } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, useTemplateRef, computed } from 'vue'

import { useIsMobile } from '@/composables/useIsMobile'
import { getLessonsOnWeek, transferLesson } from '@/api/requests'
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-vue'
import {
  addTimeWithDuration,
  formatDate,
  formatDateToStandart,
  getPreviousMonday,
  transformDate,
} from '@/utils'

/* ============================================================ Переменные состояния ============================================================ */

const { isMobile } = useIsMobile()
const baseGap = 10
const baseHeight = 90

const openedLessons = ref({})

const router = useRouter()
const route = useRoute()

const breakMode = ref(localStorage.getItem('breakMode') === 'true')
const events = ref()
const today = ref(formatDateToStandart(new Date()))
const startDate = ref(route.query['start_date'] || '01.12.2025')

const modalsContainer = useTemplateRef('modalsContainer')
const dayOfTheWeek = ref()
const draggedItem = ref({
  lesson: null,
  fromColumnIndex: null,
  fromLessonIndex: null,
})

const config = ref({
  viewType: 'Week',
  cellDuration: 15,

  startDate: transformDate(startDate.value),
  allowEventOverlap: false,

  eventResizeHandling: 'Disabled',
  timeRangeSelectedHandling: 'Disabled',
  locale: 'ru-RU',
  headerDateFormat: 'ddd, d',
  showNowLine: true,
  nowLineColor: '#FF0000', // Красный цвет для линии
  nowLineWidth: 2, // Устанавливаем толщину линии
  touch: true,
  weekStarts: 1,

  onEventMoved: (args) => {
    const startTime = args.newStart.value.split('T')[1]
    const endTime = args.newEnd.value.split('T')[1]
    const startDate = args.e.data.start.value.split('T')[0]
    const dayOfWeek = new Date(args.newStart.value).getDay()

    args.e.data.start_time = startTime.slice(0, 5)
    args.e.data.end_time = endTime.slice(0, 5)

    const eventData = {
      day_of_week_id: dayOfWeek || 7,
      start_time: startTime,
      end_time: endTime,
      conducted_date: startDate,
      in_rule: false,
    }
    const lessonId = args.e.data.lesson_id
    transferLesson(lessonId, eventData).then(() => {
      console.log('Выполнили запрос')
    })
  },
  onEventResized: (args) => {
    console.log('Event resized')
  },
})

/* ============================================================ Методы ============================================================ */

const loadEvents = async (lessons) => {
  const lessonsToEvent = []
  if (lessons) {
    for (let day in lessons.week.days) {
      lessons.week.days[day].lessons.forEach((lesson) => {
        // Переименовываем start_time в start
        const { start_time, end_time, ...rest } = lesson

        const formattedStartTime = `${lessons.week.days[day].day} ${start_time}`
          .replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1T')
          .replace(' ', '')
        const formattedEndTime = `${lessons.week.days[day].day} ${end_time}`
          .replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1T')
          .replace(' ', '')
        lessonsToEvent.push({
          start: formattedStartTime,
          end: formattedEndTime,
          start_time: start_time.slice(0, 5),
          end_time: end_time.slice(0, 5),
          ...rest,
        })
      })
    }
  }
  events.value = lessonsToEvent
}

const weekDays = ref({
  1: { day_of_week: 'пн', date: '' },
  2: { day_of_week: 'вт', date: '' },
  3: { day_of_week: 'ср', date: '' },
  4: { day_of_week: 'чт', date: '' },
  5: { day_of_week: 'пт', date: '' },
  6: { day_of_week: 'сб', date: '' },
  7: { day_of_week: 'вс', date: '' },
})

const getDayLetters = (day) => {
  if(route.query['start_date'] === undefined) {
    return day
  }
  const date = route.query['start_date'].slice(3)
  return getDayOfWeek(date, day.split('.')[0])
}

const handleDragStart = (event, lesson, columnIndex, lessonIndex) => {
  draggedItem.value = { lesson, fromColumnIndex: columnIndex, fromLessonIndex: lessonIndex }
}

const cutSeconds = (time) => {
  return time.slice(0, 5)
}
const handleDrop = (event, targetColumnIndex) => {
  const { lesson, fromColumnIndex, fromLessonIndex } = draggedItem.value

  if (fromColumnIndex !== targetColumnIndex) {
    // Получаем список уроков из исходного и целевого столбцов
    const sourceLessons = dayOfTheWeek.value.week.days[fromColumnIndex].lessons
    const targetLessons = dayOfTheWeek.value.week.days[targetColumnIndex].lessons
    const targetDate = weekDays.value[targetColumnIndex].date
    const year = targetDate.getFullYear()
    const month = String(targetDate.getMonth() + 1).padStart(2, '0') // месяцы начинаются с 0
    const day = String(targetDate.getDate()).padStart(2, '0')

    const conductedDate = `${year}-${month}-${day}`

    const requestBody = {
      day_of_week_id: parseInt(targetColumnIndex),
      start_time: lesson.start_time,
      end_time: lesson.end_time,
      conducted_date: conductedDate,
      in_rule: false,
    }

    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    // Преобразуем время перетаскиваемого урока
    const pickedStart = timeToMinutes(lesson.start_time)
    const pickedEnd = timeToMinutes(lesson.end_time)

    // Проверка на пересечение времени
    for (let targetLesson of targetLessons) {
      const targetStart = timeToMinutes(targetLesson.start_time)
      const targetEnd = timeToMinutes(targetLesson.end_time)

      // Если есть пересечение по времени, показываем предупреждение и выходим
      if (!(targetEnd <= pickedStart || targetStart >= pickedEnd)) {
        alert('В этот день уже есть занятие на данное время')
        return
      }
    }

    // Найдём индекс, после которого нужно вставить новый урок
    let insertIndex = targetLessons.length
    for (let i = 0; i < targetLessons.length; i++) {
      const targetStart = timeToMinutes(targetLessons[i].start_time)
      if (targetStart > pickedStart) {
        insertIndex = i
        break
      }
    }

    // Удаляем урок из исходного столбца
    sourceLessons.splice(fromLessonIndex, 1)

    // Вставляем урок в целевой столбец в нужное место
    targetLessons.splice(insertIndex, 0, lesson)

    transferLesson(lesson.lesson_id, requestBody).then(() => {
      console.log('Перенос осуществлен')
    })
  }

  draggedItem.value = { lesson: null, fromColumnIndex: null, fromLessonIndex: null }
}

const isToday = (day) => {
  const expression = day === today.value
  return expression
}

const toggleBreakMode = () => {
  breakMode.value = !breakMode.value
  localStorage.setItem('breakMode', breakMode.value)
  loadEvents(dayOfTheWeek.value)
}

const paginateWeek = () => {
  setLessonsFromUrl()
}

const toggleOppenedDays = (id, day) => {
  if (day == today.value) {
    openedLessons.value[id] = false
    today.value = ''
    return
  }
  if (!(id in openedLessons.value)) {
    openedLessons.value[id] = true
    return
  }
  openedLessons.value[id] = !openedLessons.value[id]
}

const toggleButtonsModal = (lesson) => {
  modalsContainer.value.toggleLessonModals('buttons', lesson)
}

const getHeight = (duration) => {
  return Math.max(baseHeight, baseHeight * duration)
}

const setLessonsOnWeek = (startDate) => {
  router.push({ query: { start_date: startDate } }).then(() => {
    setLessonsFromUrl()
  })
}

const formatDay = (dateStr) => {
  const [day, month, year] = dateStr.split('.').map(Number)
  let date = new Date(year, month - 1, day)
  date = date.getDay() || 7
  weekDays.value[date].date = new Date(year, month - 1, day)
  // Получаем день недели и форматируем строку
  return `${weekDays.value[date].day_of_week}, ${day}`
}

const setLessonsFromUrl = async () => {
  const queryParams = route.query
  if ('start_date' in queryParams) {
    startDate.value = transformDate(queryParams['start_date'])
    config.value.startDate = transformDate(queryParams['start_date'])
    const lessons = await getLessonsOnWeek(queryParams['start_date'])
    loadEvents(lessons)
    dayOfTheWeek.value = lessons
  } else {
    const today = getPreviousMonday(new Date())
    window.location.search = `?start_date=${formatDate(today)}`
  }
}

const isWeekEmpty = computed(() => {
  if (dayOfTheWeek.value && dayOfTheWeek.value.week.days) {
    for (let index in dayOfTheWeek.value.week.days) {
      const day = dayOfTheWeek.value.week.days[index]
      if (day.lessons && day.lessons.length) {
        return false
      }
    }

    return true // Если уроков нет, возвращаем true
  }

  return false // Если нет данных о днях недели
})

/* ============================================================ Хуки ============================================================ */

onMounted(() => {
  setLessonsFromUrl().then(() => {
    loadEvents(dayOfTheWeek.value)
  })
  localStorage.setItem('activePage', 'calendar-week')
})
</script>

<style lang="scss">
.calendar_default_cell_inner {
  border-bottom: none !important;
  background-color: var(--white) !important;
  border-right: 3px solid var(--grey-dark) !important;
}

.calendar_default_colheader_inner {
  border-right: 3px solid !important;
  border-bottom: 3px solid !important;
  border-color: var(--grey-dark) !important;
  background-color: var(--white) !important;
}

.calendar_default_cornerright_inner,
.calendar_default_corner_inner {
  border-color: transparent !important;
}

.calendar_default_colheader {
  padding: 16px 0;
}

.calendar_default_colheader_inner {
  padding: 16px;
  justify-content: start;
  widows: 100%;
  font-weight: 500;
  text-align: left !important;
  text-transform: uppercase;
  font-size: 20px !important;
  color: var(--blue) !important;
  font-family: 'Arvo', sans-serif;
}

.calendar_default_event {
  left: 1px !important;
}

.event {
  height: 100%;
}

.calendar_default_main {
  min-width: 980px !important;

  > div:nth-child(2) {
    height: 700px !important;
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #b9b9b9;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
}

.calendar_default_event_inner {
  background-color: transparent !important;
  padding: 4px !important;

  > div,
  .event-header,
  .calendar-card__content,
  .calendar-card__lesson {
    height: 100% !important;
  }
}
</style>
