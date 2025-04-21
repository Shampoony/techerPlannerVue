<template>
  <div class="v-styled-select" ref="selectContainer" v-click-outside="closeDropdown">
    <div
      class="v-styled-select__field"
      :class="{ readonly: isReadonly }"
      @click="toggleDropdownMenu"
    >
      <div class="v-styled-select__value">
        <img
          src="/src/assets/images/studentIcon.svg"
          alt=""
          class="mr-2"
          v-if="props.studentIcon"
        />
        <input class="" type="text" :value="displayValue" readonly v-if="!hasSvg" />
        <span v-if="hasSvg" v-html="svgContent"></span>
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
          :class="{
            selected: !isMultiselect ? isSelected(item) : false,
          }"
          @click="!isMultiselect ? selectSingle(item) : null"
        >
          <template v-if="isMultiselect">
            <label class="checkbox-label" :for="'item-' + (item.id || index)">
              <div class="styled-checkbox">
                <input
                  type="checkbox"
                  :id="'item-' + (item.id || index)"
                  :checked="isSelected(item)"
                  @change="() => toggleItem(item)"
                />
                <label :for="'item-' + (item.id || index)"> </label>
              </div>
              <span v-if="!item.svg">
                {{ getItemDisplayText(item) }}
              </span>
              <span v-else v-html="item.svg"></span>
            </label>
          </template>
          <template v-else>
            <span v-if="!item.svg">
              {{ getItemDisplayText(item) }}
            </span>
            <span v-else v-html="item.svg"></span>
          </template>
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
    default: () => [],
  },
  value: {
    type: [Array, Object, String, Number],
    default: () => [],
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
  studentIcon: {
    type: Boolean,
    default: false,
  },
  isMultiselect: {
    type: Boolean,
    default: false,
  },
  defaultValue: {
    type: [Array, Object, String, Number],
    default: null,
  },
})
const emit = defineEmits(['update:modelValue'])
const isDropdownMenu = ref(false)
const selectContainer = ref(null)
const listRef = ref(null)
const shouldOpenUp = ref(false)
// Получить отображаемый текст элемента
const getItemDisplayText = (item) => {
  if (item === null || item === undefined) return ''
  if (typeof item === 'string' || typeof item === 'number') return item
  if (item.name) return item.name
  if (item.student_name) return item.student_name
  if (item.text) return item.text
  return item.id || ''
}
// Получить уникальный идентификатор элемента
const getItemId = (item) => {
  if (item === null || item === undefined) return null
  if (typeof item === 'object' && item.id !== undefined) return item.id
  return item
}
// Список выбранных значений
const selectedValues = ref([])
// Инициализация выбранных значений
const initializeSelectedValues = () => {
  if (props.isMultiselect) {
    // Для мультиселекта - массив объектов
    if (Array.isArray(props.defaultValue) && props.defaultValue.length > 0) {
      // Используем defaultValue если он предоставлен
      selectedValues.value = [...props.defaultValue]
      // Эмитим событие с выбранными значениями из defaultValue
      emit('update:modelValue', [...selectedValues.value])
    } else if (props.items.length > 0) {
      // Выбираем первый элемент по умолчанию для мультиселекта только если нет defaultValue
      selectedValues.value = [props.items[0]]
      // Эмитим событие с первым выбранным элементом
      emit('update:modelValue', [...selectedValues.value])
    } else {
      selectedValues.value = []
    }
  } else {
    // Для одиночного выбора - массив с одним объектом
    if (props.defaultValue !== null) {
      // Используем defaultValue если он предоставлен
      selectedValues.value = [props.defaultValue]
      // Эмитим событие с defaultValue
      emit('update:modelValue', props.defaultValue)
    } else if (props.items.length > 0) {
      // Выбираем первый элемент по умолчанию для одиночного выбора только если нет defaultValue
      selectedValues.value = [props.items[0]]
      // Эмитим событие с первым выбранным элементом
      emit('update:modelValue', props.items[0])
    } else {
      selectedValues.value = []
    }
  }
}
// Проверка наличия SVG в выбранном значении
const hasSvg = computed(() => {
  if (selectedValues.value.length === 0) {
    return props.items.length > 0 && props.items[0].svg ? true : false
  }
  return selectedValues.value.some((item) => item && item.svg)
})
// Получение содержимого SVG
const svgContent = computed(() => {
  if (selectedValues.value.length === 0) {
    return props.items.length > 0 && props.items[0].svg ? props.items[0].svg : ''
  }
  const svgItem = selectedValues.value.find((item) => item && item.svg)
  if (svgItem) return svgItem.svg
  return ''
})

