const domain = 'https://api.teacherplanner.ru'
import router from '@/router'
import jsonOrder from 'json-order'

export async function getTeacherById(teacherId) {
  try {
    const response = await fetch(`${domain}/api/teachers/${teacherId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      const code = response.status
      alert('Ошибка', code)
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении учителя', error)
  }
}

/*=================================================================== Календарь =============================================================== */

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

export async function getMyInfo() {
  try {
    const response = await fetch(`${domain}/api/get-me-info`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО!
    })
    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении информации об учителе', error)
  }
}

export async function deleteLessonById(lesson_id) {
  try {
    const response = await fetch(`${domain}/api/lessons/${lesson_id}`, {
      method: 'DELETE',
      credentials: 'include', // ВАЖНО!
    })
    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    } else {
      router.go(0)
    }
  } catch (error) {
    console.error('Произошла ошибки при удалении урока', error)
  }
}

export async function transferLesson(lesson_id, data, updateAfterTransfer = false) {
  console.log(JSON.stringify(data))

  try {
    const response = await fetch(`${domain}/api/lessons/${lesson_id}`, {
      method: 'PUT',
      credentials: 'include', // ВАЖНО
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    } else {
      if (updateAfterTransfer) {
        router.go(0)
      }
      console.log('Запрос прошёл успешно')
    }
    console.log(response)

    return response
  } catch (error) {
    console.error('Произошла ошибки при переносе урока', error)
  }
}
export async function setOneTimeLesson(data) {
  try {
    const requestData = data.requestBody || data
    const response = await fetch(`${domain}/api/lesson-one-time`, {
      method: 'POST',
      credentials: 'include', // ВАЖНО
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonOrder.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    } else {
      router.go(0)
    }

    return response
  } catch (error) {
    console.error('Произошла ошибки при добавлении одноразового урока', error)
  }
}

export async function setTrialLesson(data) {
  try {
    const requestData = data.requestBody || data
    const response = await fetch(`${domain}/api/lesson-trial`, {
      method: 'POST',
      credentials: 'include', // ВАЖНО
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonOrder.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    } else {
      router.go(0)
    }

    return response
  } catch (error) {
    console.error('Произошла ошибки при добавлении одноразового урока', error)
  }
}

export async function setStableLesson(data) {
  console.log(jsonOrder.stringify(data))

  try {
    const response = await fetch(`${domain}/api/lessons`, {
      method: 'POST',
      credentials: 'include', // ВАЖНО
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonOrder.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    } else {
      router.go(0)
    }

    return response
  } catch (error) {
    console.error('Произошла ошибки при создании постоянного урока', error)
  }
}

export async function getLessonsOnDay(date) {
  try {
    const response = await fetch(`${domain}/api/lessons/day?date=${date}`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при переносе урока', error)
  }
}

export async function getMyLessons(date) {
  try {
    const response = await fetch(`${domain}/api/lessons/day?date=${date}`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при переносе урока', error)
  }
}

export async function getMyStudents() {
  try {
    const response = await fetch(`${domain}/api/all-students-in-teacher`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при переносе урока', error)
  }
}

export async function getRule(student_id) {
  try {
    const response = await fetch(`${domain}/api/lessons/get-rule/${student_id}/`, {
      method: 'GET',
      credentials: 'include', // ВАЖНО
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    }
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Произошла ошибки при получении правила урока', error)
  }
}

export async function editRule(data) {
  console.log(jsonOrder.stringify(data))
  try {
    const response = await fetch(`${domain}/api/edit-rule`, {
      method: 'PUT',
      credentials: 'include', // ВАЖНО
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonOrder.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Код ошибки при запросе: ${response.status}`)
    } else {
      router.go(0)
    }

    return response
  } catch (error) {
    console.error('Произошла ошибки при переносе урока', error)
  }
}
