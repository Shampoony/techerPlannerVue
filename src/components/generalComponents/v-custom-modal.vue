<template>
  <div
    class="modal-overlay custom"
    @click="close"
    :class="{ unActive: isSecondOrMoreModal && index + 1 == store.modals_count }"
  >
    <div @click.stop class="modal-inner">
      <div>
        <slot name="modal"></slot>

        <div class="flex gap-3" v-show="!hideButtons">
          <slot name="cancelButton">
            <button class="custom-btn white" @click="close">Отменить</button>
          </slot>

          <slot name="button">
            <button class="custom-btn blue" @click="submitForm">Cохранить</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, computed, onUnmounted } from 'vue'
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
  hideButtons: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['close', 'submit'])

// Вычисляем, является ли эта модалка второй или последующей
const isSecondOrMoreModal = computed(() => store.modals_count > 1)

const close = () => {
  emit('close', props.id)
  store.decrement()
}

const submitForm = () => {
  emit('submit')
}

defineExpose({
  close,
  submitForm,
})

onMounted(() => {
  store.increment()
})

onUnmounted(() => {
  store.decrement()
})
</script>

<style scoped>
.modal-overlay.unActive {
  background: transparent;
}

.modal-overlay:has(.top) {
  align-items: start;
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
