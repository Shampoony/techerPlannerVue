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
  <div class="wrapper">
    <v-header />
    <DayPilotCalendar
      viewType="day"
      locale="ru-RU"
      :events="events"
      :eventBorderRadius="5"
      ref="calendarRef"
    >
      <template #event="{ event }">
        <div class="event" :class="{ break: event.data.break }">
          <div class="event-header">
            <!-- Event Text -->
            <span class="event-text">{{ event.text() }}</span>
          </div>
        </div>
      </template>
    </DayPilotCalendar>
    <v-footer />
  </div>
</template>

<script setup>
import vHeader from '../generalComponents/v-header.vue'
import vFooter from '../generalComponents/v-footer.vue'
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-vue'

import { ref, onMounted } from 'vue'

const events = ref([])

const calendarRef = ref(null)

const loadEvents = () => {
  events.value = [
    {
      id: 1,
      start: '2025-01-20T10:00:00',
      end: '2025-01-20T11:00:00',
      text: 'Алексей',
      break: false,
    },
    {
      id: 2,
      start: '2025-01-20T11:00:00',
      end: '2025-01-20T11:15:00',
      text: 'Перерыв',
      break: true,
    },
  ]
}

onMounted(() => {
  loadEvents()
  console.log(events.value)
})
</script>

<style scoped>
.event {
  position: absolute;
  inset: 0 0 0 5px;
  padding: 5px;
}

.event-header {
  display: flex;
  align-items: center;
}

.event-text {
  flex-grow: 1;
}

.break {
  background-color: #ffcccc; /* Можно изменить стиль для перерывов */
  color: #ff0000; /* Например, красный цвет для событий перерыва */
}

.event-text {
  font-weight: bold;
}
</style>
