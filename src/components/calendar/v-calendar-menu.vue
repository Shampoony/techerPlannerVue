<template>
  <div class="v-calendar-menu">
    <div class="v-calendar-menu__block">
      <div class="flex gap-2">
        <div class="v-calendar-menu__picker picker">
          <router-link
            :to="{ name: 'calendar-week' }"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'week' }"
            >Неделя</router-link
          >
          <router-link
            :to="{ name: 'home' }"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'month' }"
            >Месяц</router-link
          >
        </div>

        <div class="v-calendar-menu__select">
          <div class="v-calendar-menu__select-buttons">
            <div class="v-calendar-menu__select-button">
              <month-picker-input
                v-if="type === 'month'"
                :no-default="false"
                :lang="'ru'"
                v-model="selectedMonth"
                @change="onMonthSelect"
              >
              </month-picker-input>
              <VueDatePicker
                v-if="type === 'week'"
                week-picker
                :format="formatWeek"
                :locale="'ru-ru'"
                v-model="date"
                @update:model-value="onWeekSelect"
              >
                <template #clear-icon="{ clear }"> </template>
              </VueDatePicker>
              <div class="v-calendar-menu__select-button-image">
                <img class="" src="../../assets/images/arrow-down.svg" alt="" />
                <img class="" src="../../assets/images/arrow-down-night.svg" alt="" />
              </div>
            </div>
            <div class="v-calendar-menu__select-button">
              <svg
                class="day-el"
                width="6"
                height="14"
                viewBox="0 0 6 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="scale(-1,1) translate(-6,0)">
                  <path d="M6 7L-6.52533e-07 13.9282L-4.68497e-08 0.0717966L6 7Z" fill="#202020" />
                </g>
              </svg>
              <svg
                class="night-el"
                width="6"
                height="14"
                viewBox="0 0 6 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="scale(-1,1) translate(-6,0)">
                  <path d="M6 7L-6.52533e-07 13.9282L-4.68497e-08 0.0717966L6 7Z" fill="#fff" />
                </g>
              </svg>
            </div>
            <div class="v-calendar-menu__select-button">
              <svg
                class="day-el"
                width="6"
                height="14"
                viewBox="0 0 6 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 7L-6.52533e-07 13.9282L-4.68497e-08 0.0717966L6 7Z" fill="#202020" />
              </svg>

              <img src="../../assets/images/arrow-right-night.svg" class="night-el" alt="" />
            </div>
          </div>
        </div>
        <div class="v-calendar-menu__checkbox flex gap-2" v-if="isShowedBreak">
          <input
            type="checkbox"
            class="custom-checkbox-input"
            id="break"
            @change="changeBreakMode"
            v-model="showBreakInput"
          />
          <label for="break" class="custom-checkbox-label">
            <span class="custom-checkbox"></span>
            <div class="v-calendar-menu__checkbox-subtitle">Показывать перерыв между занятиями</div>
          </label>
        </div>
      </div>
      <!-- /* toggleModals('trial_lesson') */ -->
      <div class="v-calendar-menu__buttons flex">
        <div class="v-calendar-menu__button trial-btn" @click="toggleModals('trial_lesson')">
          <div class="button-plus">+</div>
          Пробное занятие
        </div>
        <div class="v-calendar-menu__button blue-btn" @click="toggleModals('lessons')">
          <div class="button-plus">+</div>
          Занятие
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="v-calendar-menu__select mob">
        <div class="v-calendar-menu__select-buttons">
          <div class="v-calendar-menu__select-button">
            <month-picker-input
              v-if="type === 'month'"
              :no-default="false"
              :lang="'ru'"
              v-model="selectedMonth"
              @change="onMonthSelect"
            >
            </month-picker-input>
            <VueDatePicker
              v-if="type === 'week'"
              week-picker
              :format="formatWeek"
              :locale="'ru-ru'"
              v-model="date"
              @update:model-value="onWeekSelect"
            >
              <template #clear-icon="{ clear }"> </template>
            </VueDatePicker>
            <div class="v-calendar-menu__select-button-image">
              <img src="../../assets/images/arrow-down.svg" class="day-el" alt="" />
              <img src="../../assets/images/arrow-down-night.svg" class="night-el" alt="" />
            </div>
          </div>
          <div class="v-calendar-menu__select-button">
            <img src="../../assets/images/arrow-left.svg" class="day-el" alt="" />
            <img src="../../assets/images/arrow-left-night.svg" class="night-el" alt="" />
          </div>
          <div class="v-calendar-menu__select-button">
            <img src="../../assets/images/arrow-right.svg" class="day-el" alt="" />
            <img src="../../assets/images/arrow-right-night.svg" class="night-el" alt="" />
          </div>
        </div>
      </div>
      <div class="v-calendar-menu__checkbox flex gap-2 mob" v-if="isShowedBreak">
        <input
          type="checkbox"
          class="custom-checkbox-input"
          id="mob-break"
          @change="emit('toggleBreakMode')"
          v-model="showBreakInput"
        />
        <label for="mob-break" class="custom-checkbox-label">
          <span class="custom-checkbox"></span>
          <div class="v-calendar-menu__checkbox-subtitle">Показывать перерыв между занятиями</div>
        </label>
      </div>
    </div>
  </div>
  <div class="v-calendar-menu mob">
    <div class="v-calendar-menu__block">
      <div class="flex gap-2 items-center justify-center">
        <div class="v-calendar-menu__picker picker">
          <router-link
            :to="{ name: 'calendar-week' }"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'week' }"
            >Неделя</router-link
          >
          <router-link
            :to="{ name: 'home' }"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'month' }"
            >Месяц</router-link
          >
        </div>
      </div>
      <div class="v-calendar-menu__date flex items-center justify-center">
        <a class="v-calendar-menu__date-back" href="">
          <img src="../../assets/images/arrowRightCalendar.svg" class="day-el" alt="" />
          <img src="../../assets/images/arrowRightCalendarNight.svg" class="night-el" alt="" />
        </a>
        <h3 class="v-calendar-menu__date-text">31 января - 5 февраля</h3>
        <a class="v-calendar-menu__date-next" href="">
          <img src="../../assets/images/arrowRightCalendar.svg" class="day-el" alt="" />
          <img src="../../assets/images/arrowRightCalendarNight.svg" class="night-el" alt="" />
        </a>
      </div>
      <div class="v-calendar-menu__buttons flex">
        <div class="v-calendar-menu__button trial-btn" @click="toggleModals('trial_lesson')">
          <div class="button-plus">+</div>
          Пробное занятие
        </div>
        <div class="v-calendar-menu__button blue-btn" @click="toggleModals('lessons')">
          <div class="button-plus">+</div>
          Занятие
        </div>
      </div>
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
import vTrialModal from '../modals/v-trial-modal.vue'
import vLessonModal from '../modals/v-lesson-modal.vue'

