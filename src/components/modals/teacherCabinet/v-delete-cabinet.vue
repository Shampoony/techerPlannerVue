<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-delete-cabinet">
        <h2 class="modal-title">
          Вы уверены, что хотите удалить аккаунт?
        </h2>
        <p class="modal-subtitle">
          Информация будет удалена безвозратно.
        </p>
      </div>
    </template>
    <template #button>
      <button class="custom-btn red">
        Удалить
      </button>
    </template>
  </v-custom-modal>
</template>
<script setup>
import vCustomModal from '@/components/generalComponents/v-custom-modal.vue';
</script>
