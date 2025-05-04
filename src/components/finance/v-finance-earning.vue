<template>
  <div class="v-finance__chart styled-section">
    <div class="v-finance__chart-header">
      <div class="v-finance__chart-header-wrapper">
        <div class="v-finance__chart-header-block">
          <div class="v-finance__chart-title text-section-title">График заработка</div>

          <div class="v-finance__chart-pagination" v-show="currentState !== 'По годам'">
            <img
              src="/src/assets/images/arrow-left-finance.svg"
              alt=""
              @click="handlePrevPeriod"
              class="cursor-pointer"
            />
            {{ currentPaginationRange }}
            <img
              src="/src/assets/images/arrow-right-finance.svg"
              alt=""
              @click="handleNextPeriod"
              class="cursor-pointer"
            />
          </div>

          <div class="v-finance__chart-forecast">
            <div class="styled-checkbox">
              <input type="checkbox" id="forecast">
              <label for="forecast"></label>
            </div>
            <label for="forecast">Уточненный прогноз с учетом отмен</label>
          </div>
        </div>

        <div class="flex gap-5">
          <v-styled-select
            :items="['По годам', 'По месяцам', 'По неделям', 'По дням']"
            @update:model-value="onSelectChartType"
          />
          <div class="v-finance__chart-pagination mob" v-if="currentState !== 'По годам'">
            <img
              src="/src/assets/images/arrow-left-finance.svg"
              alt=""
              @click="handlePrevPeriod"
              class="cursor-pointer"
            />
            {{ currentPaginationRange }}
            <img
              src="/src/assets/images/arrow-right-finance.svg"
              alt=""
              @click="handleNextPeriod"
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div class="v-finance__chart-forecast mob">
        <div class="styled-checkbox">
          <input type="checkbox" id="forecast-mob">
          <label for="forecast-mob"></label>
        </div>
        <label for="forecast-mob">Уточненный прогноз с учетом отмен</label>
      </div>
    </div>

    <div class="v-finance__chart-element">
      <div
        class="v-finance__chart-wrapper"
        :class="{
          year: isYearlyChart,
          weeks: currentState === 'По неделям',
          days: currentState === 'По дням'
        }"
        :style="getChartWidth()"
      >
        <Bar :data="chartData" :options="chartOptions" :key="chartKey" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* === Импорты === */
import { ref, computed, onMounted, watch } from 'vue'
import { monthBarChartOptions } from '@/charts/financeChartConfig'
import { useFinanceStore } from '@/stores/financeStore'

import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import vStyledSelect from '../generalComponents/v-styled-select.vue'
import { useChartColors } from '@/composables/useChartColors'
import { getDailyEarnings, getEarningsForYear, getMonthlyEarnings } from '@/api/requests'

/* === Регистрация Chart.js плагинов === */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
)

/* === Состояния и computed === */
const financeStore = useFinanceStore()
const currentState = ref('По годам')
const chartKey = ref(0)
const isYearlyChart = ref(false)
const currentPeriodIndex = ref(0)

// Форматирование числа в рубли
const formatRubles = (value) => {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

// Форматирование даты для недель и дней
const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('ru-RU', options)
}

// Форматирование дня недели и даты
const formatDayDate = (date) => {
  const weekdayOptions = { weekday: 'long' }
  const dayOptions = { day: 'numeric' }

  const weekday = new Date(date).toLocaleDateString('ru-RU', weekdayOptions)
  const day = new Date(date).toLocaleDateString('ru-RU', dayOptions)

  // Первая буква заглавная
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)

  return `${capitalizedWeekday}, ${day}`
}

const currentPaginationRange = computed(() => {
  if (currentState.value === 'По месяцам') {
    return currentYear.value
  } else if (currentState.value === 'По неделям') {
    const weekPeriod = weekData.value[currentPeriodIndex.value]
    if (weekPeriod) {
      const firstDate = new Date(weekPeriod.startDate)
      const lastDate = new Date(weekPeriod.endDate)
      return `${formatDate(firstDate)} - ${formatDate(lastDate)}`
    }
    return ''
  } else if (currentState.value === 'По дням') {
    const dayPeriod = dayData.value[currentPeriodIndex.value]
    if (dayPeriod) {
      const firstDate = new Date(dayPeriod.startDate)
      const lastDate = new Date(dayPeriod.endDate)
      return `${formatDate(firstDate)} - ${formatDate(lastDate)}`
    }
    return ''
  }
  return null
})

const currentYear = ref(2024)

/* === Метки и данные === */
const labels = ref({
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  years: ['2024', '2025'],
  // Метки и данные будут формироваться динамически
  weeks: [],
  days: []
})

const dataset = ref({
  months: [40000, 60000, 40000, 40000, 60000, 60000, 80000, 100000, 80000, 100000, 100000, 100000],
  years: [100000, 230400],
  weeks: [],
  days: []
})

