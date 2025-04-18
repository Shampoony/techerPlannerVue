<template>
  <v-base>
    <section class="v-finance" v-show="false">
      <div class="container">
        <div class="v-finance__container layout">
          <div class="v-finance__header">
            <h1 class="text-title">Финансы</h1>
            <div class="v-finance__header-buttons">
              <div class="custom-btn white">
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

                Расход
              </div>
              <div class="custom-btn blue">
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

                Доход
              </div>
            </div>
          </div>
          <v-finance-cards />
          <v-finance-earning />
          <v-finance-analysis />
          <v-finance-student />
        </div>
      </div>
    </section>
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  </v-base>
</template>
<script setup>
import vBase from '../v-base.vue'
import vFinanceCards from './v-finance-cards.vue'
import vFinanceEarning from './v-finance-earning.vue'
import vFinanceStudent from './v-finance-student.vue'
import vFinanceAnalysis from './v-finance-analysis.vue'
</script>
