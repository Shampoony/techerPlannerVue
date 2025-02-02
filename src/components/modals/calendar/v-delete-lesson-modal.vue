<template>
  <v-modal :id="'delete-lesson-modal'">
    <div class="v-delete-lesson-modal">
      <div class="modal-title">Удалить занятие?</div>
      <div class="v-delete-lesson-modal__container">
        <div class="v-delete-lesson-modal__button blue-btn">Да</div>
        <div class="v-delete-lesson-modal__button white-btn">Нет</div>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import vModal from '../../generalComponents/v-modal.vue'

import { defineProps, onMounted } from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})

onMounted(() => {
  console.log('Выбранный урок - ', props.lesson)
})
</script>
