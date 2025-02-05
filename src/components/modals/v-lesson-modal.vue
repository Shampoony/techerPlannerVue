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
import { getMyStudents, setOneTimeLesson, setStableLesson } from '@/api/requests'
import router from '@/router'

const activeAdd = ref('single')
const student = ref()

const setActiveAdd = (name) => {
  activeAdd.value = name
}

const submitStableForm = (stableForm) => {
  stableForm['student_id'] = student.value.student_id
  const isFormWrong = Object.values(stableForm).some((value) => !value)
  if (!isFormWrong) {
    setStableLesson(stableForm).then(() => {
      console.log('Запрос произведён')
      router.go(0)
    })
  } else {
    alert('Заполните все поля формы')
  }
}

const submitSingleForm = (singleForm) => {
  singleForm['cost_lesson'] = 0

  if (student.value) {
    const requestBody = {
      lesson_data: singleForm,
      student_data: { student_name: student.value.student_name },
    }
    const isValid = Object.values(requestBody).every(
      (value) => value !== undefined && value !== null,
    )
    console.log('сабмит')

    if (isValid) {
      setOneTimeLesson(requestBody).then(() => {
        router.go(0)
      })
    } else {
      alert('Заполните все поля формы')
    }
  } else {
    alert('Выберите ученика !')
  }
}

const options = ref({
  student: {
    default: 'Ученик',
    options: [{ id: 1, text: 'Артур' }],
  },
})

const setStudent = (selectedStudent) => {
  console.log(student)
  student.value = selectedStudent
}

onMounted(() => {
  getMyStudents().then((students) => {
    options.value.student = students
  })
})
</script>
