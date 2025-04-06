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
      borderColor: '#1D4ECC',
      backgroundColor: '#1D4ECC',
      tension: 0.4,
    },
  ],
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 0,
      right: 20, // Отступ справа для всей области графика
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
        padding: 10, // Отступ между метками и осью Y (слева от меток)
        font: {
          size: 15,
          family: 'Inter',
        },
        color: '#344055',
      },
      grid: {
        display: true,
        drawBorder: false, // Убираем границу сетки
      },
      border: {
        display: false,
      },
    },
  },
}
