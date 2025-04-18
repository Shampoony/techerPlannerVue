<template>
  <v-custom-modal>
    <div class="v-homework-op-modal">
      <h2 class="modal-title">
        Если ученик выполнил задание, заданное вне платформы, вы можете добавить оценку
      </h2>

      <div class="v-homework-op-modal__row">
        <div class="v-homework-op-modal__block">
          <p class="modal-subtitle">Оценка</p>
          <v-styled-select :items="[5, 4, 3, 2]" />
        </div>
      </div>
    </div>
  </v-custom-modal>
</template>
<script setup>
import vCustomModal from '../generalComponents/v-custom-modal.vue'
import vStyledSelect from '../generalComponents/v-styled-select.vue'
</script>
