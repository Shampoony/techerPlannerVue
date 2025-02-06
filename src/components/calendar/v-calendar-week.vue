<template>
  <div class="wrapper">
    <v-header />
    <main>
      <section class="v-calendar-week" v-if="!isMobile">
        <div class="v-calendar-week__container container">
          <v-calendar-menu
            :is-showed-break="true"
            :type="'week'"
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
                    <th
                      class="calendar-header__item"
                      v-for="(day, index) in dayOfTheWeek.week.days"
                      :key="index"
                    >
                      {{ formatDay(day.day) }}
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
                              :style="{
                                height: getHeight(lesson.duration),
                                gap: `${baseGap * lesson.duration}px`,
                              }"
                            >
                              <p>
                                {{ cutSeconds(lesson.start_time) }} -
                                {{ cutSeconds(lesson.end_time) }}
                              </p>
                              <p>{{ lesson.student_name }}</p>
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
            v-if="breakMode && dayOfTheWeek && !isWeekEmpty"
          >
            <DayPilotCalendar
              :config="config"
              :events="events"
              ref="calendarRef"
              v-if="events.length"
            >
              <template #event="{ event }">
                <div class="event" @click="toggleButtonsModal(event.data)">
                  <div class="event-header">
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson">
                        <p>{{ event.data.start_time }} - {{ event.data.end_time }}</p>
                        <p>{{ event.data.student_name }}</p>
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
      </section>
      <section class="v-calendar-week-mob mob-page" v-else>
        <div class="v-calendar-week-mob__container container">
          <v-calendar-menu
            :is-showed-break="true"
            :type="'week'"
            @setWeek="setLessonsOnWeek"
            @toggleBreakMode="toggleBreakMode"
          />
          <ul class="v-calendar-week-mob__list" v-if="dayOfTheWeek && dayOfTheWeek.week">
            <li
              v-for="(day, id) in dayOfTheWeek.week.days"
              :key="id"
              class="v-calendar-week-mob__list-item"
            >
              <div class="day" v-if="day">
                <div class="day__header" @click="toggleOppenedDays(id, day.day)">
                  <p class="day__date">{{ day.day }}</p>
                  <img src="../../assets/images/arrowRightCalendar.svg" class="day-el" alt="" />
                  <img
                    src="../../assets/images/arrowRightCalendarNight.svg"
                    class="night-el"
                    alt=""
                  />
                </div>

                <transition name="fade">
                  <div v-if="openedLessons[id] || isToday(day.day)">
                    <router-link :to="{ name: 'calendar-day', query: { date: day.day } }">
                      <div
                        class="day__content"
                        v-for="(lesson, number) of day.lessons"
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
                        <div class="day__lesson break" v-if="lesson.breaks">
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
                              <p>{{ lesson.breaks.start_time }}</p>
                              <p>-</p>
                              <p>{{ lesson.breaks.end_time }}</p>
                            </div>
                          </div>
                          <div class="day__lesson-name">Перерыв</div>
                        </div>
                      </div>
                    </router-link>
                    <div v-if="!day.lessons.length" class="title pb-4">
                      В этот день у вас нет уроков!
                    </div>
                  </div>
                </transition>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
    <v-footer />

    <v-modals-container ref="modalsContainer" />
  </div>
</template>

<script setup>
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'
import VHeader from '../generalComponents/v-header.vue'
import vModalsContainer from '../generalComponents/v-modals-container.vue'

import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, useTemplateRef, computed } from 'vue'

import { useIsMobile } from '@/composables/useIsMobile'
import { getLessonsOnWeek, transferLesson } from '@/api/requests'
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-vue'
import { formatDate, formatDateToStandart, getPreviousMonday, transformDate } from '@/utils'

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

const config = ref({
  viewType: 'Week',
  cellDuration: 15,

  startDate: transformDate(startDate.value),
  allowEventOverlap: false,

  eventResizeHandling: 'Disabled',
  timeRangeSelectedHandling: 'Disabled',
  locale: 'ru-RU',
  headerDateFormat: 'ddd, d',
  touch: true,
  weekStarts: 1,

  onEventMoved: (args) => {
    console.log('Event moved', args)
    const startTime = args.newStart.value.split('T')[1]
    const endTime = args.newStart.value.split('T')[1]
    const startDate = args.e.data.start.value.split('T')[0]
    const dayOfWeek = new Date(args.newStart.value).getDay()

    const eventData = {
      day_of_week_id: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
      conducted_date: startDate,
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
  console.log(lessonsToEvent)
  events.value = lessonsToEvent
}

const weekDays = ref({
  0: { day_of_week: 'пн', date: '' },
  1: { day_of_week: 'вт', date: '' },
  2: { day_of_week: 'ср', date: '' },
  3: { day_of_week: 'чт', date: '' },
  4: { day_of_week: 'пт', date: '' },
  5: { day_of_week: 'сб', date: '' },
  6: { day_of_week: 'вс', date: '' },
})

const modalsContainer = useTemplateRef('modalsContainer')
const dayOfTheWeek = ref()
const lessonsOfWeek = ref({})
const draggedItem = ref({
  lesson: null,
  fromColumnIndex: null,
  fromLessonIndex: null,
})

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
    const conductedDate = weekDays.value[targetColumnIndex].date.toISOString().split('T')[0]

    const requestBody = {
      day_of_week_id: parseInt(targetColumnIndex),
      start_time: lesson.start_time,
      end_time: lesson.end_time,
      conducted_date: conductedDate,
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
    console.log(requestBody)

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
  setLessonsFromUrl()
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
  weekDays.value[date - 1].date = new Date(year, month - 1, day)
  // Получаем день недели и форматируем строку
  return `${weekDays.value[date - 1].day_of_week}, ${day}`
}

const setLessonsFromUrl = () => {
  const queryParams = route.query
  if ('start_date' in queryParams) {
    startDate.value = transformDate(queryParams['start_date'])
    config.value.startDate = transformDate(queryParams['start_date'])
    getLessonsOnWeek(queryParams['start_date']).then((lessons) => {
      console.log('Загружаем')
      loadEvents(lessons)
      lessonsOfWeek.value = lessons
      dayOfTheWeek.value = lessons
    })
  } else {
    const today = getPreviousMonday(new Date())
    window.location.search = `?start_date=${formatDate(today)}`
  }
  console.log(lessonsOfWeek.value)
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

onMounted(() => {
  setLessonsFromUrl()
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

.calendar-card__lesson {
  background-color: var(--blue) !important;
  border-radius: 4px;
}
</style>
