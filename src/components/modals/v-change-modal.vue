<template>
  <v-modal>
    <div class="modal-add">
      <div class="modal-title">Редактирование занятия</div>

      <input type="text" class="styled-input" :value="lesson.student_name" readonly />
      <transition name="fade">
        <div v-if="ruleData">
          <v-stable-form :rule-data="ruleData" @form-submited="formSubmitted" />
        </div>
      </transition>
    </div>
  </v-modal>
</template>

<script setup>
import vModal from '../generalComponents/v-modal.vue'
import vStableForm from '../generalComponents/v-stable-form.vue'

import { defineProps, onMounted, ref } from 'vue'

import { editRule, getRule } from '@/api/requests'
import { sortObject, updatedStableOrder } from '@/utils'

const ruleData = ref()

const props = defineProps({
  lesson: {
    type: Object,
    require: true,
  },
})

const formSubmitted = (requestBody) => {
  requestBody['student_id'] = props.lesson.student_id
  requestBody['lesson_id'] = props.lesson.id || props.lesson.lesson_id
  editRule(sortObject(requestBody, updatedStableOrder)).then(() => {
    console.log('Выполнили запрос')
  })
}

onMounted(() => {
  getRule(props.lesson.student_id).then((data) => {
    ruleData.value = data
  })
  console.log('Выбранный урок - ', props.lesson)
})
</script>
