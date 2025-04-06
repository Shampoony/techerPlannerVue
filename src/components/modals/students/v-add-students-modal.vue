<template>
  <v-custom-modal @submit="submitForm">
    <template #modal>
      <div class="v-add-students-modal">
        <h2 class="modal-title mb-4">Добавление ученика</h2>

        <form @submit.prevent="submitForm" class="modal-form" method="POST">
          <div class="modal-field col">
            <div class="modal-field__title">Имя ученика</div>
            <input class="custom-input" type="text" placeholder="Имя ученика" />
          </div>
          <div class="modal-field col">
            <div class="modal-field__title">Источник</div>
            <input class="custom-input" type="text" placeholder="Источник" />
          </div>
          <div class="modal-field col">
            <div class="modal-field__title">Цель занятий</div>
            <input class="custom-input" type="text" placeholder="Цель занятий" />
          </div>
          <div class="modal-field col">
            <div class="modal-field__title">Способ связи</div>
            <div class="modal-field__block connection-type">
              <input class="custom-input" type="text" placeholder="Номер телефона" />
              <v-styled-select :items="typeConnect" />
            </div>
          </div>
          <div class="modal-field col">
            <div class="modal-field__title">Ставка</div>
            <div class="modal-field__block">
              <input class="custom-input" type="text" placeholder="сумма" />
              <v-styled-select :items="rateItems" />
              <v-styled-select :items="currencyItems" />
            </div>
          </div>
          <div class="modal-field col">
            <div class="modal-field__title">Комиссия, ₽</div>
            <input class="custom-input" type="text" placeholder="10" />
          </div>
          <div class="modal-field col">
            <div class="modal-field__title">Часовой пояс</div>
            <v-styled-select :items="timeZoneItems" />
          </div>
        </form>
      </div>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref } from 'vue'
import { useStudentsStore } from '@/stores/studentsStore'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vStyledSelect from '@/components/generalComponents/v-styled-select.vue'

const store = useStudentsStore()

const typeConnect = store.typeConnect
const rateItems = store.rate
const currencyItems = store.currency
const timeZoneItems = store.timeZone

const formData = ref({
  student_name: '',
  source: '',
})

const submitForm = () => {}
</script>
