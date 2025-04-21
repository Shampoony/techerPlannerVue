<template>
  <div class="v-finance-operations styled-section">
    <div class="v-finance-operations__container">
      <div class="v-finance-operations__header">
        <h2 class="v-finance-operaions-title text-section-title">Последние операции</h2>
        <router-link
          :to="{ name: 'history_operations' }"
          class="v-finance-operations__link contact-link mob"
        >
          Открыть историю
          <img src="/src/assets/images/arrow-up-right.svg" alt="" />
        </router-link>
      </div>
      <ul class="v-finance-operations__list">
        <li class="v-finance-operations__list-item finance-operation">
          <div class="finance-operation__block">
            <div class="finance-operation__title">Алексей Иванов</div>
            <div class="status green">+ 2000 ₽</div>
          </div>
          <span class="finance-operation__date caption"> 14.03.2025 </span>
        </li>
        <li class="v-finance-operations__list-item finance-operation">
          <div class="finance-operation__block">
            <div class="finance-operation__title">Налог</div>
            <div class="status red">- 2500 ₽</div>
          </div>
          <span class="finance-operation__date caption"> 14.03.2025 </span>
        </li>
      </ul>

      <router-link
        :to="{ name: 'history_operations' }"
        class="v-finance-operations__link contact-link"
      >
        Открыть историю
        <img src="/src/assets/images/arrow-up-right.svg" alt="" />
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
</script>
