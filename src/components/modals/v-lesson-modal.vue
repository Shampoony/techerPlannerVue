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
      <v-custom-select :options="options.student" />
      <div class="single" v-if="activeAdd == 'single'">
        <v-form-calendar-info />
      </div>
      <div class="stable" v-if="activeAdd == 'stable'">
        <v-form-calendar-info :removeDate="true" />
      </div>
    </div>
  </v-modal>
</template>

<script setup>
import vModal from '../generalComponents/v-modal.vue'
import vCustomSelect from '../generalComponents/v-custom-select.vue'
import vFormCalendarInfo from '../generalComponents/v-form-calendar-info.vue'

import { ref } from 'vue'

const activeAdd = ref('single')

const setActiveAdd = (name) => {
  activeAdd.value = name
}

const options = ref({
  student: {
    default: 'Ученик',
    options: [{ id: 1, text: 'Артур' }],
  },
})
</script>
