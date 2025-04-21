<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-income-modal">
        <h1 class="modal-title">Добавление дохода</h1>
        <div class="v-income-modal__fields">
          <div class="modal-field col" v-if="!notLink">
            <p class="modal-subtitle">Выбор ученика</p>
            <v-styled-select :items="['Елизавета']" :student-icon="true" />
          </div>
          <div class="modal-field row">
            <div class="styled-checkbox">
              <input type="checkbox" id="not-link" v-model="notLink" />
              <label for="not-link"></label>
            </div>
            <label class="modal-subtitle" for="not-link">Не привязывать доход к ученику</label>
          </div>

          <div class="modal-field col">
            <label class="modal-subtitle" for="sum">Внесенная сумма (₽)</label>
            <input class="custom-input" type="number" id="sum" placeholder="Сумма" />
          </div>
        </div>
      </div>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref } from 'vue'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vStyledSelect from '@/components/generalComponents/v-styled-select.vue'

const notLink = ref()
</script>
