import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { startOfWeek, endOfWeek } from 'date-fns'

import { useGeneralStore } from '@/stores/generalStore'
import { computed } from 'vue'

export const stableOrder = [
  'student_id',
  'goal',
  'days_of_week',
  'start_times',
  'end_times',
  'repeat_until',
  'reminder_minutes',
  'break_minutes',
  'in_rule',
  'time_zone_teacher'
]

export const updatedStableOrder = [
  'student_id',
  'lesson_id',
  'updated_days_of_week',
  'updated_start_times',
  'updated_end_times',
  'repeat_until',
  'reminder_minutes',
  'break_minutes',
]

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
  const formattedDate = format(date, 'd.MM.yyyy')

  return formattedDate
}

export function formatWeek(date) {
  console.log(date)
  if (!date) return '';

  const pad = (n) => n.toString().padStart(2, '0');

  const day = date.getDay();
  const diffToMonday = (day + 6) % 7; // Понедельник — 0
  const start = new Date(date);
  start.setDate(date.getDate() - diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const startStr = `${pad(start.getDate())}.${pad(start.getMonth() + 1)}`;
  const endStr = `${pad(end.getDate())}.${pad(end.getMonth() + 1)}`;
  const year = end.getFullYear();

  return `${startStr} - ${endStr} ${year}`;
}


export function getMonthByIndex(monthIndex) {
  return months[monthIndex]
}

export function formatMonth(date) {
  const month = getMonthByIndex(date.getMonth())
  const year = date.getFullYear()

  const currentYear = new Date().getFullYear()
  return currentYear !== year ? `${month}, ${year}` : month
}
export function transformDate(input) {
  const output = input.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1T') + '00:00:00'
  return output
}

export function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}



export function formatDateRange (dates) {
  if (!dates) return '';

  const format = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  if (Array.isArray(dates) && dates.length === 2) {
    const [start, end] = dates;
    if (start && end) {
      return `${format(start)} - ${format(end)}`;
    }
  }

  return '';
};
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

export function sortObject(obj, order) {
  return Object.fromEntries(order.map((key) => [key, obj[key]]))
}

export function addTimeWithDuration(timeStr, durationMinutes) {
  let [hours, minutes] = timeStr.split(':').map(Number)

  // Добавляем минуты
  minutes += durationMinutes

  // Учитываем переход через час
  hours += Math.floor(minutes / 60)
  minutes %= 60

  // Форматируем результат в "HH:MM"
  return [String(hours).padStart(2, '0'), String(minutes).padStart(2, '0')].join(':')
}

export function getHomeworkClass(value) {
  if (value === 'Выполнено') return 'green'
  return ''
}

export function prettyPrice(price) {
  return price.toLocaleString()
}

export function getColors() {
  const store = useGeneralStore()

  const nightMode = store.nightMode

  return {
    blue: nightMode ? '#1F5EFF' : '#1D4ECC',
    lightBlue: '#E4EFFF',
    blueStroke: nightMode ? '#2D313B' : '#CCD8F8',
    gray: 'rgba(113, 118, 128, 0.2)',
    blackText: nightMode ? '#fff' : '#344055',
    transperentBlackText: 'rgba(52, 64, 85, 0.56)',
  }
}

export function getCurrentMonthDates () {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const endFormatted = endOfMonth.toISOString().slice(0, 10);

  return [startOfMonth, endOfMonth]
}


export function getDayOfWeek  (date, day) {

  const [ month, year] = date.split('.');

  const jsDate = new Date(`${year}-${month}-${day}`);

  console.log(year, month, day)

  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  const weekday = days[jsDate.getDay()];

  return `${weekday}, ${day}`;

}


export function getStatusClass  (value)  {
  if (parseInt(value) > 0) return 'green';
  if (parseInt(value) < 0) return 'red';
  return '';
};
