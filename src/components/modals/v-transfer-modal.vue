<template>
  <v-modal>
    <div class="modal-transfer">
      <h2 class="modal-title mb-4">Перенос занятия</h2>
      <input
        type="text"
        class="styled-input text-center"
        :value="props.lesson.student_name"
        readonly
      />
      <div class="flex gap-4 modal-transfer__container">
        <div class="modal-transfer__block">
          <h3 class="text-subtitle">Перенести с</h3>
          <input
            type="text"
            class="styled-input text-center"
            :value="formatDay(props.lesson.conducted_date)"
            readonly
          />
          <div class="flex gap-2">
            <input
              type="time"
              class="styled-input text-center"
              :value="props.lesson.start_time"
              readonly
            />
            <input
              type="time"
              class="styled-input text-center"
              :value="props.lesson.end_time"
              readonly
            />
          </div>
        </div>

        <div class="modal-transfer__block">
          <h3 class="text-subtitle">на</h3>
          <VueDatePicker
            class="datepicker"
            :format="formatDay"
            :locale="'ru-ru'"
            v-model="changedData.date"
            :auto-apply="true"
            :position="'left'"
          >
            <template #clear-icon="{ clear }"> </template>
          </VueDatePicker>
          <div class="flex gap-2">
            <VueTimepicker
              @update:modelValue="handleTimeUpdate"
              v-model="changedData.time[1].start"
              :position="'top'"
              placeholder="--:--"
              :clearable="false"
            />
            <VueTimepicker
              v-model="changedData.time[1].start"
              :placeholder="changedData.time[1].end"
              :clearable="false"
            />
          </div>
        </div>
      </div>

      <button class="blue-btn" type="submit" @click.prevent="submitForm">Перенести</button>
    </div>
  </v-modal>
</template>

<script setup>
import vModal from '../generalComponents/v-modal.vue'

/* datepicker */
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

/* timepicker */
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

import { formatDay, changeTime } from '@/utils'
import { ref, defineProps, onMounted } from 'vue'
import { transferLesson } from '@/api/requests'

/* ============================================================ Переменные состояния ============================================================ */

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})

const changedData = ref({
  date: new Date(),
  time: {
    1: { start: '', end: '--:--' },
  },
})

/* =================================================================== Методы ===================================================================== */

const submitForm = () => {
  if (changedData.value) {
    const time = changedData.value.time[1]
    const dayOfWeekId = changedData.value.date.getDay()

    const requestBody = {
      day_of_week_id: dayOfWeekId || 7,
      start_time: time.start + ':00.000Z',
      end_time: time.end + ':00.000Z',
      conducted_date: changedData.value.date.toISOString().split('T')[0],
      in_rule: false,
    }
    transferLesson(props.lesson.lesson_id, requestBody, true)
  }
}

const handleTimeUpdate = (newValue) => {
  changedData.value.time[1].start = newValue
  changedData.value.time[1].end = newValue
  changeTime(1, changedData.value.time)
}

onMounted(() => {
  console.log(props.lesson)
})
</script>
