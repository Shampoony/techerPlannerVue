<template>
  <form action="" class="v-form-calendar-info">
    <div class="modal-row time" v-if="!removeDate">
      <div class="modal-row__title">Время занятия</div>
      <div class="time__block modal-row__block">
        <input type="time" class="time__picker" placeholder="Начало" />
        <input type="time" class="time__picker" placeholder="Завершение" />
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
      <div class="periodicity__container">
        <div class="periodicity__row" v-for="item in periodicityStack" :key="item.id">
          <h4 class="periodicity__row-title">{{ item.text }}</h4>
          <div class="time">
            <div class="time__block modal-row__block" v-if="timeInputs[item.id]">
              <input
                type="time"
                class="time__picker"
                placeholder="Начало"
                @input="changeTime(item.id)"
                v-model="timeInputs[item.id].start"
              />
              <input
                type="time"
                class="time__picker"
                placeholder="Завершение"
                @input="changeTime(item.id)"
                v-model="timeInputs[item.id].end"
              />
            </div>
          </div>
        </div>
      </div>
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
import { onMounted, ref } from 'vue'

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

const periodicityStack = ref([])

const timeInputs = ref({})

const toggleRadio = (radio, value) => {
  const target = radio === 'reminder' ? reminder : break_group
  target.value = target.value === value ? null : value
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
}

const props = defineProps({
  removeDate: Boolean,
})

onMounted(() => {
  console.log(props.removeDate)
})
</script>
