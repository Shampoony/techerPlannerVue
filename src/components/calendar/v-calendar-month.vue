<template>
  <div class="wrapper">
    <v-base>
      <section class="v-calendar-month" v-if="!isMobile">
        <div class="container">
          <div class="v-calendar-month__container layout">
            <v-calendar-menu :type="'home'" @setMonth="setMonth" @paginateMonth="paginateMonth" />
            <div class="scroll-container" v-if="monthLessons.schedule && daysWeek">
              <div class="v-calendar-month__content">
                <div class="sec-hidden-content showing" v-if="isMonthEmpty">
                  <h1 class="text-title">Еще не запланировано ни одного занятия!</h1>
                </div>
                <table class="v-calendar-month__table calendar" :class="{ blur: isMonthEmpty }">
                  <thead>
                    <tr class="calendar-header">
                      <th v-for="day in daysWeek" :key="day.id">
                        <div class="calendar-header__item">
                          {{ day.days_week }}
                        </div>
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
                        <div class="calendar-row__item-container">
                          <div class="calendar-row__item-content calendar-card" v-if="week[i]">
                            <div class="calendar-card__num">{{ week[i].day }}</div>
                            <div
                              class="calendar-card__content"
                              v-for="(lesson, lessonIndex) in week[i].lessons"
                              :key="lesson.lesson_id"
                              :class="{ completed: lesson.completed }"
                              @click="() => toggleButtonsModal(lesson)"
                              draggable="true"
                              @dragstart="
                                (event) => handleDragStart(event, lesson, weekIndex, i, lessonIndex)
                              "
                            >
                              <div class="calendar-card__lesson" :class="{ trial: lesson.trial }">
                                <p class="calendar-card__lesson-time">
                                  {{ lesson.start_time }} - {{ lesson.end_time }}
                                </p>
                                <p class="calendar-card__lesson-name">
                                  {{ lesson.student_name || 'Артём' }}
                                </p>
                              </div>
                              <div
                                class="calendar-card__lesson break"
                                v-if="
                                  monthLessons.breaks &&
                                  monthLessons.breaks[lesson.lesson_id] &&
                                  monthLessons.breaks[lesson.lesson_id].start_time !==
                                    monthLessons.breaks[lesson.lesson_id].end_time
                                "
                              >
                                {{ monthLessons.breaks[lesson.lesson_id].start_time }} -
                                {{ monthLessons.breaks[lesson.lesson_id].end_time }}
                                {{ lesson.student_name }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="loader-container" v-else>
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="v-calendar-month-mob mob-page" v-else>
        <div class="container">
          <div class="v-calendar-month-mob__container layout">
            <v-calendar-menu :type="'home'" @paginateMonth="paginateMonth" />
            <table class="v-calendar-month-mob__table calendar">
              <thead>
                <tr class="calendar-header">
                  <th v-for="day in daysWeek" :key="day.id">
                    <div class="calendar-header__item">
                    {{ day.days_week }}
                    </div>
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


                    @click="toggleActiveDay(week[i]?.day)"
                    v-for="i in 7"
                    :key="i"
                  >
                  <div    class="calendar-row__item"   :class="{ active: week[i]?.day === activeDay }">

                    <div class="calendar-row__item-content calendar-card" v-if="week[i]">
                      <div class="calendar-card__num">{{ week[i].day }}</div>
                      <div class="calendar-card__content">
                        <div
                          class="calendar-card__lesson"
                          :class="{ trial: lesson.trial }"
                          v-for="lesson in week[i].lessons"
                          :key="lesson.lesson_id"
                        ></div>
                        <div
                          class="calendar-card__lesson break"
                          v-if="week[i].breaks && week[i].breaks[lesson.lesson_id]"
                        ></div>
                      </div>
                    </div>
                  </div>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="v-calendar-month-mob__info lesson-info" v-if="activeDayLessons">
            <router-link
              :to="{ name: 'calendar-day', query: { date: getDayOfDate(activeDayLessons.day) } }"
            >
              <div class="v-calendar-month-mob__day day">
                <div class="day__header">
                  <p class="day__date">{{ getDateOfDay(activeDayLessons.day) }}</p>
                    <svg class="opacity-50" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66663 11.3333L11.3333 4.66663M11.3333 4.66663H4.66663M11.3333 4.66663V11.3333" stroke="#717680" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                </div>
                <div
                  class="day__content"
                  v-for="lesson in activeDayLessons.lessons"
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
      <v-modals-container ref="modalsContainer" />
    </v-base>
  </div>
</template>

<script setup>
import vBase from '../v-base.vue'
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'

import vModalsContainer from '../generalComponents/v-modals-container.vue'

import { getDayOfWeek } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import { useIsMobile } from '@/composables/useIsMobile'
import { ref, onMounted, computed, useTemplateRef } from 'vue'
import { getLessonsOnMonth, transferLesson } from '@/api/requests'

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

const today = ref(new Date())

const currentMonth = ref(today.value.getMonth() + 1)
const currentYear = ref(today.value.getFullYear())

const router = useRouter()
const route = useRoute()

const monthLessons = ref({})

const activeDay = ref()

const draggedItem = ref()

const { isMobile } = useIsMobile()

const modalsContainer = useTemplateRef('modalsContainer')

/* Методы */

const getDayOfDate = (day) => {
  const date = route.query['selected_date'];

  return `${day.toString().padStart(2, '0')}.${date}`
}

const getDateOfDay = (day) => {
  const date = route.query['selected_date'];
  if(date) {
    return getDayOfWeek(date, day)
  }

  return date

}



const toggleActiveDay = (day) => {
  activeDay.value = day
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
    if (!monthLessons.value.schedule[targetRowIndex][targetColumnIndex]) {
      alert('Интерактивным способом вы можете переносить урок только в пределах месяца')
    } else {
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
      const targetDay = String(monthLessons.value.schedule[targetRowIndex][targetColumnIndex].day)

      const requestBody = {
        day_of_week_id: targetColumnIndex,
        start_time: lesson.start_time + ':00.001Z',
        end_time: lesson.end_time + ':00.001Z',

        conducted_date: `${currentYear.value}-${currentMonth.value}-${targetDay.padStart(2, 0)}`,
        in_rule: false,
      }
      transferLesson(lesson.lesson_id, requestBody).then(() => {})
      draggedItem.value = null
    }
  }
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
  getLessonsOnMonth(dateData.year, dateData.month + 1).then((lessons) => {
    monthLessons.value = lessons
  })
}