// Получение текстового представления для input
const displayValue = computed(() => {
  if (selectedValues.value.length === 0) {
    const firstItem = props.items[0]
    if (!firstItem) return ''
    return firstItem.svg ? '' : getItemDisplayText(firstItem)
  }
  return selectedValues.value
    .filter((item) => !item.svg)
    .map((item) => getItemDisplayText(item))
    .join(', ')
})
// Выбран ли элемент
const isSelected = (item) => {
  const itemId = getItemId(item)
  return selectedValues.value.some((selectedItem) => {
    const selectedId = getItemId(selectedItem)
    if (itemId !== null && selectedId !== null) {
      return selectedId === itemId
    }
    // Для строк и других примитивов
    return selectedItem === item
  })
}
// Переключение (для чекбоксов в мультиселекте)
const toggleItem = (item) => {
  const index = selectedValues.value.findIndex(
    (selectedItem) => getItemId(selectedItem) === getItemId(item),
  )
  if (index >= 0) {
    selectedValues.value.splice(index, 1)
  } else {
    selectedValues.value.push(item)
  }
  emit('update:modelValue', [...selectedValues.value])
}
// Выбор одного значения (одиночный режим)
const selectSingle = (item) => {
  selectedValues.value = [item]
  emit('update:modelValue', item)
  isDropdownMenu.value = false
}
// Открытие/закрытие списка
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
// Стиль выпадения списка
const dropdownStyle = computed(() => ({
  top: shouldOpenUp.value ? 'auto' : '100%',
  bottom: shouldOpenUp.value ? '100%' : 'auto',
}))
const imageClass = computed(() => ({
  openUp: shouldOpenUp.value,
  open: isDropdownMenu.value,
}))
const updateDropdownPosition = () => {
  if (selectContainer.value && listRef.value) {
    const rect = selectContainer.value.getBoundingClientRect()
    const listHeight = listRef.value.offsetHeight
    const spaceBelow = window.innerHeight - rect.bottom
    shouldOpenUp.value = listHeight > spaceBelow
  }
}
onMounted(() => {
  window.addEventListener('resize', updateDropdownPosition)
  initializeSelectedValues()
})
onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownPosition)
})
// Следим за изменениями в списке элементов
watch(
  () => props.items,
  (newItems) => {
    // Проверяем, есть ли defaultValue
    if (props.isMultiselect) {
      if (
        !(Array.isArray(props.defaultValue) && props.defaultValue.length > 0) &&
        selectedValues.value.length === 0 &&
        newItems.length > 0
      ) {
        // Если нет defaultValue и нет выбранных значений, выбираем первый элемент
        selectedValues.value = [newItems[0]]
        emit('update:modelValue', [...selectedValues.value])
      }
    } else {
      if (props.defaultValue === null && selectedValues.value.length === 0 && newItems.length > 0) {
        // Если нет defaultValue и нет выбранных значений, выбираем первый элемент
        selectedValues.value = [newItems[0]]
        emit('update:modelValue', newItems[0])
      }
    }
  },
  { immediate: true },
)
// Подхватываем внешние изменения defaultValue
watch(
  () => props.defaultValue,
  (newVal) => {
    if (props.isMultiselect) {
      if (Array.isArray(newVal) && newVal.length > 0) {
        selectedValues.value = [...newVal]
        emit('update:modelValue', [...selectedValues.value])
      } else if (selectedValues.value.length === 0 && props.items.length > 0) {
        // Если defaultValue пустой, но есть элементы, выбираем первый
        selectedValues.value = [props.items[0]]
        emit('update:modelValue', [...selectedValues.value])
      }
    } else {
      if (newVal !== null) {
        selectedValues.value = [newVal]
        emit('update:modelValue', newVal)
      } else if (selectedValues.value.length === 0 && props.items.length > 0) {
        // Если defaultValue пустой, но есть элементы, выбираем первый
        selectedValues.value = [props.items[0]]
        emit('update:modelValue', props.items[0])
      }
    }
  },
  { deep: true },
)
// Реагирование на изменение режима isMultiselect
watch(
  () => props.isMultiselect,
  () => {
    initializeSelectedValues()
  },
)
</script>
<style scoped></style>
