import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
export function changeTime(id, timeInputs) {
  /* Добавляет 1 час к началу занятия и помещает в поле времени конца занятия */
  const currentTime = timeInputs[id].start.split(':')

  // Проверяем, что время имеет правильный формат (часы:минуты)
  if (currentTime.length !== 2 || isNaN(currentTime[0]) || isNaN(currentTime[1])) {
    console.error('Некорректное время:', timeInputs[id].start)
    return
  }

  let hour = parseInt(currentTime[0], 10)
  const minutes = currentTime[1]

  // Проверка на диапазон минут
  if (parseInt(minutes, 10) < 0 || parseInt(minutes, 10) >= 60) {
    console.error('Некорректные минуты:', minutes)
    return
  }

  // Увеличиваем час на 1, при этом учитываем переход через 24 часа
  hour = (hour + 1) % 24

  // Форматируем время
  const endTime = `${hour.toString().padStart(2, '0')}:${minutes}`

  // Обновляем поле времени конца занятия
  timeInputs[id].end = endTime
}

export function getAccessToken() {
  const match = document.cookie.match(/(^| )access_token=([^;]+)/)
  console.log(document.cookie)
  return match ? match[2] : null
}

export function formatDay(date) {
  if (!date) return ''
  const formattedDate = format(date, 'd MMMM yyyy', { locale: ru })

  return formattedDate
}
