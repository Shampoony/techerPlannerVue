<template>
  <v-modal :id="'lol'">
    <div class="v-trial-modal modal-add">
      <div class="modal-title">Добавление пробного занятия</div>
      <input
        class="styled-input"
        type="text"
        name=""
        id=""
        placeholder="Введите имя ученика"
        v-model="student_name"
      />
      <div class="modal-row">
        <input
          id="pay"
          type="checkbox"
          class="custom-checkbox-input"
          @change="togglePaymentInput"
        />
        <label for="pay" class="custom-checkbox-label">
          <span class="custom-checkbox"></span>
          <div class="v-calendar-menu__checkbox-subtitle">Платное занятие</div>
        </label>
        <div class="modal-row__block">
          <input
            class="styled-input"
            type="number"
            placeholder="1500"
            :readonly="pay"
            v-model="price"
          />
        </div>
      </div>
      <v-form-calendar-info @form-submited="formSubmited" />
    </div>
  </v-modal>
</template>
<script setup>
import vModal from '../generalComponents/v-modal.vue'
import vFormCalendarInfo from '../generalComponents/v-form-calendar-info.vue'

import { ref } from 'vue'
import { setOneTimeLesson } from '@/api/requests'

const pay = ref(true)

const price = ref()
const student_name = ref()

const formSubmited = (data) => {
  data['cost_lesson'] = price.value || 0
  const requestBody = {
    lesson_data: data,
    student_data: { student_name: student_name.value },
  }
  console.log(requestBody)
  setOneTimeLesson(requestBody).then(() => {
    console.log('Создали')
  })
}

const togglePaymentInput = () => {
  pay.value = !pay.value
}
</script>
<style scoped>
.custom-checkbox {
  background-color: var(--grey) !important;
}
</style>
