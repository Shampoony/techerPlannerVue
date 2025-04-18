<template>
  <v-custom-modal ref="customModal">
    dsds
    <template #modal>
      <div class="v-archive-modal">
        <h1 class="modal-title" v-html="formattedText"></h1>
        <div class="caption">Вы сможете восстановить ученика из архива.</div>
        <div class="v-archive-modal__rule">
          <div class="flex gap-3">
            <div class="styled-checkbox">
              <input v-model="deleteInfo" type="checkbox" :id="'delete-info'" />
              <label :for="'delete-info'"></label>
            </div>
            <label for="delete">Архивировать информацию о всех учениках выбранной группы</label>
          </div>
        </div>
      </div>
    </template>
    <template #button>
      <button class="custom-btn blue" @click="submitForm">Архивировать</button>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref, computed, watch } from 'vue'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'

import { useSelectedStudentsStore } from '@/stores/selectedStudentsStore'

const props = defineProps({
  group: Object,
  student: Number,
  type: String,
  student_amount: Number,
  group_amount: Number,
})

const deleteInfo = ref(false)

const store = useSelectedStudentsStore()

const customModal = ref(null)

const defaultPhrase = ref('Вы уверены, что хотите архивировать')

watch(
  () => [props.student_amount, props.group_amount, props.type, props.student],
  () => {
    console.log(
      'Props changed:',
      props.type,
      props.student_amount,
      props.group_amount,
      props.student,
    )
  },
  { immediate: true },
)

const formattedText = computed(() => {
  let additionalyPhrase = ''
  if (store.student.length === 1 && props.type === 'students') {
    additionalyPhrase += `<p> ученика (${store.student[0].name})?</p>`
  }
  if (store.student.length > 1 && props.type === 'students') {
    additionalyPhrase += `выбранных  <p> учеников (${store.student.length})?</p>`
  }
  if (props.type === 'groups' && store.student.length === 1) {
    additionalyPhrase += `<p> группу (${store.student[0].name})?</p>`
  }
  if (props.type === 'groups' && store.student.length > 1) {
    additionalyPhrase += `<p> группы (${store.student.length})?</p>`
  }

  return defaultPhrase.value + ' ' + additionalyPhrase
})

const submitForm = () => {
  console.log(props.type)
}
</script>
