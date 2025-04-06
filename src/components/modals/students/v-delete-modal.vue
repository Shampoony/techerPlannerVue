<template>
  <v-custom-modal ref="customModal">
    <template #modal>
      <div class="v-delete-modal">
        <h1 class="modal-title">
          {{ formattedText }}
        </h1>
        <div class="cpation">Информация о учениках будет удалена безвозратно.</div>
      </div>
    </template>
    <template #button>
      <button class="custom-btn red" @click="submitForm">Удалить</button>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref, computed, watch } from 'vue'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
const props = defineProps({
  group: Object,
  student: Object,
  student_amount: Number,
  group_amount: Number,
})

const customModal = ref(null)

const defaultPhrase = ref('Вы уверены, что хотите удалить')

const currentAmount = computed(() => {
  return props.student_amount || props.group_amount ? 'singular' : 'plural'
})

watch(
  () => [props.student_amount, props.group_amount, props.type],
  () => {
    console.log('Props changed:', props.type, props.student_amount, props.group_amount)
  },
  { immediate: true },
)

const formattedText = computed(() => {
  let additionalyPhrase = ''
  let hasFirstItem = false

  if (props.student && currentAmount.value === 'singular') {
    additionalyPhrase += `ученика (${props.student.name})?`
    hasFirstItem = true
  }
  if (props.student && currentAmount.value === 'plural') {
    additionalyPhrase += `выбранных учеников (${props.student_amount})?`
    hasFirstItem = true
  }
  if (props.group && currentAmount.value === 'singular') {
    if (hasFirstItem) {
      additionalyPhrase = additionalyPhrase.slice(0, -1) // Удаляем знак вопроса, если он есть
      additionalyPhrase += ` и группу (${props.group.name})?`
    } else {
      additionalyPhrase += `группу (${props.group.name})?`
      hasFirstItem = true
    }
  }
  if (props.group && currentAmount.value === 'plural') {
    if (hasFirstItem) {
      additionalyPhrase = additionalyPhrase.slice(0, -1) // Удаляем знак вопроса, если он есть
      additionalyPhrase += ` и группы (${props.group_amount})?`
    } else {
      additionalyPhrase += `группы (${props.group_amount})?`
    }
  }

  return defaultPhrase.value + ' ' + additionalyPhrase
})

const submitForm = () => {
  customModal.value.submitForm()
}
</script>
