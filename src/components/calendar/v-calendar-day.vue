<!-- <template>
  <div class="v-calendar-day">
    <DayPilotCalendar :config="calendarConfig" ref="calendarRef">
      <template #event="{ event }">
        <span class="event-icon"> йоу </span>
      </template>
    </DayPilotCalendar>
  </div>
</template>

<script setup>
import { DayPilotCalendar } from '@daypilot/daypilot-lite-vue'
import { onMounted, ref } from 'vue'

const calendarRef = ref(null)

const events = ref([
  {
    id: 1,
    start: '2025-02-24T00:10:00', // ISO формат
    end: '2025-02-24T10:20:00', // ISO формат
    text: 'Event 1',
  },
])

const calendarConfig = ref({
  viewType: 'day',
  locale: 'ru-RU',
  cellDuration: 60,
  timeFormat: 'Clock24Hours',
  events: events.value, // передаем значение events непосредственно
})

onMounted(() => {
  // Обновление событий вручную, если необходимо
  if (calendarRef.value) {
    calendarRef.value.control.update({ events: events.value })
  }
})
</script>
 -->
<template>
  <div class="v-calendar-day">
    <div class="wrapper">
      <v-header />
      <main>
        <section class="v-calendar-day__sec mob-page">
          <div class="v-calendar-day__sec-container container">
            <div class="v-calendar-day__back" @click="$router.go(-1)">
              <img
                src="../../assets/images/arrowRightCalendar.svg"
                class="day-el rotate-180"
                alt=""
              />
              <img
                src="../../assets/images/arrowRightCalendarNight.svg"
                class="night-el rotate-180"
                alt=""
              />
              <p class="text-black">Назад</p>
            </div>
            <h1 class="v-calendar-day__date">{{ formatedCurrentDate }}</h1>
            <div class="v-calendar-day__buttons">
              <div class="v-calendar-day__button trial-btn" @click="toggleModals('trial_lesson')">
                <div class="button-plus">+</div>
                Добавить пробное занятие
              </div>
              <div class="v-calendar-day__button blue-btn" @click="toggleModals('lessons')">
                <div class="button-plus">+</div>
                Добавить занятие
              </div>
            </div>

            <DayPilotCalendar
              :startDate="startDate"
              viewType="day"
              locale="ru-RU"
              :events="events"
              :eventBorderRadius="5"
              :timeRangeSelectedHandling="'Disabled'"
              :cellDuration="60"
              :height="400"
              ref="calendarRef"
            >
              <template #event="{ event }"
                ><!-- :class="{ break: event.data.break.duration }" -->
                <div class="event">
                  <div class="event-header">
                    <!-- Event Text -->
                    <span class="event-text">{{ event.data.student_name }}</span>
                  </div>
                </div>
              </template>
            </DayPilotCalendar>
          </div>
        </section>
      </main>
      <v-footer />
    </div>
  </div>
  <transition name="fade">
    <v-lesson-modal v-if="modals.lessons" @close="toggleModals('lessons')" />
  </transition>
  <transition name="fade">
    <v-trial-modal v-if="modals.trial_lesson" @close="toggleModals('trial_lesson')" />
  </transition>
</template>

<script setup>
import vHeader from '../generalComponents/v-header.vue'
import vFooter from '../generalComponents/v-footer.vue'

import vTrialModal from '../modals/v-trial-modal.vue'
import vLessonModal from '../modals/v-lesson-modal.vue'
import { DayPilotCalendar } from '@daypilot/daypilot-lite-vue'

import { ref, onMounted, computed } from 'vue'
import { getLessonsOnDay } from '@/api/requests'
import { useRoute } from 'vue-router'
import { formatDate, transformDate } from '@/utils'

const events = ref([])
const currentDate = ref()
const formatedCurrentDate = ref()

const calendarRef = ref(null)
const route = useRoute()

const config = ref({
  cellDuration: 60,
})

const modals = ref({
  lessons: false,
  trial_lesson: false,
})

const toggleModals = (modalName) => {
  modals.value[modalName] = !modals.value[modalName]
}

const startDate = ref()

const loadEvents = async () => {
  const lessons = await getLessonsOnDay(currentDate.value)
  const lessonsToEvent = []
  lessons.lessons.forEach((lesson) => {
    // Переименовываем start_time в start
    const { start_time, end_time, ...rest } = lesson
    const formattedStartTime = `${currentDate.value} ${start_time}`
      .replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1T')
      .replace(' ', '')
    const formattedEndTime = `${currentDate.value} ${end_time}`
      .replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1T')
      .replace(' ', '')

    lessonsToEvent.push({
      start: formattedStartTime,
      end: formattedEndTime,
      start_time: end_time.slice(0, 5),
      end_time: end_time.slice(0, 5),
      ...rest,
    })
  })
  events.value = lessonsToEvent
  console.log(events.value)
  /* [
    {
      id: 1,
      start: '2025-01-30T10:00:00',
      end: '2025-01-30T11:00:00',
      text: 'Алексей',
      break: false,
    },

    {
      id: 2,
      start: '2025-01-30T11:00:00',
      end: '2025-01-30T11:15:00',
      text: 'Перерыв',
      break: true,
    },
  ] */
}

const formatCurrentDate = (dateToFormat) => {
  const [day, month, year] = dateToFormat.split('.')

  const date = new Date(year, month - 1, day) // Создаем объект Date

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(date)
  return formattedDate
}

onMounted(() => {
  if (route.query.date) {
    currentDate.value = route.query.date
    startDate.value = transformDate(currentDate.value).split('T')[0]
    formatedCurrentDate.value = formatCurrentDate(currentDate.value)
  }
  loadEvents().then(() => {
    console.log(events.value)
  })
})
</script>

<style>
.calendar_default_corner,
.calendar_default_colheader {
  display: none !important;
}
</style>
