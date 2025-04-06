<template>
  <div class="v-styled-select" ref="selectContainer" v-click-outside="closeDropdown">
    <div
      class="v-styled-select__field"
      :class="{ readonly: isReadonly }"
      @click="toggleDropdownMenu"
    >
      <div class="v-styled-select__value">
        <div v-if="isSvgValue" class="v-styled-select__icon" v-html="value.svg"></div>
        <input class="" type="text" :value="inputValue" readonly />
      </div>
      <div class="v-styled-select__image" :class="imageClass" v-show="!isReadonly">
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
          <span v-if="typeof item === 'string' || typeof item === 'number'">
            {{ item }}
          </span>
          <span v-else v-html="item.svg"></span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: false,
    default: () => [0, 1, 2, 3, 4, 5],
  },
  value: {
    type: [Number, String],
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
  defaultValue: {
    type: [String, Number, Object],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed(() => {
  if (props.isReadonly && props.value) {
    return props.value
  } else {
    return isSvgValue.value ? '' : value.value.text
  }
})
// Функция для нормализации значения
const normalizeValue = (val) => {
  if (val === null || val === undefined) {
    return typeof props.items[0] === 'object' ? props.items[0] : { text: props.items[0] }
  }
  return typeof val === 'object' ? val : { text: val }
}

const value = ref(normalizeValue(props.defaultValue))

const isDropdownMenu = ref(false)
const selectContainer = ref(null)
const listRef = ref(null)
const shouldOpenUp = ref(false)

// Определяем, содержит ли текущее значение SVG
const isSvgValue = computed(() => typeof value.value === 'object' && value.value.svg)

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

const closeDropdown = () => {
  isDropdownMenu.value = false
}

// Выбираем значение
const selectValue = (val) => {
  const newValue = typeof val === 'object' ? val : { text: val }
  value.value = newValue
  emit('update:modelValue', newValue)
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

// Следим за изменениями defaultValue
watch(
  () => props.defaultValue,
  (newVal) => {
    value.value = normalizeValue(newVal)
  },
)
</script>
