<template>
  <div class="v-finance__analysis styled-section">
    <div class="v-finance__analysis-header">
      <div class="v-finance__analysis-title text-section-title">Анализ учеников</div>
      <div class="v-finance__analysis-nav">
        <div
          v-for="(chartType, index) in chartTypes"
          :key="index"
          class="styled-nav"
          :class="{ active: activeChartType === chartType.label }"
          @click="() => setChartType(chartType.label)"
        >
          {{ chartType.name }}
        </div>
      </div>
    </div>

    <div class="v-finance__analysis-element">
      <div class="v-finance__analysis-wrapper">
        <Bar :data="chartData" :options="chartOptions" :key="chartKey" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* ---------------- Импорты ---------------- */
import { ref } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar } from 'vue-chartjs'

import { useChartColors } from '@/composables/useChartColors'
import { studentAnalysisChartOptions } from '@/charts/studentAnalysis'

/* --------- Регистрация компонентов Chart.js --------- */
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)

/* ---------------- Состояния ---------------- */
const chartKey = ref(0)
const activeChartType = ref('earning')

/* ---------------- Конфигурация ---------------- */
const chartOptions = ref(studentAnalysisChartOptions)

useChartColors(chartOptions, chartKey)

/* ---------------- Типы графиков ---------------- */
const chartTypes = ref([
  { name: 'Заработок', label: 'earning' },
  { name: 'Источник', label: 'source' },
  { name: 'Цели', label: 'goals' },
])

const setChartType = (type) => {
  activeChartType.value = type
}

/* ---------------- Данные ---------------- */
const studentNames = [
  'Алексей Иванов',
  'Елизавета Иванова',
  'Богдан Иванов',
  'Сергей Иванов',
  'Виолетта Иванова',
  'Даниил Иванов',
]

const studentEarnings = [24000, 23000, 20000, 15000, 12000, 6000]

const chartData = ref({
  labels: studentNames,
  datasets: [
    {
      label: 'Заработок',
      data: studentEarnings,
      backgroundColor: '#1D4ECC',
      borderRadius: 10,
      barPercentage: 0.3,
      categoryPercentage: 0.8,
    },
  ],
})
</script>
