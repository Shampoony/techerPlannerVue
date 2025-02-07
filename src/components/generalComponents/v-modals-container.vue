<template>
  <transition name="fade">
    <v-buttons-modal
      v-if="modals.buttons"
      @toggleLessonModals="toggleLessonModals"
      @close="toggleLessonModals('buttons')"
      :lesson="pickedLesson"
    />
  </transition>
  <transition name="fade">
    <v-transfer-modal
      v-if="modals.transfer_lesson"
      @close="toggleLessonModals('transfer_lesson')"
      :lesson="pickedLesson"
    />
  </transition>
  <transition name="fade">
    <v-change-modal
      v-if="modals.change_lesson"
      @close="toggleLessonModals('change_lesson')"
      :lesson="pickedLesson"
    />
  </transition>
  <transition name="fade">
    <v-delete-lesson-modal
      v-if="modals.delete_lesson"
      @close="toggleLessonModals('delete_lesson')"
      :lesson="pickedLesson"
    />
  </transition>
</template>
<script setup>
import vChangeModal from '../modals/v-change-modal.vue'
import vTransferModal from '../modals/v-transfer-modal.vue'
import vButtonsModal from '../modals/calendar/v-buttons-modal.vue'
import vDeleteLessonModal from '../modals/calendar/v-delete-lesson-modal.vue'
import { ref, defineExpose } from 'vue'

const toggleLessonModals = (modalName, lesson = null) => {
  if (lesson) {
    pickedLesson.value = lesson
  }
  modals.value[modalName] = !modals.value[modalName]
}
const modals = ref({
  buttons: false,
  delete_lesson: false,
  transfer_lesson: false,
  change_lesson: false,
})
const pickedLesson = ref({})
defineExpose({
  toggleLessonModals,
})
</script>
