<template>
  <v-base>
    <section class="v-students">
      <div class="v-students__container container">
        <div class="v-students__header">
          <h1 class="v-students__title">Ученики</h1>
          <div class="flex gap-3">
            <button class="v-students__header-button">
              <img src="/src/assets/images/upload-cloud.svg" alt="" />
              <span> Массовове добавление учеников </span>
            </button>
            <button class="v-students__header-button">
              <img src="/src/assets/images/plus-icon.svg" alt="" />
              <span> Ученик </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </v-base>
</template>
<script setup>
import vBase from '../v-base.vue'
import { ref } from 'vue'
</script>
