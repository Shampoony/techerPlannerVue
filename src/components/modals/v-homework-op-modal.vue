<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-homework-op-modal">
        <h2 class="modal-title">
          Если ученик выполнил задание, заданное вне платформы, вы можете добавить оценку
        </h2>

        <div class="v-homework-op-modal__row">
          <div class="v-homework-op-modal__block">
            <p class="modal-subtitle">Оценка</p>
            <v-styled-select :items="[5, 4, 3, 2]" />
          </div>
          <div class="v-homework-op-modal__block">
            <div class="styled-checkbox">
              <input type="checkbox" id="gov-exam" />
              <label for="gov-exam"></label>
            </div>
            <label class="modal-subtitle" for="gov-exam">ОГЭ/ЕГЭ</label>
          </div>
        </div>
      </div>
    </template>
  </v-custom-modal>
</template>
<script setup>
import vCustomModal from '../generalComponents/v-custom-modal.vue'
import vStyledSelect from '../generalComponents/v-styled-select.vue'
</script>
