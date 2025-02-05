import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { startOfWeek, endOfWeek } from 'date-fns'

const months = [
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
]

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

export function formatWeek(date) {
  if (!date) return ''

  // Определяем начало и конец недели
  const start = startOfWeek(date, { weekStartsOn: 1 }) // Неделя начинается с понедельника
  const end = endOfWeek(date, { weekStartsOn: 1 })

  // Форматируем даты вручную
  const startFormatted = format(start, 'd MMM', { locale: ru })
  const endFormatted = format(end, 'd MMM', { locale: ru })

  return `${startFormatted} - ${endFormatted}`
}

export function getMonthByIndex(monthIndex) {
  return months[monthIndex]
}
export function formatMonth(date) {
  const month = getMonthByIndex(date.getMonth())
  const year = date.getFullYear()
  return `${month}, ${year}`
}
export function transformDate(input) {
  const output = input.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1T') + '00:00:00'
  return output
}

export function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
export function formatDateToStandart(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export function getNextMonday(date) {
  const day = date.getDay()
  const diff = (7 - day + 1) % 7 // Расчет разницы до следующего понедельника
  const nextMonday = new Date(date)
  nextMonday.setDate(date.getDate() + diff) // Устанавливаем следующую дату понедельника
  nextMonday.setHours(0, 0, 0, 0) // Устанавливаем время на 00:00:00
  return nextMonday
}
export function getPreviousMonday(date) {
  const dayOfWeek = date.getDay() // 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
  const daysAgo = dayOfWeek === 1 ? 7 : dayOfWeek - 1 // Если понедельник, то возвращаем 7 дней назад
  const previousMonday = new Date(date)
  previousMonday.setDate(date.getDate() - daysAgo)
  return previousMonday
}
