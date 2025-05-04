<template>
  <div class="v-profile-info styled-section">
    <h2 class="v-profile-info__title">
      Информация о профиле
    </h2>
    <div class="v-profile-info__column">
      <label class="v-profile-info__subtitle">
        ФИО
      </label>
      <input class="custom-input" type="text" placeholder="Как к вам обращаются ученики" v-model="profileData.name">
    </div>
    <div class="v-profile-info__column">
      <label class="v-profile-info__subtitle">
        Предмет
      </label>
      <v-styled-select :items="['Математика', 'Русский Язык']" :default-value="currentData.subject" v-model="profileData.subject"/>
    </div>
    <div class="v-profile-info__column">
      <label class="v-profile-info__subtitle">
        Номер телефона для связи
      </label>
      <input class="custom-input" type="number" placeholder="Номер телефона" v-model="profileData.number">
    </div>
    <div class="v-profile-info__button">
      <button class="custom-btn blue" :class="{ unactive: !hasChanges }">
            Сохранить изменения
      </button>
    </div>

  </div>
</template>
<script setup>
import { ref, computed } from 'vue';

import vStyledSelect from '../generalComponents/v-styled-select.vue';


const currentData = ref({
  name: 'Иван Иванович',
  subject: 'Математика',
  number: ''

})

const profileData = ref({...currentData.value})


const hasChanges = computed(()=>{
  if (currentData.value) {
    console.log(currentData.value, profileData.value)
    return Object.keys(currentData.value).some(
      (key) => currentData.value[key] !== profileData.value[key],
    )
  }
  return false
})

</script>
