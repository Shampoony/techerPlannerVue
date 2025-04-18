<template>
  <div class="v-finance__chart styled-section">
    <div class="v-finance__chart-header">
      <div class="v-finance__chart-header-wrapper">
        <div class="v-finance__chart-header-block">
          <div class="v-finance__chart-title text-section-title">График заработка</div>

          <div class="v-finance__chart-pagination">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="#717680"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            2024
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="#717680"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div class="v-finance__chart-forecast">
            <div class="styled-checkbox">
              <input type="text" id="forecast" />
              <label for="forecast"></label>
            </div>
            <label for="forecast">Уточненный прогноз с учетом отмен</label>
          </div>
        </div>

        <div class="flex gap-5">
          <v-styled-select
            :items="['По годам', 'По месяцам']"
            @update:model-value="onSelectChartType"
          />
          <div class="v-finance__chart-pagination mob">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="#717680"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            2024
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="#717680"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="v-finance__chart-forecast mob">
        <div class="styled-checkbox">
          <input type="text" id="forecast" />
          <label for="forecast"></label>
        </div>
        <label for="forecast">Уточненный прогноз с учетом отмен</label>
      </div>
    </div>

    <div class="v-finance__chart-element">
      <div
        class="v-finance__chart-wrapper"
        :class="{ year: isYearlyChart }"
        :style="getChartWidth()"
      >
        <Bar :data="chartData" :options="chartOptions" :key="chartKey" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* === Импорты === */
import { ref } from 'vue'
import { monthBarChartOptions } from '@/charts/financeChartConfig'
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
const chartKey = ref(0)
const isYearlyChart = ref(false)

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
})

const dataset = ref({
  months: [40000, 60000, 40000, 40000, 60000, 60000, 80000, 100000, 80000, 100000, 100000, 100000],
  years: [100000, 230400],
})

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
const chartOptions = ref(monthBarChartOptions)

useChartColors(chartOptions, chartKey)

/**
 * Вычисляет ширину графика в зависимости от типа графика.
 */
const getChartWidth = () => {
  const styles = {}
  if (isYearlyChart.value) {
    const count = labels.value.years.length
    styles['min-width'] = `${count * 100}px`
    styles.width = `${count * 100}px`
  }
  return styles
}

/**
 * Обработчик изменения типа графика (месяцы/годы)
 */
const onSelectChartType = (value) => {
  const isMonths = value === 'По месяцам'
  isYearlyChart.value = !isMonths

  chartOptions.value = {
    ...chartOptions.value,
    plugins: {
      ...chartOptions.value.plugins,
    },
  }

  chartData.value = {
    labels: isMonths ? labels.value.months : labels.value.years,
    datasets: [
      {
        ...chartData.value.datasets[0],
        barPercentage: isMonths ? 0.4 : 0.15,
        categoryPercentage: isMonths ? 0.4 : 0.8,
        data: isMonths ? dataset.value.months : dataset.value.years,
      },
    ],
  }
}
</script>
