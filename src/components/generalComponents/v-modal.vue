<template>
  <div
    class="modal-overlay"
    @click="close"
    :class="{ unActive: isSecondOrMoreModal && index == store.modals_count }"
  >
    <div class="modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, computed } from 'vue'
import { useModalsStore } from '@/stores/modalsStore'

const store = useModalsStore()

const index = store.modals_count

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

// Вычисляем, является ли эта модалка второй или последующей
const isSecondOrMoreModal = computed(() => store.modals_count > 1)

const close = () => {
  emit('close', props.id)
  store.decrement()
}

onMounted(() => {
  store.increment()
  console.log(store.modals_count)
})
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
  transition: opacity 0.3s ease;
}

.modal-overlay.unActive {
  background: transparent;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
