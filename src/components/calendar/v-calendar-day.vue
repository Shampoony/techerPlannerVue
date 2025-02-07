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
              v-if="config"
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
              <template #event="{ event }">
                <div class="event" @click="toggleButtonsModal(event.data)">
                  <div class="event-header" :class="{ trial: event.data.trial }">
                    <span class="event-text">{{ event.data.student_name }} </span>
                  </div>

                  <div
                    class="event-header"
                    :class="{ break: event.data.break }"
                    v-if="event.data.break.duration"
                  >
                    <span class="event-text">Перерыв</span>
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
  <v-modals-container ref="modalsContainer" />
</template>

<script setup>
import vHeader from '../generalComponents/v-header.vue'
import vFooter from '../generalComponents/v-footer.vue'

import vTrialModal from '../modals/v-trial-modal.vue'
import vLessonModal from '../modals/v-lesson-modal.vue'
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-vue'
import vModalsContainer from '../generalComponents/v-modals-container.vue'

import { ref, onMounted, computed, useTemplateRef, onUnmounted } from 'vue'
import { getLessonsOnDay } from '@/api/requests'
import { useRoute, useRouter } from 'vue-router'
import { formatDate, transformDate } from '@/utils'

const events = ref([])
const currentDate = ref()
const formatedCurrentDate = ref()

const modalsContainer = useTemplateRef('modalsContainer')

const calendarRef = ref(null)
const route = useRoute()

const config = ref({
  cellDuration: 60,
  separators: [{ color: 'Red', location: new DayPilot.Date() }],
})

const modals = ref({
  lessons: false,
  trial_lesson: false,
})

const toggleButtonsModal = (lesson) => {
  modalsContainer.value.toggleLessonModals('buttons', lesson)
}

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
const router = useRouter()

onMounted(() => {
  if (!localStorage.getItem('upd')) {
    localStorage.setItem('upd', 1)
    router.go(0)
  }
  if (route.query.date) {
    currentDate.value = route.query.date
    startDate.value = transformDate(currentDate.value).split('T')[0]
    formatedCurrentDate.value = formatCurrentDate(currentDate.value)
  }
  loadEvents().then(() => {
    console.log('events загружены')
  })
})
onUnmounted(() => {
  localStorage.removeItem('upd')
})
</script>

<style>
.calendar_default_corner,
.calendar_default_colheader {
  display: none !important;
}
</style>
