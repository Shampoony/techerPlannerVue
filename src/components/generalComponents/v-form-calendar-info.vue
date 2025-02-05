<template>
  <form action="" class="v-form-calendar-info">
    <div class="modal-row time" v-if="!removeDate">
      <div class="modal-row__title">Время занятия</div>
      <div class="time__block modal-row__block">
        <VueTimepicker
          @update:modelValue="handleTimeUpdate"
          v-model="timeInputs[1].start"
          placeholder="--:--"
          :clearable="false"
          :manual-input="true"
        />
        <VueTimepicker
          v-model="timeInputs[1].end"
          :placeholder="timeInputs[1].end"
          @update:modelValue="console.log('СЮДАА')"
          :clearable="false"
        />
      </div>
    </div>
    <div class="modal-row" v-if="!removeDate">
      <div class="modal-row__title">Дата</div>
      <div class="modal-row__block">
        <VueDatePicker
          class="datepicker"
          :format="formatDay"
          :locale="'ru-ru'"
          v-model="date"
          :auto-apply="true"
        >
          <template #clear-icon="{ clear }"> </template>
        </VueDatePicker>
      </div>
    </div>
    <div class="periodicity" v-if="removeDate">
      <h2 class="periodicity__title title">Периодичность</h2>
      <ul class="periodicity__list">
        <li
          class="periodicity__list-item"
          :class="{ active: day.active }"
          v-for="day in periodicityDays"
          :key="day.id"
          @click="addDayToStack(day)"
        >
          {{ day.text }}
        </li>
      </ul>
    </div>
    <div class="modal-row" v-if="removeDate">
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
    <button class="blue-btn" type="submit" @click.prevent="submitForm">Добавить</button>
  </form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { changeTime, formatDay } from '@/utils'

/* timepicker */
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

/* datepicker */
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

const reminder = ref(null)
const break_group = ref(null)
const date = ref(new Date())
const nextDate = ref(new Date())
nextDate.value.setDate(date.value.getDate() + 1)
const repeatUntill = ref(new Date())
const costLesson = ref()

const emit = defineEmits(['formSubmited'])

const periodicityDays = ref([
  { id: 1, text: 'ПН', active: false, day_of_week: 1 },
  { id: 2, text: 'ВТ', active: false, day_of_week: 2 },
  { id: 3, text: 'СР', active: false, day_of_week: 3 },
  { id: 4, text: 'ЧТ', active: false, day_of_week: 4 },
  { id: 5, text: 'ПТ', active: false, day_of_week: 5 },
  { id: 6, text: 'СБ', active: false, day_of_week: 6 },
  { id: 7, text: 'ВС', active: false, day_of_week: 7 },
])

const timeInputs = ref({
  1: {
    start: '--:--',
    end: '--:--',
  },
})
const today = new Date()
const submitForm = () => {
  // Проверяем все ключевые значения на undefined или null
  const lessonData = {
    start_time: timeInputs.value[1].start + ':00.000Z',
    end_time: timeInputs.value[1].end + ':00.000Z',
    repeat_until: nextDate.value ? nextDate.value.toISOString().split('T')[0] : null,
    cost_lesson: 0,
    break_minutes: break_group.value || 0,
    reminder_minutes: reminder.value || 0,
    in_rule: false,
    status: 'completed',
    reminder_time: 0,
    one_time: true,
    amount_deducted: false,
    paid: false,
    conducted_date: date.value ? date.value.toISOString().split('T')[0] : null,
    created_date: today ? today.toISOString().split('T')[0] : null,
    day_of_week_id: today ? today.getDay() : null,
  }

  // Проверяем, что нет undefined или null в данных
  const isValid = Object.values(lessonData).every((value) => value !== undefined && value !== null)

  if (isValid) {
    emit('formSubmited', lessonData)
  } else {
    console.log(lessonData)
    alert('Заполните все поля формы!')
    console.error('Некоторые поля пустые или некорректные!')
  }
}

const toggleRadio = (radio, value) => {
  const target = radio === 'reminder' ? reminder : break_group
  target.value = target.value === value ? null : value
}

const handleTimeUpdate = (newValue) => {
  timeInputs.value[1].start = newValue
  timeInputs.value[1].end = newValue
  console.log(timeInputs.value)
  changeTime(1, timeInputs.value) // Не забудьте добавить .value для ref
}

const props = defineProps({
  removeDate: Boolean,
})

onMounted(() => {
  console.log(new Date().getDay())
  console.log(props.removeDate)
})
</script>
