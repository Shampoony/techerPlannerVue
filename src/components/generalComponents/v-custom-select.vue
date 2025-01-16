<template>
  <div class="v-custom-select">
    <div class="v-custom-select__block" @click="isMenuOpen = !isMenuOpen">
      <input type="text" v-model="selected" readonly />
      <div v-if="!isMenuOpen">
        <img src="../../assets/images/arrow-down-night.svg" class="night-el" alt="" />
        <img src="../../assets/images/arrow-down.svg" class="day-el" alt="" />
      </div>
      <div v-else>
        <img src="../../assets/images/arrow-up-night.svg" class="night-el" alt="" />
        <img src="../../assets/images/arrow-up.svg" class="day-el" alt="" />
      </div>
    </div>
    <ul class="v-custom-select__list" v-if="isMenuOpen">
      <li
        class="v-custom-select__list-item"
        v-for="option in props.options.options"
        :key="option.id"
        @click="setOption(option)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  options: Object,
})

const isMenuOpen = ref(false)

const setOption = (option) => (selected.value = option.text)
console.log(props.options.options)
const selected = ref(props.options.default)
</script>
