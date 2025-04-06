<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-mass-addition">
        <h2 class="modal-title">Массовое добавление учеников</h2>
        <p class="modal-subtitle mt-2">Скачайте и загрузите отредактированный шаблон</p>
        <v-files-handler :showDropArea="true" />
      </div>
    </template>
  </v-custom-modal>
</template>
<script setup>
import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vFilesHandler from '@/components/generalComponents/v-files-handler.vue'
</script>
