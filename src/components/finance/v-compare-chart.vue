<template>
  <div class="v-compare-chart" ref="container" @mousemove="handleMouseMove">
    <div class="v-compare-chart__wrapper">
      <div class="v-compare-chart__container">
        <Bar :data="chartData" :options="chartOptions" />

        <transition name="fade">
          <div
            v-if="tooltip.visible"
            class="custom-tooltip"
            :style="{ left: tooltip.x + 30 + 'px', top: tooltip.y - 20 + 'px' }"
          >
            <div class="tooltip-body">{{ tooltip.value }}</div>
            <div class="tooltip-arrow"></div>
          </div>
        </transition>
        <div class="labels-container">
          <div v-for="(label, index) in labels" :key="index" class="label-item">
            <div class="label-content">{{ label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { colors } from '@/charts/chartConfig'
import { useGeneralStore } from '@/stores/generalStore'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { generateCodeFrame } from 'vue/compiler-sfc'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const container = ref(null)

const store = useGeneralStore()

const nightMode = computed(() => {
  return store.nightMode
})
const labels = ref([
  'Прогнозируемое количество занятий',
  'LTV',
  'Отмененные занятия',
  'Коэффициент отмен',
  'Упущенная выручка',
  'Ожидаемая выручка',
])

const tooltip = reactive({
  visible: false,
  value: '',
  x: 0,
  y: 0,
})

const mousePos = ref({ x: 0, y: 0 })

const handleMouseMove = (event) => {
  const rect = container.value.getBoundingClientRect()
  mousePos.value.x = event.clientX - rect.left
  mousePos.value.y = event.clientY - rect.top
}

const chartData = computed(() => ({
  labels: ['', '', '', '', '', ''],
  datasets: [
    {
      label: 'Елизавета',
      backgroundColor: !nightMode.value ? '#1D4ECC' : '#1F5EFF',
      data: [80, 85, 75, 65, 85, 80],
      barPercentage: 0.3,
      categoryPercentage: 0.5,
      borderRadius: 10,
    },
    {
      label: 'Алексей',
      backgroundColor: !nightMode.value ? '#CCD8F8' : '#2D313B',
      data: [45, 40, 50, 70, 40, 45],
      barPercentage: 0.3,
      categoryPercentage: 0.5,
      borderRadius: 10,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      position: 'top',
      align: 'start',
      labels: {
        boxWidth: 8,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      enabled: false,
      external: (context) => {
        const tooltipModel = context.tooltip

        if (tooltipModel.opacity === 0) {
          tooltip.visible = false
          return
        }

        const value = tooltipModel.body?.[0]?.lines?.[0] || ''
        tooltip.value = value.split(': ')[1] || value

        // Используем реальные координаты курсора
        tooltip.x = mousePos.value.x
        tooltip.y = mousePos.value.y
        tooltip.visible = true
      },

      mode: 'nearest',
      intersect: true,
      callbacks: {
        title: function (context) {
          const index = context[0].dataIndex
          return labels.value[index]
        },
        label: function (context) {
          const datasetLabel = context.dataset.label || ''
          const value = context.parsed.y
          return `${datasetLabel}: ${value}`
        },
      },
    },
  },
  scales: {
    y: {
      display: false,
      beginAtZero: true,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 10,
      left: 20,
    },
  },
}
</script>

<style>
.v-compare-chart {
  position: relative;
  height: 350px;
  width: 100%;
}

.v-compare-chart__wrapper {
  overflow-x: auto;
  height: 370px;
}

.v-compare-chart__wrapper::-webkit-scrollbar {
  display: none;
}

.v-compare-chart__container {
  min-width: 900px;
  height: 80%;
}

.labels-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 5px;
  padding: 0 20px;
}

.label-item {
  color: var(--custom-black-text);
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;

  max-width: 16.66%;
}

.label-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 40px;
  line-height: 1.2;

  font-size: 13px;
  font-weight: 500;
}

.custom-tooltip {
  position: absolute;
  color: var(--custom-black-text);
  background: var(--custom-white);
  border-radius: 8px;
  min-width: 38px;
  min-height: 34px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 6px 10px;
  font-size: 12px;
  pointer-events: none;
  z-index: 10;
  transform: translate(-50%, -12px);

  box-shadow: 0px 4px 6px -2px #0a0d1208;

  box-shadow: 0px 12px 16px -4px #0a0d1214;
}

.tooltip-body {
  font-weight: 500;
  text-align: center;
}

.tooltip-arrow {
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateY(-160%) translateX(-250%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--custom-white);
  z-index: -1;
}

.night__mode .custom-tooltip,
.night__mode .tooltip-arrow {
  background-color: var(--custom-black);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
