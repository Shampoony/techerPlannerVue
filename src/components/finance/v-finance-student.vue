<template>
  <div class="v-finance-student styled-section">
    <div class="v-finance-student__header">
      <div class="v-finance-student__header-block">
        <h2 class="text-section-title">Финансовый анализ ученика</h2>
        <v-styled-select :items="myStudents" />
      </div>

      <!-- Дата и чекбокс -->
      <div class="datepicker-wrapper">
        <VueDatePicker
          v-model="date"
          :locale="ruLocale"
          :action-buttons="['cancel', 'submit']"
          cancel-text="Отмена"
          select-text="Выбрать"
          class="custom-datepicker"
          range
          @update-month-year="onMonthChange"
        />

        <label class="month-checkbox">
          <input type="checkbox" v-model="selectFullMonth" @change="handleMonthCheckbox" />
          Выбрать весь месяц
        </label>
      </div>
    </div>

    <!-- Аналитика -->
    <div class="v-finance-student__analysis">
      <ul class="v-finance-student__list">
        <li
          class="v-finance-student__list-item finance-analytics-card"
          v-for="i in 3"
          :key="'plus' + i"
        >
          <div class="finance-analytics-card__img">
            <img src="/src/assets/images/finance-plus.svg" alt="" />
          </div>
          <div class="finance-analytics-card__info">
            <p class="finance-analytics-card__subtitle">Заработано</p>
            <div class="flex gap-3">
              <h4 class="finance-analytics-card__price">240 000 ₽</h4>
              <div class="status green">+20%</div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="v-finance-student__list">
        <li class="v-finance-student__list-item finance-analytics-card">
          <div class="finance-analytics-card__img">
            <img src="/src/assets/images/finance-minus.svg" alt="" />
          </div>
          <div class="finance-analytics-card__info">
            <p class="finance-analytics-card__subtitle">Заработано</p>
            <div class="flex gap-3">
              <h4 class="finance-analytics-card__price">240 000 ₽</h4>
              <div class="status red">-50%</div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="v-finance-student__compare">
      <div class="v-finance-student__compare-block">
        <div class="v-finance-student__compare-subtitle">
          Выбрать ученика для сравнительного анализа
        </div>
        <v-styled-select :items="myStudents" />
      </div>
      <v-compare-chart />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStudentsStore } from '@/stores/studentsStore'

import '@vuepic/vue-datepicker/dist/main.css'
import vCompareChart from './v-compare-chart.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import vStyledSelect from '../generalComponents/v-styled-select.vue'

const store = useStudentsStore()

const myStudents = computed(() => store.students)

onMounted(() => {
  store.getStudents()
})

const date = ref(null)
const selectFullMonth = ref(false)
const selectedMonth = ref(new Date())

function onMonthChange({ month, year }) {
  selectedMonth.value = new Date(year, month, 1)
}

function handleMonthCheckbox() {
  if (selectFullMonth.value) {
    const year = selectedMonth.value.getFullYear()
    const month = selectedMonth.value.getMonth()
    const start = new Date(year, month, 1)
    const end = new Date(year, month + 1, 0)
    date.value = [start, end]
  } else {
    date.value = null
  }
}

onMounted(() => {})
</script>

<style scoped>
.datepicker-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.month-checkbox {
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
</style>
