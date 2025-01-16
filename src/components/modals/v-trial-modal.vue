<template>
  <v-modal :id="'lol'">
    <div class="v-trial-modal modal-add">
      <div class="modal-title">Добавление пробного занятия</div>
      <input class="styled-input" type="text" name="" id="" placeholder="Введите имя ученика" />
      <v-form-calendar-info />
    </div>
  </v-modal>
</template>
<script setup>
import vModal from '../generalComponents/v-modal.vue'
import vFormCalendarInfo from '../generalComponents/v-form-calendar-info.vue'
</script>
