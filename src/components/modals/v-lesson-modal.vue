<template>
  <v-modal>
    <div class="modal-add">
      <div class="modal-title">Добавление занятия</div>
      <div class="picker modal-add__picker">
        <div
          class="picker__item"
          :class="{ active: activeAdd == 'single' }"
          @click="setActiveAdd('single')"
        >
          Разовое занятие
        </div>
        <div
          class="picker__item"
          :class="{ active: activeAdd == 'stable' }"
          @click="setActiveAdd('stable')"
        >
          Постоянные занятия
        </div>
      </div>
      <v-custom-select :options="options.student" @valueSelected="setStudent" />
      <div class="single" v-if="activeAdd == 'single'">
        <v-form-calendar-info @form-submited="submitSingleForm" />
      </div>
      <div class="stable" v-if="activeAdd == 'stable'">
        <v-stable-form @form-submited="submitStableForm" />
      </div>
    </div>
  </v-modal>
</template>

<script setup>
import vModal from '../generalComponents/v-modal.vue'
import vStableForm from '../generalComponents/v-stable-form.vue'
import vCustomSelect from '../generalComponents/v-custom-select.vue'
import vFormCalendarInfo from '../generalComponents/v-form-calendar-info.vue'

import { onMounted, ref } from 'vue'
import { sortObject, stableOrder } from '@/utils'
import { getMyStudents, setOneTimeLesson, setStableLesson } from '@/api/requests'

/* ============================================================ Переменные состояния ============================================================*/

const activeAdd = ref('single')
const student = ref()

const options = ref({
  student: {
    default: 'Ученик',
    options: [{ id: 1, text: 'Артур' }],
  },
})

/* ============================================================ Методы ============================================================*/

const setActiveAdd = (name) => {
  activeAdd.value = name
}

const submitStableForm = (stableForm) => {
  if (student.value) {
    stableForm['student_id'] = student.value.id
    stableForm['goal'] = 'string'
    stableForm['in_rule'] = true

    const isValid = Object.values(stableForm).every(
      (value) => value !== undefined && value !== null,
    )

    if (isValid) {
      setStableLesson(sortObject(stableForm, stableOrder)).then(() => {
        console.log('Запрос выполнен')
      })
    } else {
      alert('Заполните все поля формы')
    }
  } else {
    alert('Выберите ученика')
  }
}
const submitSingleForm = (singleForm) => {
  singleForm['trial'] = false

  if (student.value) {
    singleForm['student_id'] = student.value.id
    /*  const requestBody = {
      student_id: student.value.id,
      goal: 'string',
      days_of_week: [singleForm.day_of_week_id],
      start_times: [singleForm.start_time],
      end_times: [singleForm.end_time],
      repeat_until: singleForm.repeat_until,
      reminder_minutes: singleForm.reminder_minutes,
      break_minutes: singleForm.break_minutes,
      in_rule: false,
    } */

    const isValid = Object.values(singleForm).every(
      (value) => value !== undefined && value !== null,
    )

    if (isValid) {
      setOneTimeLesson(singleForm).then(() => {
        console.log('Выполнили запрос')
      })
    } else {
      alert('Заполните все поля формы')
    }
  } else {
    alert('Выберите ученика !')
  }
}

const setStudent = (selectedStudent) => {
  student.value = selectedStudent
}

/* ============================================================ Хуки ============================================================*/

onMounted(() => {
  getMyStudents().then((students) => {
    options.value.student = students
  })
})
</script>
