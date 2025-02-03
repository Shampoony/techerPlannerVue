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
            <input type="time" class="styled-input" :value="props.lesson.time_start" readonly />
            <input type="time" class="styled-input" :value="props.lesson.time_end" readonly />
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
              @update:modelValue="changeTime(1, changedData.time)"
              v-model="changedData.time.start"
              placeholder="--:--"
              :clearable="false"
            />
            <VueTimepicker v-model="changedData.time.end" placeholder="--:--" :clearable="false" />
          </div>
        </div>
      </div>
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

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})

const changedData = ref({
  date: new Date(),
  time: {
    1: { start: '', end: '' },
  },
})

onMounted(() => {
  console.log('Выбранный урок - ', props.lesson)
})
</script>
