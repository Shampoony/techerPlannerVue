const domain_prod = 'https://api.teacherplanner.ru'
const domain_test = 'https://test-api.teacherplanner.ru'

const domain = domain_test
import router from '@/router'
import jsonOrder from 'json-order'

async function makeGetRequest(endpoint) {
  try {
    const response = await fetch(`${domain}${endpoint}`, {
      method: 'GET',
      credentials: 'include', // Important for all requests
    })

    if (!response.ok) {
      const errorCode = response.status
      console.error(`API Error: ${errorCode}`)
      throw new Error(`Код ошибки при запросе: ${errorCode}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Произошла ошибка при GET-запросе ${endpoint}:`, error)
    throw error
  }
}

/*=================================================================== Учителя =============================================================== */

export async function getTeacherById(teacherId) {
  try {
    return await makeGetRequest(`/api/teachers/${teacherId}`)
  } catch (error) {
    console.error('Произошла ошибка при получении учителя', error)
  }
}

export async function getMyInfo() {
  try {
    return await makeGetRequest('/api/get-me-info')
  } catch (error) {
    console.error('Произошла ошибка при получении информации об учителе', error)
  }
}

/*=================================================================== Уроки =============================================================== */

export async function getWeeks() {
  try {
    return await makeGetRequest('/api/weeks')
  } catch (error) {
    console.error('Произошла ошибка при получении недель', error)
  }
}

export async function getLessonsOnMonth(year, month) {
  try {
    return await makeGetRequest(`/api/lessons/${year}/${month}`)
  } catch (error) {
    console.error('Произошла ошибка при получении уроков учителя на месяц', error)
  }
}

export async function getLessonsOnWeek(startDate) {
  try {
    return await makeGetRequest(`/api/lessons/week/${startDate}`)
  } catch (error) {
    console.error('Произошла ошибка при получении уроков учителя на неделю', error)
  }
}

export async function getLessonsOnDay(date) {
  try {
    return await makeGetRequest(`/api/lessons/day?date=${date}`)
  } catch (error) {
    console.error('Произошла ошибка при получении уроков на день', error)
  }
}

export async function getMyLessons(date) {
  try {
    return await makeGetRequest(`/api/lessons/day?date=${date}`)
  } catch (error) {
    console.error('Произошла ошибка при получении моих уроков', error)
  }
}

export async function getMyStudents() {
  try {
    return await makeGetRequest('/api/all-students-in-teacher')
  } catch (error) {
    console.error('Произошла ошибка при получении списка моих студентов', error)
  }
}

export async function getRule(student_id) {
  try {
    return await makeGetRequest(`/api/lessons/get-rule/${student_id}/`)
  } catch (error) {
    console.error('Произошла ошибка при получении правила урока', error)
  }
}

export async function getLessonById(id) {
  try {
    return await makeGetRequest(`/api/lesson/${id}`)
  } catch (error) {
    console.error('Произошла ошибка при получении списка текущих уроков', error)
  }
}

export async function getCurrentLessons() {
  try {
    return await makeGetRequest('/api/current-lessons')
  } catch (error) {
    console.error('Произошла ошибка при получении списка текущих уроков', error)
  }
}

/*=================================================================== Остальные методы без изменений =============================================================== */

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

export async function editRule(data) {
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
