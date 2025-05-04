<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-change-password">
        <h2 class="modal-title">Смена пароля</h2>

        <form @submit.prevent>
          <div class="modal-field col">
            <label for="newPassword" class="modal-field__subtitle">Новый пароль</label>
            <input
              placeholder="Придумайте пароль"
              id="newPassword"
              v-model="newPassword"
              type="text"
              class="custom-input"
            />

            <div v-if="firstPasswordError" class="text-red">{{ firstPasswordError }}</div>
          </div>

          <div class="modal-field col password-field">
            <label for="newPassword2" class="modal-field__subtitle">Повторите новый пароль</label>
            <input
              placeholder="Введите новый пароль повторно"
              v-model="newPassword2"
              id="newPassword2"
              type="text"
              class="custom-input"
            />

            <div v-if="passwordMatchError" class="text-red">{{ passwordMatchError }}</div>
          </div>
        </form>
      </div>
    </template>

    <template #button>
      <button class="custom-btn blue" :class="{unactive: firstPasswordError || passwordMatchError}" @click="handleSave">
        Сохранить
      </button>
    </template>
  </v-custom-modal>
</template>
<script setup>
import { ref, computed } from 'vue'
import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'

const newPassword = ref('')
const newPassword2 = ref('')
const wasSubmitted = ref(false)

// Список всех ошибок
const passwordErrors = computed(() => {
  const errors = []
  const password = newPassword.value

  if (password.length < 8) {
    errors.push('Пароль должен содержать не менее 8 символов')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Должна быть хотя бы одна заглавная латинская буква')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Должна быть хотя бы одна строчная латинская буква')
  }
  if (!/^[A-Za-z0-9~!?@#$%^&*_\-+()\[\]{}><\/\\|"'.,:]*$/.test(password)) {
    errors.push('Допустимы только латинские буквы, арабские цифры и специальные символы')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Должна быть хотя бы одна цифра')
  }
  if (/\s/.test(password)) {
    errors.push('Пробелы недопустимы')
  }
  console.log('Проверяем пароль')
  return errors
})

// Только первая ошибка
const firstPasswordError = computed(() =>  passwordErrors.value[0])

// Проверка совпадения паролей
const passwordMatchError = computed(() =>
 newPassword.value !== newPassword2.value
    ? 'Пароли не совпадают'
    : null
)

// Обработка клика на кнопку "Сохранить"
const handleSave = () => {
  wasSubmitted.value = true

  if (!passwordErrors.value.length && !passwordMatchError.value) {
    // здесь логика отправки формы
    console.log('Пароль успешно сохранён')
  }
}
</script>
