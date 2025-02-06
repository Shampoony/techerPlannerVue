<template>
  <v-modal>
    <div class="modal-transfer">
      <h2 class="modal-title mb-4">Перенос занятия</h2>
      <input type="text" class="styled-input" :value="props.lesson.student_name" readonly />
      <div class="flex gap-4">
        <div class="modal-transfer__block">
          <h3 class="text-subtitle">Перенести с</h3>
          <input type="text" class="styled-input" :value="props.lesson.date" readonly />
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
          >
            <template #clear-icon="{ clear }"> </template>
          </VueDatePicker>
          <div class="flex gap-2">
            <VueTimepicker
              @update:modelValue="handleTimeUpdate"
              v-model="changedData.time[1].start"
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
import router from '@/router'

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})
const submitForm = () => {
  if (changedData.value) {
    const time = changedData.value.time[1]
    /*  const startTime = `${time.start.HH}:${time.start.mm}:00.000Z`
  const endTime = `${time.end.HH}:${time.end.mm}:00.000Z` */
    console.log(changedData.value.time, changedData.value.time[1])
    const requestBody = {
      day_of_week_id: changedData.value.date.getDay(),
      start_time: time.start,
      end_time: time.end,
      conducted_date: changedData.value.date.toISOString().split('T')[0],
    }
    transferLesson(props.lesson.lesson_id, requestBody, true)
  }
}
/*  {"day_of_week_id":2,"start_time":"16:03:44","end_time":"17:03:44","conducted_date":"2025-02-04"} */

const handleTimeUpdate = (newValue) => {
  changedData.value.time[1].start = newValue
  changedData.value.time[1].end = newValue
  changeTime(1, changedData.value.time) // Не забудьте добавить .value для ref
}

const changedData = ref({
  date: new Date(),
  time: {
    1: { start: '', end: '--:--' },
  },
})

onMounted(() => {
  console.log('Выбранный урок - ', props.lesson)
})
</script>
