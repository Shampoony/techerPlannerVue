<template>
  <header class="v-header-top">
    <div class="v-header-top__container container">
      <nav class="v-header-top__nav">
        <h2 class="v-header-top__nav-title">Teacher Planner</h2>

        <!-- @click="toggleModal('burgerModal')" -->
        <div class="burger menu-opener">
          <span></span>
        </div>

        <div class="v-header-top__login">
          <div class="switcher">
            <input @change="switchMode" :checked="isNightMode" type="checkbox" />
          </div>
          <v-user-drop />
        </div>
      </nav>
    </div>
  </header>
  <transition name="fade">
    <v-burger-modal
      :class="{ 'show-modal': modals['burgerModal'] }"
      :id="'burgerModal'"
      v-if="modals.burgerModal"
      @close="() => toggleModal('burgerModal')"
    />
  </transition>
</template>
<script setup>
import { onMounted, ref } from 'vue'

import vUserDrop from './v-user-drop.vue'
import vBurgerModal from '../modals/v-burger-modal.vue'

const modals = ref({
  burgerModal: false,
})

const isNightMode = ref(localStorage.getItem('nightMode') == 'true')

const toggleModal = (modalId) => {
  console.log(modalId)
  modals.value[modalId] = !modals.value[modalId]
  console.log(modals.value[modalId], modalId)
}

const switchMode = () => {
  document.body.classList.toggle('night__mode')
  localStorage.setItem('nightMode', document.body.classList.contains('night__mode'))
  isNightMode.value = !isNightMode.value
}

onMounted(() => {
  isNightMode.value
    ? document.body.classList.add('night__mode')
    : document.body.classList.remove('night__mode')
})
</script>