import { format, startOfWeek, endOfWeek } from 'date-fns'
import { ru } from 'date-fns/locale'

import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

import { MonthPickerInput } from 'vue-month-picker'

import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggleBreakMode', 'setMonth', 'setWeek'])

const showBreakInput = ref(localStorage.getItem('breakMode'))

const date = ref({})
const selectedMonth = ref()

const router = useRouter()

const props = defineProps({
  isShowedBreak: {
    type: Boolean,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
})

const modals = ref({
  lessons: false,
  trial_lesson: false,
})

const toggleModals = (modalName) => {
  console.log(modalName)
  modals.value[modalName] = !modals.value[modalName]
}
const formatWeek = (date) => {
  if (!date) return ''

  // Определяем начало и конец недели
  const start = startOfWeek(date, { weekStartsOn: 1 }) // Неделя начинается с понедельника
  const end = endOfWeek(date, { weekStartsOn: 1 })

  // Форматируем даты вручную
  const startFormatted = format(start, 'd MMM', { locale: ru })
  const endFormatted = format(end, 'd MMM', { locale: ru })

  return `${startFormatted} - ${endFormatted}`
}
const onWeekSelect = (modelData) => {
  emit('setWeek', modelData[0].getDate())
}

const changeBreakMode = () => {
  emit('toggleBreakMode')
  router.go(0)
}

const onMonthSelect = (modelData) => {
  emit('setMonth', modelData.monthIndex)
}
</script>
