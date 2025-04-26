<template>
  <div class="v-calendar-menu">
    <div class="v-calendar-menu__top">
      <h1 class="text-title">Календарь</h1>
      <div class="v-calendar-menu__buttons">
        <div class="v-calendar-menu__button custom-btn white" @click="toggleModals('trial_lesson')">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99984 4.16663V15.8333M4.1665 9.99996H15.8332"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Пробное занятие
        </div>
        <div class="v-calendar-menu__button custom-btn blue" @click="toggleModals('lessons')">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99984 4.16663V15.8333M4.1665 9.99996H15.8332"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Занятие
        </div>
      </div>
    </div>
    <div class="v-calendar-menu__block">
      <div class="flex gap-2">
        <div class="v-calendar-menu__picker picker">
          <router-link
            :to="{ name: 'calendar-week' }"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'calendar-week' }"
            @click="setViewType('calendar-week')"
            >Неделя</router-link
          >
          <router-link
            to="/calendar"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'home' }"
            @click="setViewType('home')"
            >Месяц</router-link
          >
        </div>

        <div class="v-calendar-menu__select">
          <div class="v-calendar-menu__select-buttons">
            <div class="v-calendar-menu__select-button" @click.prevent="prevAction">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.20975 5.99989H2.42188M2.42188 5.99989L5.81581 9.39383M2.42188 5.99989L5.81581 2.60595"
                  stroke="#717680"
                  stroke-width="1.48444"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="v-calendar-menu__select-button">
              <VueDatePicker
                v-if="type === 'home'"
                month-picker
                :locale="'ru-ru'"
                :auto-apply="true"
                :format="formatMonth"
                v-model="monthInput"
                @update:model-value="onMonthSelect"
              >
                <template #clear-icon="{ clear }"> </template>
              </VueDatePicker>
              <VueDatePicker
                v-if="type === 'calendar-week'"
                week-picker
                :format="formatWeek"
                :locale="'ru-ru'"
                :auto-apply="true"
                v-model="startDate"
                @update:model-value="onWeekSelect"
              >
                <template #clear-icon="{ clear }"> </template>
              </VueDatePicker>
              <div class="v-calendar-menu__select-button-image">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="#717680"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div class="v-calendar-menu__select-button" @click.prevent="nextAction">
              <svg
                class="rotate-180"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.20975 5.99989H2.42188M2.42188 5.99989L5.81581 9.39383M2.42188 5.99989L5.81581 2.60595"
                  stroke="#717680"
                  stroke-width="1.48444"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
      <div class="v-calendar-menu__meanings flex">
        <div class="v-calendar-menu__meaning blue" @click="toggleModals('trial_lesson')">
          <div></div>
          Занятие
        </div>
        <div class="v-calendar-menu__meaning green" @click="toggleModals('lessons')">
          <div></div>
          Пробное занятие
        </div>
      </div>
    </div>
    <div class="flex justify-between" v-if="isTablet.isMobile">
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
  <div class="v-calendar-menu mob" v-if="isMobile.isMobile">
    <div class="v-calendar-menu__block">
      <div class="flex gap-2 items-center justify-center">
        <div class="v-calendar-menu__picker picker">
          <router-link
            :to="{ name: 'calendar-week' }"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'calendar-week' }"
            @click="setViewType('calendar-week')"
            >Неделя</router-link
          >
          <router-link
            :to="{ name: 'home' }"
            class="v-calendar-menu__picker-item picker__item"
            :class="{ active: type === 'home' }"
            @click="setViewType('home')"
            >Месяц</router-link
          >
        </div>
      </div>
      <div class="v-calendar-menu__date flex items-center justify-center">
        <a class="v-calendar-menu__date-back" @click.prevent="prevAction">
          <img src="/src/assets/images/arrow-right-finance.svg" alt="">
        </a>
        <h3 class="v-calendar-menu__date-text" v-if="type == 'week'">
          {{ weekStart }} - {{ weekEnd }}
        </h3>
        <div v-if="type == 'home'">
          <h3 class="v-calendar-menu__date-text">{{ selectedMonthName }} {{ selectedYear }}</h3>
        </div>
        <a class="v-calendar-menu__date-next" @click.prevent="nextAction">
          <img src="/src/assets/images/arrow-right-finance.svg" alt="">
        </a>
      </div>
      <div class="v-calendar-menu__meanings flex">
        <div class="v-calendar-menu__meaning blue" @click="toggleModals('trial_lesson')">
          <div></div>
          Занятие
        </div>
        <div class="v-calendar-menu__meaning green" @click="toggleModals('lessons')">
          <div></div>
          Пробное занятие
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

import {
  formatWeek,
  formatMonth,
  getMonthByIndex,
  transformDate,
  formatDay,
  formatDate,
  getNextMonday,
} from '@/utils'

import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

import { useRoute, useRouter } from 'vue-router'
import { ref, defineEmits, onMounted, computed, nextTick } from 'vue'

import { useIsMobile } from '@/composables/useIsMobile'

const emit = defineEmits([
  'toggleBreakMode',
  'setMonth',
  'setWeek',
  'paginateMonth',
  'paginateWeek',
])
const showBreakInput = ref(localStorage.getItem('breakMode'))

const startDate = ref({})
const monthInput = ref()

