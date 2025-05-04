<template>
  <div class="v-student-details">
    <div class="v-student-details__info">
      <h2 class="v-student-details__title text-title">Детали об ученике</h2>
      <div class="v-student-details__form">
        <div class="v-student-details__info-column">
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Имя ученика</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.student_name"
              @input="checkChanges"
              placeholder="Имя ученика"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Номер телефона</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.phone_number"
              @input="checkChanges"
              placeholder="Номер телефона"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Имя родителя</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.parent_name"
              @input="checkChanges"
              placeholder="Имя родителя"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Номер родителей</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.parent_phone_number"
              @input="checkChanges"
              placeholder="Номер родителей"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Источник</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.source"
              @input="checkChanges"
              placeholder="Источник"
            />
          </div>
        </div>
        <div class="v-student-details__info-column">
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Цель занятий</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.goal"
              @input="checkChanges"
              placeholder="Цель занятий"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Способ связи</p>
            <div class="v-student-details__info-type-connect">
              <input
                type="text"
                class="custom-input"
                v-model="editedStudent.communicationMethod"
                @input="checkChanges"
                placeholder="Способ связи"
              />
              <v-styled-select :items="typeConnectItems" />
            </div>
            <p>Контакты ученика указываются с его согласия и видны исключительно преподавателю.</p>
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Ставка</p>
            <div class="v-student-details__info-row">
              <input
                type="text"
                class="custom-input"
                v-model="editedStudent.rate"
                @input="checkChanges"
                placeholder="Ставка"
              />
              <v-styled-select
                :items="rateItems"
                :default-value="timeRate"
                @update:modelValue="(value) => checkChanges(value, 'time_rate')"
              />
              <v-styled-select
                :items="currencyItems"
                :default-value="editedStudent.currency"
                @update:modelValue="(value) => checkChanges(value, 'currency')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="v-student-details__info-field">
        <p class="v-student-details__info-subtitle">Комментарий</p>
        <textarea
          class="v-student-details__info-text"
          v-model="editedStudent.comment"
          @input="checkChanges"
          placeholder="Комментарий о ученике (виден только вам)"
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button class="custom-btn blue" :class="{ unactive: !hasChanges }">
          Сохранить изменения
        </button>
      </div>
    </div>
    <div class="v-student-details__side">
      <div class="v-student-details__side-block">
        <h2 class="v-student-details__title text-title">Средств на счёте</h2>
        <input type="text" value="6 000 ₽" class="custom-input red" readonly />
        <p class="caption">При ставке 2 000 ₽ хватит на 3 занятия</p>
      </div>
      <div class="v-student-details__side-block">
        <h2 class="v-student-details__title text-title">Реферальная ссылка</h2>
        <input type="text" :value="link" class="custom-input" readonly @click="copyLink"/>
        <p class="caption">
          Ученику необходимо зарегистрироваться по вашей ссылке для синхронизации аккаунтов
        </p>
        <transition name="fade">
          <div class="copy-window" v-show="copyWindowOpen">
            Ссылка скопирована в буфер обмена
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStudentsStore } from '@/stores/studentsStore'
import VStyledSelect from '@/components/generalComponents/v-styled-select.vue'

const store = useStudentsStore()

const link = ref('https://www.primeradress.ru')

const copyWindowOpen = ref(false)

const rateItems = store.rate
const currencyItems = store.currency
const typeConnectItems = store.typeConnect

const props = defineProps({
  student: Object,
})

const timeRate = computed(() => {
  if (editedStudent.value && editedStudent.value.time_rate) {
    return editedStudent.value.time_rate
  }
  return ''
})

const currentStudent = ref({ ...props.student, comment: '' })

const editedStudent = ref({ ...props.student, comment: '' })

const hasChanges = computed(() => {
  if (currentStudent.value) {
    return Object.keys(currentStudent.value).some(
      (key) => currentStudent.value[key] !== editedStudent.value[key],
    )
  }
  return false
})
const checkChanges = (value, key) => {
  editedStudent.value[key] = typeof value === 'object' ? value.text : value
}

const copyLink = () => {
  navigator.clipboard.writeText(link.value).then(() => {
    copyWindowOpen.value = true

    setTimeout(() => {
      copyWindowOpen.value = false
    }, 3000)
  })
}

onMounted(() => {})
</script>
