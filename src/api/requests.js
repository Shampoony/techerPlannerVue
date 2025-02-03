const domain = 'https://api.teacherplanner.ru'

export async function getTeacherById(teacherId) {
  try {
    const response = await fetch(`${domain}/api/teachers/${teacherId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении учителя', error)
  }
}

export async function getWeeks() {
  try {
    const response = await fetch(`${domain}/api/weeks`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО!
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()
    console.log(responseData)
    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении недель', error)
  }
}

export async function getLessonsOnMonth(year, month) {
  try {
    const response = await fetch(`${domain}/api/lessons/${year}/${month}`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО!
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении уроков учителя на месяц', error)
  }
}

export async function getLessonsOnWeek(startDate) {
  try {
    const response = await fetch(`${domain}/api/lessons/week/${startDate}`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО!
    })
    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении уроков учителя на неделю', error)
  }
}
