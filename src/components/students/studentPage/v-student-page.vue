<template>
  <v-base>
    <div class="v-student-page">
      <div class="container">
        <div class="v-student-page__container layout">
          <div class="route">
            <router-link :to="{ name: 'my_students' }"> Ученики </router-link>
            <div>/</div>
            <div>Алексей</div>
          </div>

          <div class="v-student-page__menu">
            <div class="v-student-page__menu-top">
              <h1 class="text-title">Алексей</h1>
              <div class="v-student-page__menu-buttons">
                <button class="custom-btn white" @click="() => toggleModal('pay')">
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

                  Оплата
                </button>
                <button class="custom-btn blue" @click="() => toggleModal('result')">
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
                  Результат
                </button>
              </div>
            </div>
            <div class="v-student-page__menu-bottom">
              <div
                class="v-student-page__menu-bottom-item styled-nav"
                :class="{ active: title === activeSec }"
                @click="() => setActiveSection(title)"
                v-for="(title, index) in sectionsTitles"
                :key="index"
              >
                {{ title }}
              </div>
            </div>
          </div>

          <!-- Заменяем множественные v-if на динамический компонент -->
          <component :is="currentComponent" />
        </div>
      </div>
    </div>
  </v-base>
  <transition name="fade">
    <v-pay-modal v-if="modals.pay" @close="() => toggleModal('pay')" />
  </transition>
  <transition name="fade">
    <v-add-result-modal v-if="modals.result" @close="() => toggleModal('result')" />
  </transition>
  <transition name="fade">
    <v-delete-modal v-if="modals.deleteModal" @close="() => toggleModal('deleteModal')" />
  </transition>
  <transition name="fade">
    <v-homework-op-modal
      v-if="modals.homeWorkOpModal"
      @close="() => toggleModal('homeWorkOpModal')"
    />
  </transition>
</template>
<script setup>
import { ref, computed } from 'vue'

import vBase from '@/components/v-base.vue'
import vStudentDetails from './v-student-details.vue'
import vStudentHomework from './v-student-homework.vue'
import vStudentAnalytics from './v-student-analytics.vue'

import vPayModal from '@/components/modals/v-pay-modal.vue'
import vHomeworkOpModal from '@/components/modals/v-homework-op-modal.vue'
import vAddResultModal from '@/components/modals/students/v-add-result-modal.vue'

const activeSec = ref(localStorage.getItem('activeSec') || 'Детали')
const sectionsTitles = ref(['Детали', 'Домашнее задание', 'Аналитика'])

// Используем computed свойство для динамического определения текущего компонента
const currentComponent = computed(() => {
  switch (activeSec.value) {
    case 'Детали':
      return vStudentDetails
    case 'Домашнее задание':
      return vStudentHomework
    case 'Аналитика':
      return vStudentAnalytics
    default:
      return vStudentDetails
  }
})

const modals = ref({
  pay: false,
  result: false,
  deleteModal: false,
  homeWorkOpModal: false,
})

const setActiveSection = (section) => {
  activeSec.value = section
  localStorage.setItem('activeSec', section)
}

const toggleModal = (modal) => {
  modals.value[modal] = !modals.value[modal]
}
</script>
