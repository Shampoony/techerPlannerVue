<template>
  <div class="v-student-homework">
    <div class="v-student-homework__container">
      <v-homework
        mode="previous"
        :homeWorkDeadline="new Date()"
        :title="'Текущее домашнее задание (занятие 12.03.2025)'"
        :subtitle="'Выполнить задания №22, №23, №24 (стр. 100) из учебника, письменно.'"
      />
      <button class="custom-btn white mt-6" @click="() => toggleModal('tasks')">
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

        Дополнительное домашнее задание
      </button>

      <div class="v-student-homework__archive">
        <h2 class="text-section-title">Архив домашнего задания (12)</h2>
        <ul class="v-student-homework__list">
          <li class="v-student-homework__list-item">
            <v-homework mode="completed" :homeWorkDeadline="new Date()" :mark="5" />
          </li>
          <li class="v-student-homework__list-item">
            <v-homework mode="completed" :homeWorkDeadline="new Date()" :mark="4" />
          </li>
        </ul>
      </div>
    </div>
    <v-homework-stat />
  </div>

  <transition name="fade">
    <v-additionaly-task-modal v-if="modals.tasks" @close="() => toggleModal('tasks')" />
  </transition>
</template>
<script setup>
import { ref } from 'vue'

import vHomework from '@/components/generalComponents/v-homework.vue'
import vHomeworkStat from '@/components/generalComponents/v-homework-stat.vue'

import vAdditionalyTaskModal from '@/components/modals/students/v-additionaly-task-modal.vue'

const modals = ref({
  pay: false,
  result: false,
  tasks: false,
})

const toggleModal = (modal) => {
  modals.value[modal] = !modals.value[modal]
}
</script>
