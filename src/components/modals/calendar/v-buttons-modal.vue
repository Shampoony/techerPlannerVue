<template>
  <v-modal :id="'buttons-modal'">
    <div class="v-buttons-modal">
      <div class="modal-title">Занятие</div>
      <div class="v-buttons-modal__container">
        <div class="v-buttons-modal__button white-btn" @click="toggleLessonModals">Удалить</div>
        <div class="v-buttons-modal__button blue-btn">Редакиировать</div>
        <div class="v-buttons-modal__button blue-btn">Перенести</div>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import vModal from '../../generalComponents/v-modal.vue'

import { defineEmits } from 'vue'

const emit = defineEmits(['toggleLessonModals'])

const toggleLessonModals = () => {
  emit('toggleLessonModals', 'delete_lesson')
  console.log(emit)
}
</script>
