<template>
  <v-modal>
    <div class="modal-add">
      <div class="modal-title">Добавление занятия</div>
      <div class="picker modal-add__picker">
        <div
          class="picker__item"
          :class="{ active: activeAdd == 'single' }"
          @click="setActiveAdd('single')"
        >
          Разовое занятие
        </div>
        <div
          class="picker__item"
          :class="{ active: activeAdd == 'stable' }"
          @click="setActiveAdd('stable')"
        >
          Постоянные занятия
        </div>
      </div>
      <v-custom-select :options="options.student" />
      <div class="single" v-if="activeAdd == 'single'">
        <v-form-calendar-info />
      </div>
      <div class="stable" v-if="activeAdd == 'stable'">
        <!-- <v-form-calendar-info :removeDate="true" /> -->
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
                    @update:modelValue="
                      (modelValue) => ((timeInputs[item.id].end = modelValue), console.log(''))
                    "
                    placeholder="--:--"
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
        <button class="blue-btn" type="submit">Добавить</button>
      </div>
    </div>
  </v-modal>
</template>

<script setup>
import vModal from '../generalComponents/v-modal.vue'
import vCustomSelect from '../generalComponents/v-custom-select.vue'
import vFormCalendarInfo from '../generalComponents/v-form-calendar-info.vue'

/* timepicker */
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

/* datepicker */
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

import { formatDay } from '@/utils'

import { ref } from 'vue'

const activeAdd = ref('single')

const setActiveAdd = (name) => {
  activeAdd.value = name
}

const reminder = ref(null)
const break_group = ref(null)
const repeatUntill = ref(new Date())

const periodicityDays = ref([
  { id: 1, text: 'ПН', active: false, day_of_week: 1 },
  { id: 2, text: 'ВТ', active: false, day_of_week: 2 },
  { id: 3, text: 'СР', active: false, day_of_week: 3 },
  { id: 4, text: 'ЧТ', active: false, day_of_week: 4 },
  { id: 5, text: 'ПТ', active: false, day_of_week: 5 },
  { id: 6, text: 'СБ', active: false, day_of_week: 6 },
  { id: 7, text: 'ВС', active: false, day_of_week: 7 },
])

const periodicityStack = ref([])

const timeInputs = ref({})

const options = ref({
  student: {
    default: 'Ученик',
    options: [{ id: 1, text: 'Артур' }],
  },
})

let maxDate = null

const toggleRadio = (radio, value) => {
  const target = radio === 'reminder' ? reminder : break_group
  target.value = target.value === value ? null : value
}

const togglePeriodicity = (day) => {
  addDayToStack(day)
  setDate(day)
}

const addDayToStack = (day) => {
  if (day.active) {
    // Если день уже активен, удаляем его из стека
    const index = periodicityStack.value.findIndex((item) => item.id === day.id)
    if (index !== -1) {
      periodicityStack.value.splice(index, 1)
    }
    day.active = false
    delete timeInputs.value[day.id]
  } else {
    // Если день не активен, добавляем его в стек
    periodicityStack.value.push(day)

    periodicityStack.value.sort((a, b) => a.id - b.id)
    day.active = true
    timeInputs.value[day.id] = { start: '', end: '' }
  }
}

const changeTime = (id) => {
  const currentTime = timeInputs.value[id].start.split(':')
  const hour = parseInt(currentTime[0]) + 1
  const minutes = currentTime[1]
  const endTime = `${hour}:${minutes}`
  timeInputs.value[id].end = endTime
  console.log(endTime, timeInputs.value[id])
}

const handleTime = (modelValue, id) => {
  timeInputs.value[id].start = modelValue
  console.log('Лала', timeInputs.value)
  changeTime(id)
}

/* Устанавливает автоматически дату для поля "повторять до" */
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
</script>
