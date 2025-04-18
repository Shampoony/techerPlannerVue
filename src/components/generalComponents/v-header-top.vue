<template>
  <header class="v-header-top">
    <div class="v-header-top__container container">
      <nav class="v-header-top__nav">
        <h2 class="v-header-top__nav-title">Teacher Planner</h2>

        <!-- @click="toggleModal('burgerModal')" -->
        <div class="buttons-mob">
          <v-user-drop />
          <div class="flex gap-2">
            <img src="/src/assets/images/left-menu/notification.svg" alt="" />
            <p class="notifications">10</p>
          </div>
        </div>

        <div class="v-header-top__login">
          <div class="switcher custom-switcher">
            <input type="checkbox" @change="switchMode" :checked="isNightMode" />
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
import { onMounted, ref, computed } from 'vue'

import vUserDrop from './v-user-drop.vue'
import vBurgerModal from '../modals/v-burger-modal.vue'
import { useGeneralStore } from '@/stores/generalStore'

const store = useGeneralStore()

const modals = ref({
  burgerModal: false,
})

const isNightMode = computed(() => {
  return store.nightMode
})

const toggleModal = (modalId) => {
  console.log(modalId)
  modals.value[modalId] = !modals.value[modalId]
  console.log(modals.value[modalId], modalId)
}

const switchMode = () => {
  document.body.classList.toggle('night__mode')
  store.setNightMode(document.body.classList.contains('night__mode'))
}

onMounted(() => {
  isNightMode.value
    ? document.body.classList.add('night__mode')
    : document.body.classList.remove('night__mode')
})
</script>
