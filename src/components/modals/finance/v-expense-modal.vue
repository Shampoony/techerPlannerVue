<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-expense-modal">
        <h1 class="modal-title">Добавление расхода</h1>
        <div class="modal-field col">
          <label class="modal-subtitle" for="sum">Сумма</label>
          <div class="v-expense-modal__field">
            <input type="number" id="sum" class="custom-input" placeholder="Сумма" />
            <v-styled-select :items="currencyItems" />
          </div>
        </div>
        <div class="modal-field col">
          <label class="modal-subtitle" for="purpose">Назначение</label>
          <input class="custom-input" id="purpose" type="text" placeholder="Назначение" />
        </div>
      </div>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStudentsStore } from '@/stores/studentsStore'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vStyledSelect from '@/components/generalComponents/v-styled-select.vue'

const store = useStudentsStore()

const currencyItems = computed(() => {
  return store.currency
})
</script>
