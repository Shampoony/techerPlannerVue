<template>
  <v-custom-modal>
    <div class="v-add-result-modal">
      <h2 class="modal-title">Добавление результата</h2>
      <form action="" class="modal-form">
        <div class="modal-field col">
          <p class="modal-field__title">Ученик</p>
          <input type="text" class="custom-input student-input" value="Алексей" readonly />
        </div>
        <div class="modal-field col">
          <p class="modal-field__title">Тип работы</p>
          <input
            type="text"
            class="custom-input"
            placeholder="Тип работы"
            v-model="formData.work_type"
          />
        </div>
        <div class="modal-field flex gap-5 items-center">
          <p class="modal-field__title">Дата</p>
          <VueDatePicker
            class="custom-datepicker"
            v-model="formData.date"
            :locale="'ru-ru'"
            :auto-apply="true"
            :format="formatDate"
          >
            <template #clear-icon="{ clear }"> </template>
          </VueDatePicker>
        </div>
        <div class="modal-field col">
          <p class="modal-field__title">Комментарий</p>
          <v-custom-textarea v-model="formData.comment" placeholder="Ваш комментарий к работе" />
        </div>
        <div class="modal-field flex gap-3 items-center">
          <div class="styled-checkbox">
            <input type="checkbox" v-model="formData.exams" id="exams" :checked="formData.exams" />
            <label for="exams"></label>
          </div>
          <label for="exams" class="modal-field__title">ОГЭ/ЕГЭ</label>
        </div>
        <div class="modal-field row" v-show="formData.exams">
          <div class="v-add-result-modal__col">
            <p class="modal-field__title">Часть 1</p>
            <input type="number" class="custom-input" placeholder="100" />
          </div>
          <div class="v-add-result-modal__col">
            <p class="modal-field__title">Часть 2</p>
            <input type="number" class="custom-input" placeholder="100" />
          </div>
        </div>
      </form>
    </div>
  </v-custom-modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatDate } from '@/utils'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vCustomTextarea from '@/components/generalComponents/v-custom-textarea.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

const formData = ref({
  comment: '',
  work_type: '',
  date: '',
  exams: true,
})

onMounted(() => {
  formData.value.date = new Date().toISOString().split('T')[0]
})
</script>
