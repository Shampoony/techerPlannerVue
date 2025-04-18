<template>
  <div class="v-login">
    <div class="v-login__container container">
      <h1 class="v-login__title text-title">TeacherPlanner</h1>
      <p class="v-login__subtitle">
        Войдите в систему или зарегистрируйтесь, если у вас еще нет аккаунта.
      </p>
      <div class="v-login__column">
        <a href="" class="v-login__button">
          <img src="/src/assets/images/google-icon.svg" alt="" />
          Продолжить с Google
        </a>
        <a href="" class="v-login__button">
          <img src="/src/assets/images/yandex-icon.svg" alt="" />
          Продолжить с Яндекс
        </a>
      </div>

      <form action="" class="v-login__form" method="POST" @submit.prevent="submitForm">
        <div class="v-login__form-field">
          <label class="v-login-form-field-subtitle" for="email"></label>
          <input
            v-model="form.email"
            type="email"
            class="custom-input"
            id="email"
            placeholder="Введите адрес электронной почты"
          />
        </div>
        <button type="submit" class="custom-btn" :class="{ white: !isValid, blue: isValid }">
          Продолжить
        </button>
        <div class="v-login__form-checkboxes">
          <div class="v-login__form-checkbox">
            <div class="styled-checkbox">
              <input type="checkbox" id="age-accept" v-model="form.ageAccept" />
              <label for="age-accept"></label>
            </div>
            <label for="age-accept"
              >Я подтверждаю, что мне исполнилось 18 лет или у меня есть разрешение родителя/опекуна
              на использование платформы</label
            >
          </div>
          <div class="v-login__form-checkbox">
            <div class="styled-checkbox">
              <input type="checkbox" id="ads-accept" v-model="form.adsAccept" />
              <label for="ads-accept"></label>
            </div>
            <label for="ads-accept">Я согласен на получение рекламных рассылок</label>
          </div>
        </div>
      </form>

      <div class="v-login__warning">
        Продолжая, вы соглашаетесь с <a class="contact-link" href=""> Условиями использования</a> и
        <a class="contact-link" href=""> Политикой конфиденциальности.</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const form = ref({
  email: '',
  ageAccept: false,
  adsAccept: false,
})

const isValid = computed(() => {
  return form.value.email && form.value.ageAccept
})

const submitForm = () => {
  if (isValid.value) {
    /* Логика */
  }
  return
}
</script>