// Данные по неделям (пример с 5 неделями в апреле)
const weekData = ref([
  {
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    data: [45000, 55000, 60000, 52000, 30000],
    labels: [
      '01.04 - 07.04',
      '08.04 - 14.04',
      '15.04 - 21.04',
      '22.04 - 28.04',
      '29.04 - 30.04'
    ]
  },
  {
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    data: [48000, 58000, 62000, 54000, 50000],
    labels: [
      '01.05 - 07.05',
      '08.05 - 14.05',
      '15.05 - 21.05',
      '22.05 - 28.05',
      '29.05 - 31.05'
    ]
  }
])

// Данные по дням (пример)
const dayData = ref([
  {
    startDate: '2024-04-08',
    endDate: '2024-04-14',
    data: [8000, 12000, 9500, 11000, 15000, 8500, 7000],
    labels: [
      '2024-04-08',
      '2024-04-09',
      '2024-04-10',
      '2024-04-11',
      '2024-04-12',
      '2024-04-13',
      '2024-04-14'
    ]
  },
  {
    startDate: '2024-04-15',
    endDate: '2024-04-21',
    data: [9000, 11000, 10500, 12000, 14000, 9500, 8000],
    labels: [
      '2024-04-15',
      '2024-04-16',
      '2024-04-17',
      '2024-04-18',
      '2024-04-19',
      '2024-04-20',
      '2024-04-21'
    ]
  }
])

const chartData = ref({
  labels: labels.value.months,
  datasets: [
    {
      label: 'Заработок',
      data: dataset.value.months,
      backgroundColor: '#1D4ECC',
      borderRadius: 12,
      barPercentage: 0.3,
      categoryPercentage: 0.1,
    },
  ],
})

/* === Настройки графика === */
const chartOptions = ref({
  ...monthBarChartOptions,
  plugins: {
    ...monthBarChartOptions.plugins,
    datalabels: {
      color: '#000',
      anchor: 'end',
      align: 'top',
      offset: 0,
      font: {
        weight: 'bold',
        size: 12
      },
      formatter: (value) => value ? formatRubles(value) : '',
      display: (context) => context.dataset.data[context.dataIndex] > 0
    }
  }
})

useChartColors(chartOptions, chartKey)

/**
 * Фильтрует данные, удаляя нулевые значения и соответствующие метки
 */
const filterZeroValues = (data, labels) => {
  const filteredIndexes = []

  // Находим индексы ненулевых значений
  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0) {
      filteredIndexes.push(i)
    }
  }

  // Создаем отфильтрованные массивы
  const filteredData = filteredIndexes.map(i => data[i])
  const filteredLabels = filteredIndexes.map(i => labels[i])

  return { data: filteredData, labels: filteredLabels }
}

onMounted(() => {
  // Инициализация данных для недель и дней
  updateDatasetForPeriod()

  // Получение данных из хранилища
  fetchDataFromStore()
})

/**
 * Загружает данные из хранилища Pinia
 */
const fetchDataFromStore = () => {
  try {
    // Проверяем наличие данных в хранилище
    if (financeStore.earningData) {
      // Здесь можно обновить dataset.value данными из хранилища
      // В зависимости от структуры данных в хранилище
      updateDatasetFromStore()
    }
  } catch (error) {
    console.error('Ошибка при получении данных из хранилища:', error)
  }
}

/**
 * Обновляет данные из хранилища
 */
const updateDatasetFromStore = () => {
  // Обновляем отображение
  updateDatasetForPeriod()
}

// Следим за изменениями в хранилище
watch(() => financeStore.lastUpdated, () => {
  fetchDataFromStore()
  chartKey.value++ // Перерисовываем график
})

/**
 * Обработчик навигации по периодам
 */
const handlePrevPeriod = () => {
  if (currentPeriodIndex.value > 0) {
    currentPeriodIndex.value--
    updateDatasetForPeriod()
  } else if (currentState.value === 'По месяцам' && currentYear.value > 2024) {
    currentYear.value--
    updateDatasetForPeriod()
  }
}

const handleNextPeriod = () => {
  if (currentState.value === 'По неделям' && currentPeriodIndex.value < weekData.value.length - 1) {
    currentPeriodIndex.value++
    updateDatasetForPeriod()
  } else if (currentState.value === 'По дням' && currentPeriodIndex.value < dayData.value.length - 1) {
    currentPeriodIndex.value++
    updateDatasetForPeriod()
  } else if (currentState.value === 'По месяцам' && currentYear.value < 2025) {
    currentYear.value++
    updateDatasetForPeriod()
  }
}

/**
 * Обновляет данные графика в зависимости от текущего периода
 */
