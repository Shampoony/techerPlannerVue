<template>
  <v-custom-modal @submit="submitForm">
    <template #modal>
      <div class="v-additionaly-task-modal">
        <h2 class="modal-title">Дополнительное задание</h2>
        <v-custom-textarea :placeholder="'Введите домашнее задание'" v-model="formData.homework" />
        <v-files-handler :show-drop-area="true" v-model="formData.files" />

        <div class="v-additionaly-task-modal__row modal-field">
          <div class="v-additionaly-task-modal__block">
            <p class="modal-field__title">Дедлайн</p>
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
          <div class="v-additionaly-task-modal__block">
            <div class="styled-checkbox">
              <input
                type="checkbox"
                v-model="formData.to_next"
                id="next"
                :checked="formData.exams"
              />
              <label for="next"></label>
            </div>
            <label for="next" class="modal-field__title">До следующего занятия</label>
          </div>
        </div>
      </div>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vFilesHandler from '@/components/generalComponents/v-files-handler.vue'
import vCustomTextarea from '@/components/generalComponents/v-custom-textarea.vue'

import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

const formData = ref({
  homework: '',
  files: [],
  date: '',
  to_next: false,
})

const submitForm = () => {
  console.log(formData.value.files)
}

onMounted(() => {
  formData.value.date = new Date().toISOString().split('T')[0]
})
</script>
