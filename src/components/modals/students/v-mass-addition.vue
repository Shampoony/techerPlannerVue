<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-mass-addition">
        <h2 class="modal-title">Массовое добавление учеников</h2>
        <p class="modal-subtitle mt-2 text-center">Скачайте и загрузите отредактированный шаблон</p>
        <v-files-handler :showDropArea="true" v-model="files"/>
      </div>
    </template>
    <template #button>
      <button class="custom-btn blue" :class="{unactive: !files.length}">
        Сохранить
      </button>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref } from 'vue'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vFilesHandler from '@/components/generalComponents/v-files-handler.vue'

const files = ref([])
</script>
