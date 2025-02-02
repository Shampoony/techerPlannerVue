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
          <input type="date" class="styled-input" :v-model="changedData.date" />
          <div class="flex gap-2">
            <input
              type="time"
              class="styled-input"
              @input="changeTime(1, changedData.time)"
              :v-model="changedData.time.start"
            />
            <input type="time" class="styled-input" :v-model="changedData.time.end" />
          </div>
        </div>
      </div>
    </div>
  </v-modal>
</template>

<script setup>
import vModal from '../generalComponents/v-modal.vue'
import { ref, defineProps, onMounted } from 'vue'

import {} from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})

const changedData = ref({
  date: '',
  time: {
    start: '',
    end: '',
  },
})

onMounted(() => {
  console.log('Выбранный урок - ', props.lesson)
})
</script>
