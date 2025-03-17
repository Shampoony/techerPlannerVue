<template>
  <div class="v-file-handler" :data-instance-id="instanceId">
    <!-- File upload input -->
    <input
      :id="`file-handler-input-${instanceId}`"
      ref="fileInput"
      type="file"
      @input="handleFileChange"
      multiple
      class="hidden-input"
    />
    <div
      v-if="showDropArea"
      class="v-files-handler__drop-area"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleFileDrop"
      :class="{ dragging: isDragging }"
    >
      <img src="/src/assets/images/file-upload.svg" alt="" />
      <div class="v-files-handler__area-subtitle">
        <label :for="`file-handler-input-${instanceId}`">Загрузите файл </label>или перетащите в это
        поле
      </div>
    </div>
    <!-- File list -->
    <ul class="v-files-handler__list">
      <li
        class="v-files-handler__list-item file"
        v-for="file in internalFiles"
        :key="file.uniqueId"
      >
        <div class="file__block">
          <img class="file__image" src="/src/assets/images/file-day.svg" alt="" />
          <p class="file__title">{{ file.name }} ({{ formatFileSize(file.size) }})</p>
        </div>
        <img
          src="/src/assets/images/cross-day.svg"
          alt=""
          @click="removeFile(file.uniqueId)"
          style="cursor: pointer"
        />
      </li>
    </ul>
    <!-- Button to open file selector -->
    <div v-if="showAddButton" class="file-input" @click="openFileSelector">
      <img src="/src/assets/images/add-file-day.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'

// Генерируем случайный идентификатор для экземпляра компонента
const instanceId = Math.random().toString(36).substring(2, 10)

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  showDropArea: {
    type: Boolean,
    default: false,
  },
  showAddButton: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'file-added', 'file-removed'])

// Внутреннее хранилище файлов с добавлением уникального идентификатора для каждого
const internalFiles = ref([])

// Функция добавления уникального идентификатора к файлам
const addInstanceIdentifier = (files) => {
  return files.map((file) => {
    // Создаем копию файла с добавлением уникального идентификатора
    return {
      ...file,
      uniqueId:
        file.uniqueId || `${instanceId}-${file.id || Math.random().toString(36).substring(2, 10)}`,
    }
  })
}

// Инициализация при монтировании компонента
onMounted(() => {
  internalFiles.value = addInstanceIdentifier([...props.modelValue])
})

// Отслеживаем изменения в props.modelValue
watch(
  () => props.modelValue,
  (newFiles) => {
    // Добавляем уникальные идентификаторы только новым файлам
    const existingFileIds = new Set(internalFiles.value.map((f) => f.uniqueId))
    const newFilesWithId = addInstanceIdentifier(newFiles)

    // Оставляем только те файлы, которых еще нет в internalFiles
    const genuinelyNewFiles = newFilesWithId.filter((file) => !existingFileIds.has(file.uniqueId))

    // Объединяем существующие файлы с новыми
    if (genuinelyNewFiles.length > 0) {
      internalFiles.value = [...internalFiles.value, ...genuinelyNewFiles]
    } else if (newFiles.length !== internalFiles.value.length) {
      // Если количество файлов изменилось и нет новых файлов, то это удаление
      internalFiles.value = newFilesWithId
    }
  },
  { deep: true },
)

// Отслеживаем изменения во внутреннем хранилище и эмитим обновления
watch(
  internalFiles,
  (newInternalFiles) => {
    // Отправляем только данные о файлах без инстанс-идентификаторов
    const cleanFiles = newInternalFiles.map(({ uniqueId, ...rest }) => rest)
    emit('update:modelValue', cleanFiles)
  },
  { deep: true },
)

const fileInput = ref(null)
const isDragging = ref(false)

const addFilesToList = (filesToAdd) => {
  const newFiles = Array.from(filesToAdd).map((file) => ({
    id: Math.random().toString(36).substring(2, 15),
    name: file.name,
    size: file.size,
    file: file,
  }))

  // Добавляем уникальные идентификаторы
  const newFilesWithInstanceId = addInstanceIdentifier(newFiles)
  internalFiles.value = [...internalFiles.value, ...newFilesWithInstanceId]

  // Отправляем события без инстанс-идентификаторов
  emit('file-added', newFiles)
}

const handleFileChange = (e) => {
  if (e.target.files && e.target.files.length > 0) {
    addFilesToList(e.target.files)
    // Сбрасываем значение input для возможности выбора того же файла
    e.target.value = ''
  }
}

const handleFileDrop = (e) => {
  isDragging.value = false
  const droppedFiles = e.dataTransfer.files
  if (droppedFiles.length > 0) {
    addFilesToList(droppedFiles)
  }
}

const openFileSelector = () => {
  fileInput.value.click()
}

const formatFileSize = (size) => {
  if (size < 1024) {
    return size + ' B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  } else {
    return (size / (1024 * 1024)).toFixed(2) + ' MB'
  }
}

const removeFile = (uniqueId) => {
  const fileToRemove = internalFiles.value.find((file) => file.uniqueId === uniqueId)
  if (fileToRemove) {
    // Удаляем уникальный идентификатор перед отправкой события
    const { uniqueId: _, ...cleanFileToRemove } = fileToRemove
    internalFiles.value = internalFiles.value.filter((file) => file.uniqueId !== uniqueId)
    emit('file-removed', cleanFileToRemove)
  }
}

// Метод для обработки событий вставки (может вызываться из родительского компонента)
const handlePaste = (event) => {
  const clipboardData = event.clipboardData || window.clipboardData
  const items = clipboardData.items
  let hasFiles = false

  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile()
        if (file) {
          hasFiles = true
          addFilesToList([file])
        }
      }
    }
    return hasFiles // Возвращаем информацию о наличии файлов
  }
  return false
}

// Экспортируем методы для родительского компонента
defineExpose({
  addFilesToList,
  removeFile,
  handlePaste,
  openFileSelector,
  instanceId,
})
</script>

<style scoped>
.hidden-input {
  display: none;
}

.v-files-handler__drop-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.v-files-handler__drop-area.dragging {
  background-color: #e9e9e9;
  border-color: #aaa;
}

.v-files-handler__area-subtitle {
  margin-top: 8px;
  color: #666;
}

.v-files-handler__area-subtitle label {
  color: #1d4ecc;
  cursor: pointer;
}

.v-files-handler__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.v-files-handler__list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.file__block {
  display: flex;
  align-items: center;
  gap: 8px;
}

.file__title {
  margin: 0;
  font-size: 14px;
}

.file-input {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background-color: #f0f0f0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
