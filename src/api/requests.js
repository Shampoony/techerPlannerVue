const accessToken = ''

export async function getTeacherById(teacherId) {
  try {
    const response = await fetch(`https://api.teacherplanner.ru/api/teachers/${teacherId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

export async function getLessonsOnMonth(teacherId, year, month) {
  try {
    const response = await fetch(
      `https://api.teacherplanner.ru/api/teachers/${teacherId}/${year}/${month}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении уроков учителя на месяц', error)
  }
}

export async function getLessonsOnWeek(teacherId, startDate) {
  try {
    const response = await fetch(
      `https://api.teacherplanner.ru/api/teachers/${teacherId}/${startDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении уроков учителя на неделю', error)
  }
}
