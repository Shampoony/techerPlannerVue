<template>
  <v-custom-modal @submit="deleteLesson">
    <template #modal>
      <div class="v-delete-lesson-modal">
        <div class="modal-title">Отмена занятия</div>
        <div class="v-delete-lesson-modal__container">
        <div class="modal-field col">
          <label for="deposit" class="modal-field__title">Депозит за омтену</label>
          <input type="number" class="custom-input" placeholder="Введите сумму оплаты" v-model="deposit">
          <p class="caption mt-2">Если занятие было оплачено - оставьте поле пустым</p>
        </div>
        </div>
      </div>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref } from 'vue'

import { deleteLessonById, cancelLesson } from '@/api/requests'
import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'

import { defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const deposit = ref(null)

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})
const deleteLesson = () => {
  const lessobData = {
    "lesson_id": props.lesson.lesson_id,
    "canceled_sum": deposit.value
  }
  cancelLesson(lessobData).then(() => {
    console.log('Выполнили запрос')
  })
}
</script>
