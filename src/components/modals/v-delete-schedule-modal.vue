<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-delete-schedule-modal">
        <h2 class="modal-title">
          Вы уверены, что хотите удалить расписание регулярных занятий с учеником?
        </h2>
        <p class="modal-subtitle mb-4">
          Все запланированные занятия будут отменены.
        </p>
      </div>
    </template>
    <template #button>
      <button class="custom-btn red" @click="deleteLesson">Удалить</button>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { deleteRuleLessons } from '@/api/requests';

import vCustomModal from '../generalComponents/v-custom-modal.vue';


const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
})

const deleteLesson  = () => {
  deleteRuleLessons(props.lesson.student_id).then(() => {
    console.log('Запрос прошёл успешно')
  })
}
</script>
