<template>
  <v-modal :id="'delete-lesson-modal'">
    <div class="v-delete-lesson-modal">
      <div class="modal-title">Удалить занятие?</div>
      <div class="v-delete-lesson-modal__container">
        <div class="v-delete-lesson-modal__button blue-btn" @click="deleteLesson">Да</div>
        <div class="v-delete-lesson-modal__button white-btn">Нет</div>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import { deleteLessonById } from '@/api/requests'
import vModal from '../../generalComponents/v-modal.vue'

import { defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})
const deleteLesson = () => {
  console.log('Урок для удаления -', props.lesson)
  deleteLessonById(props.lesson.lesson_id).then(() => {
    router.go(0)
  })
}
onMounted(() => {
  console.log('Выбранный урок - ', props.lesson)
})
</script>
