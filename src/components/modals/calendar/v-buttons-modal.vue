<template>
  <v-modal :id="'buttons-modal'">
    <div class="v-buttons-modal">
      <div class="modal-title">Занятие</div>
      <div class="v-buttons-modal__container">
        <div class="v-buttons-modal__button white-btn" @click="toggleLessonModals('delete_lesson')">
          Удалить
        </div>
        <div class="v-buttons-modal__button blue-btn" @click="toggleLessonModals('change_lesson')">
          Редакиировать
        </div>
        <div
          class="v-buttons-modal__button blue-btn"
          @click="toggleLessonModals('transfer_lesson')"
        >
          Перенести
        </div>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import vModal from '../../generalComponents/v-modal.vue'

import { defineEmits } from 'vue'

const emit = defineEmits(['toggleLessonModals'])

const toggleLessonModals = (name) => {
  emit('toggleLessonModals', name)
}
</script>