const updateDatasetForPeriod = () => {
  if (currentState.value === 'По неделям') {
    const weekPeriod = weekData.value[currentPeriodIndex.value]
    if (!weekPeriod) return

    // Фильтруем нулевые значения
    const filtered = filterZeroValues(weekPeriod.data, weekPeriod.labels)

    chartData.value = {
      labels: filtered.labels,
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: filtered.data,
          barPercentage: 0.15,
          categoryPercentage: 0.4,
        },
      ],
    }
  } else if (currentState.value === 'По дням') {
    const dayPeriod = dayData.value[currentPeriodIndex.value]
    if (!dayPeriod) return

    // Фильтруем нулевые значения
    const filtered = filterZeroValues(dayPeriod.data, dayPeriod.labels)

    chartData.value = {
      // Для дней форматируем метки особым образом
      labels: filtered.labels.map(date => formatDayDate(date)),
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: filtered.data,
          barPercentage: 0.3,
          categoryPercentage: 0.4,
        },
      ],
    }
  } else if (currentState.value === 'По месяцам') {
    // Фильтруем нулевые значения для месяцев текущего года
    const monthData = [...dataset.value.months]
    const monthLabels = [...labels.value.months]
    const filtered = filterZeroValues(monthData, monthLabels)

    chartData.value = {
      labels: filtered.labels,
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: filtered.data,
          barPercentage: 0.4,
          categoryPercentage: 0.4,
        },
      ],
    }
  } else if (currentState.value === 'По годам') {
    // Фильтруем нулевые значения для годов
    const yearData = [...dataset.value.years]
    const yearLabels = [...labels.value.years]
    const filtered = filterZeroValues(yearData, yearLabels)

    chartData.value = {
      labels: filtered.labels,
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: filtered.data,
          barPercentage: 0.15,
          categoryPercentage: 0.8,
        },
      ],
    }
  }
  chartKey.value++ // Обновляем ключ для перерисовки графика
}

/**
 * Вычисляет ширину графика в зависимости от типа графика.
 */
const getChartWidth = () => {
  const styles = {}

  if (isYearlyChart.value) {
    // Для годовых графиков, расчет ширины на основе отфильтрованных данных
    const count = chartData.value.labels.length || labels.value.years.length
    styles['min-width'] = `${count * 100}px`
    styles.width = `${count * 100}px`
  } else if (currentState.value === 'По дням') {
    // Для дневных графиков
    const count = chartData.value.labels.length || 7
    styles['min-width'] = `${Math.max(count * 80, 500)}px`
    styles.width = '100%'
  } else if (currentState.value === 'По неделям') {
    // Для недельных графиков
    const count = chartData.value.labels.length || 4
    styles['min-width'] = `${Math.max(count * 120, 500)}px`
    styles.width = '100%'
  }

  return styles
}

/**
 * Обработчик изменения типа графика
 */
const onSelectChartType = (value) => {
  currentState.value = value
  currentPeriodIndex.value = 0 // Сбрасываем индекс периода
  isYearlyChart.value = value === 'По годам'

  // Обновляем опции графика с учетом отображения значений над столбцами
  chartOptions.value = {
    ...chartOptions.value,
    plugins: {
      ...chartOptions.value.plugins,
      datalabels: {
        ...chartOptions.value.plugins.datalabels,
        display: (context) => context.dataset.data[context.dataIndex] > 0
      }
    },
    scales: {
      ...chartOptions.value.scales,
      y: {
        ...chartOptions.value.scales.y,
        // Немного увеличиваем отступ сверху для значений
        ticks: {
          ...chartOptions.value.scales.y.ticks,
          padding: 15
        }
      }
    }
  }

  // Обновляем данные в зависимости от выбранного типа
  switch (value) {
    case 'По годам':
      // Фильтруем нулевые значения
      const yearData = [...dataset.value.years]
      const yearLabels = [...labels.value.years]
      const filteredYears = filterZeroValues(yearData, yearLabels)

      chartData.value = {
        labels: filteredYears.labels,
        datasets: [
          {
            ...chartData.value.datasets[0],
            barPercentage: 0.15,
            categoryPercentage: 0.8,
            data: filteredYears.data,
          },
        ],
      }
      break
    case 'По месяцам':
      // Фильтруем нулевые значения
      const monthData = [...dataset.value.months]
      const monthLabels = [...labels.value.months]
      const filteredMonths = filterZeroValues(monthData, monthLabels)

      chartData.value = {
        labels: filteredMonths.labels,
        datasets: [
          {
            ...chartData.value.datasets[0],
            barPercentage: 0.4,
            categoryPercentage: 0.4,
            data: filteredMonths.data,
          },
        ],
      }
      break
    case 'По неделям':
    case 'По дням':
      updateDatasetForPeriod()
      break
  }

  chartKey.value++ // Обновляем ключ для перерисовки графика
}

const loadData = async () => {
  const currentYear = new Date().getFullYear()
  const dailyEarnings = await getDailyEarnings(financeStore.currentRange[0],  financeStore.currentRange[1])
  const yaerlyEarnings = await getEarningsForYear()
  const monthlyEarnings = await getMonthlyEarnings(currentYear)
}

onMounted(()=>{
  loadData()
})
</script>

<style scoped>
.v-finance__chart-wrapper {
  overflow-x: auto;
}

.v-finance__chart-wrapper.weeks {
  min-height: 300px;
}

.v-finance__chart-wrapper.days {
  min-height: 350px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