const paginateMonth = (dateData) => {
  getLessonsOnMonth(dateData.year, dateData.month).then((lessons) => {
    monthLessons.value = lessons
    activeDay.value = []
  })
}
const setLessonsOnDate = () => {
  const params = new URLSearchParams(window.location.search)
  const queryParams = Object.fromEntries(params.entries())

  if ('selected_date' in queryParams) {
    currentMonth.value = queryParams['selected_date'].split('.')[0]
    currentYear.value = queryParams['selected_date'].split('.')[1]
  } else {
    router.push({
      query: {
        selected_date: `${String(currentMonth.value).padStart(2, '0')}.${currentYear.value}`,
      },
    })
  }

  getLessonsOnMonth(currentYear.value, parseInt(currentMonth.value)).then((lessons) => {
    monthLessons.value = lessons
  })
}
/* computed */

const activeDayLessons = computed(() => {
  if (activeDay.value && monthLessons.value.schedule) {
    const value = Object.values(monthLessons.value.schedule).flatMap((week) =>
      Object.values(week).filter((day) => {
        return day.day == activeDay.value
      }),
    )
    console.log()
    if (value) {
      return value[0]
    }
  }
  return null
})

const isMonthEmpty = computed(() => {
  if (monthLessons.value && monthLessons.value.schedule) {
    for (let index in monthLessons.value.schedule) {
      const week = monthLessons.value.schedule[index]
      for (let weekIndex in week) {
        if (week[weekIndex].lessons.length) {
          return false
        }
      }
    }

    return true
  }
  return false
})

/* Хуки */

onMounted(() => {
  setLessonsOnDate()
  localStorage.setItem('activePage', 'home')
  const today = new Date()
  activeDay.value = JSON.parse(today.getDate()) || []
})
</script>
