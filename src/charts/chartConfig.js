import { ref } from 'vue'

const nightMode = ref(localStorage.getItem('nightMode') === 'true')
console.log(nightMode.value)

export const colors = {
  blue: nightMode.value ? '#1F5EFF' : '#1D4ECC',
  lightBlue: '#E4EFFF',
  blueStroke: nightMode.value ? '#2D313B' : '#CCD8F8',
  gray: 'rgba(113, 118, 128, 0.2)',
  blackText: nightMode.value ? '#fff' : '#344055',
  transperentBlackText: 'rgba(52, 64, 85, 0.56)',
}
export const chartData = {
  labels: [
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
    '05.02.2025',
  ],
  datasets: [
    {
      label: 'Результаты',
      data: [2, 3, 4, 5, 3, 4, 2],
      borderColor: colors.blue,
      backgroundColor: colors.blue,
      tension: 0.1,

      pointRadius: 5,
      pointBackgroundColor: colors.lightBlue,
      pointBorderColor: colors.blue,
      pointBorderWidth: 3,
      pointStyle: 'circle',
    },
  ],
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 0,
      right: 20,
      top: 0,
      bottom: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        drawBorder: false, // Убираем границу сетки
        color: colors.gray,
      },
      border: {
        display: false,
      },
      ticks: {
        padding: 20, // Отступ между метками и осью X (снизу)
        font: {
          size: 12,
          weight: 'bold',
          family: 'Inter',
        },
        color: '#344055',
      },
    },
    y: {
      beginAtZero: false,
      min: 2,
      ticks: {
        display: false,
        stepSize: 1,
        font: {
          size: 15,
          family: 'Inter',
        },
        color: '#344055',
      },
      grid: {
        display: true,
        drawBorder: false, // Убираем границу сетки
        color: colors.gray,
      },
      border: {
        display: false,
      },
    },
  },
}
