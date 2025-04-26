<template>
  <div class="v-finance__cards">
    <ul class="v-finance__cards-list">
      <li class="v-finance__cards-list-item finance-card styled-section">
        <div class="finance-card__top">
          <div class="finance-card__subtitle">Доход</div>
          <VueDatePicker
          v-model="date"
          :locale="'ru-RU'"
          :clearable="true"
          :format="formatDateRange"
          :action-buttons="['cancel', 'submit']"
          cancel-text="Отмена"
          select-text="Выбрать"
          class="range custom-datepicker"
          range
          @update-month-year="onMonthChange"
        >
        <template #clear-icon="{ clear }"> </template>
      </VueDatePicker>
        </div>
        <div class="finance-card__bottom">
          <div class="finance-card__value">{{ prettyPrice(6500) }} ₽</div>
          <span class="status red">- 2 %</span>
        </div>
      </li>
      <li class="v-finance__cards-list-item finance-card styled-section">
        <div class="finance-card__top">
          <div class="finance-card__subtitle">Средний чек</div>
        </div>
        <div class="finance-card__bottom">
          <div class="finance-card__value">{{ prettyPrice(3000) }} ₽</div>
          <span class="status green">8 %</span>
        </div>
      </li>
      <li class="v-finance__cards-list-item finance-card styled-section">
        <div class="finance-card__top">
          <div class="finance-card__subtitle">Рабочих часов</div>
        </div>
        <div class="finance-card__bottom">
          <div class="finance-card__value">22,5</div>
          <span class="status red">- 2 %</span>
        </div>
      </li>
      <li class="v-finance__cards-list-item finance-card styled-section">
        <div class="finance-card__top">
          <div class="finance-card__subtitle">Расходы</div>
        </div>
        <div class="finance-card__bottom">
          <div class="finance-card__value">{{ prettyPrice(6750) }} ₽</div>
          <span class="status">10 %</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { prettyPrice, formatDateRange } from '@/utils'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const date = ref(null)
</script>