const today = new Date()
const selectedMonth = ref(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`)
const selectedYear = ref(selectedMonth.value.slice(0, 4))

const selectedMonthName = ref()

const isTablet = useIsMobile(768)
const isMobile = useIsMobile(480)

const weekStart = ref()
const weekEnd = ref()

const router = useRouter()
const route = useRoute()

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

/* ================================== Методы ================================== */

/* ================= Для месяца ================= */

const updateQueryParam = () => {
  const month = selectedMonth.value.split('-')[1]
  const year = selectedMonth.value.split('-')[0]

  const query = {
    ...route.query,
    selected_date: `${month}.${year}`,
  }

  router.push({ query })
}

const paginateMonth = (type) => {
  let month = parseInt(selectedMonth.value.split('-')[1])
  let year = parseInt(selectedMonth.value.split('-')[0])

  if (type == 'next') {
    if (month === 12) {
      month = 1
      year += 1
    } else {
      month += 1
    }
  } else if (type === 'prev') {
    if (month === 1) {
      month = 12
      year -= 1
    } else {
      month -= 1
    }
  }

  selectedMonthName.value = getMonthByIndex(month - 1)
  selectedMonth.value = `${year}-${String(month).padStart(2, 0)}`
  monthInput.value = { month: month - 1, year }

  emit('paginateMonth', { month, year })
  updateQueryParam()
}

/* ================= Для недели ================= */

const updateQueryParamWeek = async (date) => {
  const query = {
    ...route.query,
    start_date: date,
  }
  await router.push({ query })
}

const paginateWeek = async (type) => {
  const date = new Date(startDate.value[0])
  const daysToSum = type === 'next' ? 7 : -7
  date.setDate(date.getDate() + daysToSum)

  const formatedStartDate = formatDate(date)

  updateQueryParamWeek(formatedStartDate).then(() => {
    updateWeekFromUrl()
    emit('paginateWeek')
  })
}

const onWeekSelect = (modelData) => {
  startDate.value = modelData
  emit('setWeek', modelData[0].toLocaleDateString('ru-RU'))
}

const checkWeek = () => {
  const queryParams = route.query
  if (queryParams.start_date) {
    const date = queryParams['start_date'].replace(/\./g, '-') // Меняем точки на дефисы для правильного парсинга

    // Форматируем строку в объект Date
    const formattedDate = new Date(date.split('-').reverse().join('-'))
    const options = { day: 'numeric', month: 'long' }

    // Формируем дату начала недели
    weekStart.value = formattedDate.toLocaleDateString('ru-RU', options)

    // Добавляем 7 дней для вычисления даты конца недели
    const endDate = new Date(formattedDate)
    endDate.setDate(formattedDate.getDate() + 7)
    weekEnd.value = endDate.toLocaleDateString('ru-RU', options)

    // Устанавливаем startDate для выбора недели
    startDate.value = [formattedDate, endDate]
  }
}

/* ================= Общие ================= */

const setDateFromUrl = () => {
  checkMonth()
  checkWeek()
}

const toggleModals = (modalName) => {
  modals.value[modalName] = !modals.value[modalName]
}

const changeBreakMode = () => {
  emit('toggleBreakMode')
}
const onMonthSelect = (modelData) => {
  monthInput.value = modelData
  selectedMonth.value = `${modelData.year}-${modelData.month + 1}`

  emit('setMonth', modelData)
}

const checkMonth = () => {
  if (route.query.selected_date) {
    const [month, year] = route.query.selected_date.split('.').map(Number)
    selectedMonthName.value = getMonthByIndex(month - 1)

    if (!isNaN(month) && !isNaN(year)) {
      monthInput.value = { month: month - 1, year: year }
    }
  } else if (!route.query.selected_date) {
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    selectedMonthName.value = getMonthByIndex(month - 1)

    if (!isNaN(month) && !isNaN(year)) {
      monthInput.value = { month: month, year: year }
    }
  }
}

const checkIsModalFromUrl = () => {
  if (route.query['modal'] === 'modal_add') {
    modals.value.lessons = true
    const { modal, ...newQuery } = route.query
    router.replace({ query: newQuery })
  }
}

const setViewType = (viewType) => {
  localStorage.setItem('activePage', viewType)
  console.log(viewType)
  router.push({name: viewType})
}

const updateWeekFromUrl = () => {
  const queryParams = route.query
  const date = queryParams['start_date'].replace(/\./g, '-')

  // Форматируем строку в объект Date
  const formattedDate = new Date(date.split('-').reverse().join('-'))
  const options = { day: 'numeric', month: 'long' }

  // Формируем дату начала недели
  weekStart.value = formattedDate.toLocaleDateString('ru-RU', options)

  // Добавляем 7 дней для вычисления даты конца недели
  const endDate = new Date(formattedDate)
  endDate.setDate(formattedDate.getDate() + 7)
  weekEnd.value = endDate.toLocaleDateString('ru-RU', options)

  // Устанавливаем startDate для выбора недели
  startDate.value = [formattedDate, endDate]
}
const nextAction = computed(() => {
  return props.type === 'home' ? () => paginateMonth('next') : () => paginateWeek('next')
})

const prevAction = computed(() => {
  return props.type === 'home' ? () => paginateMonth('prev') : () => paginateWeek('prev')
})
onMounted(() => {
  setDateFromUrl()
  checkIsModalFromUrl()
})
</script>
