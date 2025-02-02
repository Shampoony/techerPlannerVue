<template>
  <div class="wrapper">
    <v-header />
    <main v-if="!isMobile">
      <section class="v-calendar-week">
        <div class="v-calendar-week__container container">
          <v-calendar-menu
            :is-showed-break="true"
            :type="'week'"
            @toggleBreakMode="toggleBreakMode"
          />
          <div class="v-calendar-week__content scroll-container" v-if="!breakMode">
            <table class="v-calendar-week__table calendar">
              <thead>
                <tr class="calendar-header">
                  <th class="calendar-header__item" v-for="(day, index) in weekDays" :key="index">
                    {{ day.title }}, {{ day.number }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="calendar-row">
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
                        v-for="(lesson, lessonIndex) in day.lessons"
                        :key="lesson.lesson_id"
                        @click="toggleButtonsModal(lesson)"
                        draggable="true"
                        @dragstart="
                          (event) => handleDragStart(event, lesson, columnIndex, lessonIndex)
                        "
                      >
                        <div
                          class="calendar-card__lesson"
                          :style="{
                            height: getHeight(lesson.duration),
                            gap: `${baseGap * lesson.duration}px`,
                          }"
                        >
                          <p>{{ lesson.start_time }} - {{ lesson.end_time }}</p>
                          <p>{{ lesson.student_name }}</p>
                        </div>
                        <div class="calendar-card__break" v-if="lesson.break">
                          {{ lesson.break.duration }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="v-calendar-week__break scroll-container" v-else>
            <DayPilotCalendar :config="config" :events="events" ref="calendarRef">
              <template #event="{ event }">
                <div class="event" @click="toggleButtonsModal(event.data)">
                  <div class="event-header">
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson">
                        <p>{{ event.data.start_time }} - {{ event.data.end_time }}</p>
                        <p>{{ event.data.student_name }}</p>
                      </div>
                      <div class="calendar-card__break" v-if="event.data.break">
                        {{ event.data.break.duration }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </DayPilotCalendar>
          </div>
        </div>
      </section>
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
      <v-transfer-modal
        v-if="modals.transfer_lesson"
        @close="toggleLessonModals('transfer_lesson')"
        :lesson="pickedLesson"
      />
    </transition>
    <transition name="fade">
      <v-change-modal
        v-if="modals.change_lesson"
        @close="toggleLessonModals('change_lesson')"
        :lesson="pickedLesson"
      />
    </transition>
    <transition name="fade">
      <v-delete-lesson-modal
        v-if="modals.delete_lesson"
        @close="toggleLessonModals('delete_lesson')"
        :lesson="pickedLesson"
      />
    </transition>
  </div>
</template>

<script setup>
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'
import VHeader from '../generalComponents/v-header.vue'
import vChangeModal from '../modals/v-change-modal.vue'
import vTransferModal from '../modals/v-transfer-modal.vue'
import vButtonsModal from '../modals/calendar/v-buttons-modal.vue'
import vDeleteLessonModal from '../modals/calendar/v-delete-lesson-modal.vue'

import { ref, onMounted } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-vue'

const { isMobile } = useIsMobile()
const baseGap = 10
const baseHeight = 90

const pickedLesson = ref(null)
const breakMode = ref(localStorage.getItem('breakMode') === 'true')
const events = ref()

const config = {
  viewType: 'Week',
  startDate: DayPilot.Date.today(),
  eventResizeHandling: 'Disabled',
  timeRangeSelectedHandling: 'Disabled',
  locale: 'ru-RU',
  headerDateFormat: 'ddd, d',
  allowEventOverlap: false,
  touch: true,
  onTimeRangeSelected: async (args) => {
    const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event 1')
    if (modal.canceled) {
      return
    }
    const newEvent = {
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      text: modal.result,
    }
    events.value.push(newEvent)
  },

  onEventMoved: (args) => {
    console.log('Event moved', args)
  },
  onEventResized: (args) => {
    console.log('Event resized')
  },
}

const loadEvents = async () => {
  events.value = [
    {
      lesson_id: 312,
      student_name: 'Артур',
      start_time: '12:30',
      end_time: '13:00',
      start: DayPilot.Date.today().addHours(10).toString(),
      end: DayPilot.Date.today().addHours(14).toString(),
      duration: 1,
      break: {
        break_id: 1,
        duration: '15 минут',
      },
    },
    {
      lesson_id: 316,
      student_name: 'Тимур',
      start_time: '14:00',
      start: DayPilot.Date.today().addHours(15).toString(),
      end: DayPilot.Date.today().addHours(16).toString(),
      end_time: '15:00',
      duration: 1,
    },

    /*  {
      id: 2,
      start: DayPilot.Date.today().addHours(15).toString(),
      end: DayPilot.Date.today().addHours(16).toString(),
      text: 'Event 2',
    }, */
  ]
}

const weekDays = ref([
  { title: 'пн', number: 20 },
  { title: 'вт', number: 21 },
  { title: 'ср', number: 22 },
  { title: 'чт', number: 23 },
  { title: 'пт', number: 24 },
  { title: 'сб', number: 25 },
  { title: 'вс', number: 26 },
])

const modals = ref({
  buttons: false,
  delete_lesson: false,
  transfer_lesson: false,
  change_lesson: false,
})

const dayOfTheWeek = ref({
  week: {
    start_date: '20.01.2025',
    end_date: '26.01.2025',
    days: {
      1: {
        lessons: [],
      },
      2: {
        lessons: [
          {
            lesson_id: 312,
            student_name: 'Артур',
            start_time: '12:30:00',
            end_time: '13:00:00',
            break: {
              break_id: 1,
              duration: '15 минут',
            },
          },
          {
            lesson_id: 316,
            student_name: 'Тимур',
            start_time: '14:00:00',
            end_time: '15:00:00',
          },
        ],
      },
      3: {
        lessons: [],
      },
      4: {
        lessons: [
          {
            lesson_id: 314,
            student_name: 'Артур',
            start_time: '14:00:00',
            end_time: '15:00:00',
            break: {
              break_id: 2,
              duration: '60 минут',
            },
          },
          {
            lesson_id: 317,
            student_name: 'Артур',
            start_time: '16:00:00',
            end_time: '17:00:00',
            break: {
              break_id: 3,
              duration: '60 минут',
            },
          },
          {
            lesson_id: 318,
            student_name: 'Артур',
            start_time: '18:00:00',
            end_time: '19:00:00',
          },
        ],
      },
      5: {
        lessons: [],
      },
      6: {
        lessons: [],
      },
      7: {
        lessons: [],
      },
    },
  },
})

const draggedItem = ref({
  lesson: null,
  fromColumnIndex: null,
  fromLessonIndex: null,
})

const handleDragStart = (event, lesson, columnIndex, lessonIndex) => {
  draggedItem.value = { lesson, fromColumnIndex: columnIndex, fromLessonIndex: lessonIndex }
}

const handleDrop = (event, targetColumnIndex) => {
  const { lesson, fromColumnIndex, fromLessonIndex } = draggedItem.value

  if (fromColumnIndex !== targetColumnIndex) {
    // Получаем список уроков из исходного и целевого столбцов
    const sourceLessons = dayOfTheWeek.value.week.days[fromColumnIndex].lessons
    const targetLessons = dayOfTheWeek.value.week.days[targetColumnIndex].lessons

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
  }

  draggedItem.value = { lesson: null, fromColumnIndex: null, fromLessonIndex: null }
}

const toggleBreakMode = () => {
  window.location.reload(true)
  breakMode.value = !breakMode.value
  localStorage.setItem('breakMode', breakMode.value)

  if (breakMode.value) {
    loadEvents()
  } else {
    events.value = [] // Очищаем события при выключенном режиме
  }
}

const toggleLessonModals = (modalName) => {
  modals.value[modalName] = !modals.value[modalName]
  console.log(modalName)
}

const toggleButtonsModal = (lesson) => {
  toggleLessonModals('buttons')
  pickedLesson.value = lesson
}

const getHeight = (duration) => {
  return Math.max(baseHeight, baseHeight * duration)
}
onMounted(() => {
  console.log(breakMode.value)
  if (breakMode.value) {
    loadEvents()
  }
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
