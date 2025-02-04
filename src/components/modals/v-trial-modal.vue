<template>
  <v-modal :id="'lol'">
    <div class="v-trial-modal modal-add">
      <div class="modal-title">Добавление пробного занятия</div>
      <input class="styled-input" type="text" name="" id="" placeholder="Введите имя ученика" />
      <div class="modal-row">
        <input id="pay" type="checkbox" class="custom-checkbox-input" />
        <label for="pay" class="custom-checkbox-label">
          <span class="custom-checkbox"></span>
          <div class="v-calendar-menu__checkbox-subtitle">Платное занятие</div>
        </label>
        <div class="modal-row__block">
          <input class="styled-input" type="text" placeholder="1500" />
        </div>
      </div>
      <v-form-calendar-info />
    </div>
  </v-modal>
</template>
<script setup>
import vModal from '../generalComponents/v-modal.vue'
import vFormCalendarInfo from '../generalComponents/v-form-calendar-info.vue'
</script>
<style scoped>
.custom-checkbox {
  background-color: var(--grey) !important;
}
</style>
