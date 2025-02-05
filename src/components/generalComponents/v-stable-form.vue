<template>
  <div class="v-stable-form">
    <div class="periodicity">
      <h2 class="periodicity__title title">Периодичность</h2>
      <ul class="periodicity__list">
        <li
          class="periodicity__list-item"
          :class="{ active: day.active }"
          v-for="day in periodicityDays"
          :key="day.id"
          @click="togglePeriodicity(day)"
        >
          {{ day.text }}
        </li>
      </ul>
      <div class="periodicity__container">
        <div class="periodicity__row" v-for="item in periodicityStack" :key="item.id">
          <h4 class="periodicity__row-title">{{ item.text }}</h4>
          <div class="time">
            <div class="time__block modal-row__block" v-if="timeInputs[item.id]">
              <VueTimepicker
                @update:modelValue="(modelValue) => handleTime(modelValue, item.id)"
                v-model="timeInputs[item.id].start"
                placeholder="--:--"
                :clearable="false"
              />
              <VueTimepicker
                v-model="timeInputs[item.id].end"
                @update:modelValue="(modelValue) => handleTimeEnd(modelValue, item.id)"
                :placeholder="timeInputs[item.id].end"
                :clearable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-row">
      <div class="modal-row__title">Повторять до</div>
      <div class="modal-row__block">
        <VueDatePicker
          class="datepicker"
          :format="formatDay"
          :locale="'ru-ru'"
          v-model="repeatUntill"
          :auto-apply="true"
        >
          <template #clear-icon="{ clear }"> </template>
        </VueDatePicker>
      </div>
    </div>
    <div class="modal-row">
      <div class="modal-row__title">Напоминание за, минут</div>
      <div class="modal-row__block">
        <div class="custom-radio" v-for="value in [5, 10, 15]" :key="value">
          <input
            :id="'reminder-' + value"
            type="radio"
            name="reminder"
            :value="value"
            :checked="reminder === value"
            @click="toggleRadio('reminder', value)"
          />

          <label :for="'reminder-' + value">{{ value }}</label>
        </div>
      </div>
    </div>
    <div class="modal-row">
      <div class="modal-row__title">Перерыв после, минут</div>
      <div class="modal-row__block">
        <div class="custom-radio" v-for="value in [5, 10, 15]" :key="value">
          <input
            :id="'break-' + value"
            type="radio"
            name="break"
            :value="value"
            :checked="break_group === value"
            @click="toggleRadio('break_group', value)"
          />
          <label :for="'break-' + value">{{ value }}</label>
        </div>
      </div>
    </div>
    <button class="blue-btn" type="button" @click.prevent="submitForm">Добавить</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

/* Импорт компонентов */
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import { formatDay } from '@/utils'

/* -------------------- Переменные -------------------- */
const emit = defineEmits(['formSubmited'])

/* Переменные состояния */
const periodicityStack = ref([]) // Стек выбранных дней
const reminder = ref(null) // Напоминание за (минуты)
const break_group = ref(null) // Перерыв после (минуты)
const repeatUntill = ref(new Date()) // Дата окончания повторения

const timeInputs = ref({}) // Время для каждого дня
const periodicityDays = ref([
  // Дни недели
  { id: 1, text: 'ПН', active: false, day_of_week: 1, date: '2025-02-04' },
  { id: 2, text: 'ВТ', active: false, day_of_week: 2, date: '2025-02-05' },
  { id: 3, text: 'СР', active: false, day_of_week: 3, date: '2025-02-06' },
  { id: 4, text: 'ЧТ', active: false, day_of_week: 4, date: '2025-02-07' },
  { id: 5, text: 'ПТ', active: false, day_of_week: 5, date: '2025-02-08' },
  { id: 6, text: 'СБ', active: false, day_of_week: 6, date: '2025-02-09' },
  { id: 7, text: 'ВС', active: false, day_of_week: 7, date: '2025-02-10' },
])

const stableForm = ref({}) // Данные формы для отправки

/* -------------------- Методы -------------------- */

/* Добавление/удаление дня из стека */
const addDayToStack = (day) => {
  if (day.active) {
    // Удалить день из стека
    const index = periodicityStack.value.findIndex((item) => item.id === day.id)
    if (index !== -1) {
      periodicityStack.value.splice(index, 1)
    }
    day.active = false
    delete timeInputs.value[day.id]
  } else {
    // Добавить день в стек
    periodicityStack.value.push(day)
    periodicityStack.value.sort((a, b) => a.id - b.id)
    day.active = true
    timeInputs.value[day.id] = { start: '--:--', end: '--:--' }
  }
}

/* обновление времени конца */
const handleTimeEnd = (modelValue, id) => {
  timeInputs.value[id].end = modelValue
}

/* Обработчик отправки формы */
const submitForm = () => {
  stableForm.value['day_of_week'] = []
  stableForm.value['start_times'] = []
  stableForm.value['end_times'] = []
  stableForm.value['reminder_minutes'] = reminder.value
  stableForm.value['break_minutes'] = break_group.value

  periodicityStack.value.forEach((el) => {
    stableForm.value['day_of_week'].push(el.id - 1)

    const startTime = timeInputs.value[el.id].start
    const endTime = timeInputs.value[el.id].end

    // Добавление ведущего нуля для времени
    const formattedStartTime = startTime.split(':')
    const formattedEndTime = endTime.split(':')

    const formattedStart = `${String(formattedStartTime[0]).padStart(2, '0')}:${String(formattedStartTime[1]).padStart(2, '0')}`
    const formattedEnd = `${String(formattedEndTime[0]).padStart(2, '0')}:${String(formattedEndTime[1]).padStart(2, '0')}`

    // Создание даты с правильным временем
    const TimeStringStart = `${formattedStart}:00.000Z`
    const TimeStringEnd = `${formattedEnd}:00.000Z`

    stableForm.value['start_times'].push(TimeStringStart)
    stableForm.value['end_times'].push(TimeStringEnd)
  })
  emit('formSubmited', stableForm.value)
}

/* Обработчик изменения времени */
const changeTime = (id) => {
  const currentTime = timeInputs.value[id].start.split(':')
  const hour = parseInt(currentTime[0]) + 1
  const minutes = currentTime[1]
  const endTime = `${hour}:${minutes}`
  timeInputs.value[id].end = endTime
  console.log(endTime, timeInputs.value[id])
}

/* Установка даты окончания повторения */
const setDate = (day) => {
  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay()
  const difference = day.day_of_week - dayOfWeek

  if (difference > 0) {
    currentDate.setDate(currentDate.getDate() + difference + 1)
  } else {
    currentDate.setDate(currentDate.getDate() + difference + 8)
  }

  const formattedDate = currentDate.toISOString().split('T')[0]
  if (!maxDate || maxDate < formattedDate) {
    repeatUntill.value = formattedDate
    maxDate = formattedDate
  }
}

let maxDate = null // Максимальная дата для повторения

/* Переключатель радиокнопок */
const toggleRadio = (radio, value) => {
  const target = radio === 'reminder' ? reminder : break_group
  target.value = target.value === value ? null : value
}

/* Переключение активности дня */
const togglePeriodicity = (day) => {
  addDayToStack(day)
  setDate(day)
}

/* Обработчик времени в VueTimepicker */
const handleTime = (modelValue, id) => {
  timeInputs.value[id].start = modelValue
  console.log('Лала', timeInputs.value)
  changeTime(id)
}
</script>
