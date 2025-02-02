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
        />
        <VueTimepicker v-model="timeInputs[1].end" placeholder="--:--" :clearable="false" />
      </div>
    </div>
    <div class="modal-row" v-if="!removeDate">
      <div class="modal-row__title">Дата</div>
      <input class="datepicker" type="date" placeholder="Начало" />
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
      <input class="datepicker" type="date" placeholder="Начало" />
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
  </form>
</template>

<script setup>
import { changeTime } from '@/utils'
import { onMounted, ref, reactive } from 'vue'

/* timepicker */
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

const reminder = ref(null)
const break_group = ref(null)

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
    start: '',
    end: '',
  },
})

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
  console.log(props.removeDate)
})
</script>
