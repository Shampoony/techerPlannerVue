<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: null,
  },
  id: {
    type: String,
  },
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close', props.id)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1030;
  /* opacity: 0; */
  transition: opacity 0.3s ease;
}

.modal-overlay:has(.top) {
  align-items: start;
}
.modal-content {
  border-radius: 8px;
  padding: 20px;
}

.modal-content > * {
  padding: 25px;
}

/* Переходы для плавного появления */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active в Vue 2 */ {
  opacity: 0;
}
</style>
