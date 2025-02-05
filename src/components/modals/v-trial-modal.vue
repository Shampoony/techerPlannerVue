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
  data['paid'] = data['cost_lesson'] > 0
  if (student_name.value) {
    const requestBody = {
      lesson_data: data,

      student_data: { student_name: student_name.value },
    }
    setOneTimeLesson({
      lesson_data: {
        day_of_week_id: 0,
        start_time: '20:40:55.298Z',
        end_time: '20:40:55.298Z',
        repeat_until: '2025-02-05',
        reminder_minutes: 0,
        break_minutes: 0,
        amount_deducted: false,
        status: 'completed',
        conducted_date: '2025-02-05',
        created_date: '2025-02-05',
        reminder_time: '2025-02-05T20:40:55.298Z',
        one_time: false,
        paid: false,
        cost_lesson: 0,
        in_rule: true,
      },
      student_data: {
        student_name: 'string',
      },
    }).then(() => {
      console.log(requestBody)
      console.log('Создали')
    })
  } else {
    alert('Выберите ученика!')
  }
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
{ lesson_data : { amount_deducted : false break_minutes : 10 conducted_date : "2025-02-05"
cost_lesson : 0 created_date : "2025-02-05" day_of_week_id : 3 end_time : "04:03:00.000Z" in_rule :
false one_time : true paid : false reminder_minutes : 10 reminder_time : "2025-02-05T20:40:55.298Z"
repeat_until : "2025-02-06" start_time : "03:03:00.000Z" status : "completed"} student_data :
{student_name: 'Артём'} }
