<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-themes-modal">
        <div class="modal-title">Темы</div>

        <ul class="v-themes-modal__list">
          <li class="v-themes-modal__list-item theme" v-for="theme in themes" :key="theme.id">
            <div class="theme__title">
              {{ theme.theme }}
            </div>
            <div class="theme__close" @click="() => deleteTheme(theme.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="#1D4ECC"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </li>
        </ul>
        <v-add-field @submit="submitTheme" />
      </div>
    </template>
  </v-custom-modal>
</template>

<script setup>
import { ref } from 'vue'

import vAddField from '../generalComponents/v-add-field.vue'
import vCustomModal from '../generalComponents/v-custom-modal.vue'

const themes = ref([{ id: 1, theme: 'Тема 1' }])

const submitTheme = (newTheme) => {
  themes.value.push({ id: themes.value.length + 1, theme: newTheme })
}

const deleteTheme = (themeId) => {
  themes.value = themes.value.filter((theme) => theme.id !== themeId)
}
</script>
