export function changeTime(id, timeInputs) {
  console.log(timeInputs)
  /* Добавляет 1 час к началу занятия и помещает в поле времени  конца занятия */
  const currentTime = timeInputs[id].start.split(':')
  const hour = parseInt(currentTime[0]) + 1
  const minutes = currentTime[1]
  const endTime = `${hour}:${minutes}`

  timeInputs[id].end = endTime
}
