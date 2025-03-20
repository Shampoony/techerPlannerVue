<template>
  <div
    class="v-styled-select"
    ref="selectContainer"
    v-click-outside="() => (isDropdownMenu = false)"
  >
    <div
      class="v-styled-select__field"
      :class="{ readonly: isReadonly }"
      @click="toggleDropdownMenu"
    >
      <input class="v-styled-select__value" type="text" v-model="value" readonly />
      <div class="v-styled-select__image" :class="imageClass" v-if="!isReadonly">
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="#717680"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <transition name="fade">
      <ul
        class="v-styled-select__list"
        v-show="isDropdownMenu"
        ref="listRef"
        :style="dropdownStyle"
      >
        <li
          class="v-styled-select__list-item"
          v-for="(item, index) in items"
          :key="index"
          @click="() => selectValue(item)"
        >
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [0, 1, 2, 3, 4, 5],
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
})

const value = ref(props.items[0])
const isDropdownMenu = ref(false)
const selectContainer = ref(null)
const listRef = ref(null)
const shouldOpenUp = ref(false)

// Определяем стили для списка (открытие вверх или вниз)
const dropdownStyle = computed(() => ({
  top: shouldOpenUp.value ? 'auto' : '100%',
  bottom: shouldOpenUp.value ? '100%' : 'auto',
}))

// Логика вращения стрелки
const imageClass = computed(() => ({
  openUp: shouldOpenUp.value,
  open: isDropdownMenu.value,
}))

// Открываем/закрываем выпадающий список
const toggleDropdownMenu = async () => {
  if (props.isReadonly) return
  isDropdownMenu.value = !isDropdownMenu.value

  if (isDropdownMenu.value) {
    await nextTick()
    updateDropdownPosition()
  }
}

// Выбираем значение
const selectValue = (val) => {
  value.value = val
  isDropdownMenu.value = false
}

// Проверяем, куда лучше открывать список
const updateDropdownPosition = () => {
  if (selectContainer.value && listRef.value) {
    const rect = selectContainer.value.getBoundingClientRect()
    const listHeight = listRef.value.offsetHeight
    const spaceBelow = window.innerHeight - rect.bottom
    shouldOpenUp.value = listHeight > spaceBelow
  }
}

// Навешиваем обработчики событий
onMounted(() => {
  window.addEventListener('resize', updateDropdownPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownPosition)
})
</script>
