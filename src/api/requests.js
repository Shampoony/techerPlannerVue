const domain_prod = 'https://api.teacherplanner.ru'
const domain_test = 'https://test-api.teacherplanner.ru'
const domain = domain_test
import router from '@/router'
import jsonOrder from 'json-order'

// Общая функция для выполнения запросов
async function makeRequest(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-store', // <-- добавляем запрет кэширования прямо в запросе
      },

    }

    if (body) {
      options.headers['Content-Type'] = 'application/json'
      options.body =
        method === 'POST' || method === 'PUT' ? jsonOrder.stringify(body) : JSON.stringify(body)
    }

    const response = await fetch(`${domain}${endpoint}`, options)

    if (!response.ok) {
      const errorCode = response.status
      if(response.status >= 500) {
        if (import.meta.env.PROD) {
          router.push({name: 'error_500'})
          console.log('Перенаправление')
        }
      }


      console.error(`API Error: ${errorCode}`)
      throw new Error(`Код ошибки при запросе: ${errorCode}`)
    }

    return method === 'GET' ? await response.json() : response
  } catch (error) {
    if (import.meta.env.PROD) {
      router.push({name: 'error_500'})
      console.log('Перенаправление')
    }
    console.error(`Произошла ошибка при ${method}-запросе ${endpoint}:`)

    throw error
  }
}

// Существующий метод GET оставляем для обратной совместимости
async function makeGetRequest(endpoint) {
  return makeRequest(endpoint, 'GET')
}

/*=================================================================== Ученики =============================================================== */

export async function getStudentFutureLessons(student_id, page, page_size) {
  try {
    return await makeGetRequest(`/api/student-future-lessons?student_id=${student_id}&page=${page}&page_size=${page_size}`)
  } catch(error) {
    console.error('Произошла ошибка при получении будущих уркоов ученика', error)
  }
}


export async function getStudentLastLessons(student_id, page, page_size) {
  try {
    return await makeGetRequest(`/api/student-last-lessons?student_id=${student_id}&page=${page}&page_size=${page_size}`)
  } catch(error) {
    console.error('Произошла ошибка при получении предыдущих уроков ученика', error)
  }
}

export async function getStudentAnalytics(student_id) {
  try {
    return await makeRequest(`/api/analutics-student/${student_id}`)
  } catch (error) {
    console.error('Произошла ошибка при получении данных для аналитики ученика', error)
  }
}

export async function getStudentById(student_id) {
  try {
    return await makeRequest(`/api/student-profile/${student_id}`)
  } catch (error) {
    console.error('Произошла ошиббка при получении профиля ученика', error)
  }
}


export async function getArchivedStudents() {
  try {
    return await makeGetRequest(`/api/all-students-archive-teachers`)
  } catch (error) {
    console.error('Произошла ошибка при получении учеников из архива', error)
  }
}

export async function getTypesConnect() {
  try {
    return await makeGetRequest('/api/type-connects')
  } catch(error) {
    console.error('Произошла ошибка при получении типов связи', error)
  }
}

export async function toggleStudentArchive(student_id) {
  try {
    return await makeRequest(`/api/toggle-student-archive/${student_id}`, 'POST')
  } catch (error) {
    console.error('Произошла ошибка при добавлении/удалении ученика из архива', error)
  }
}

export async function setStudentProfile(student_profile) {
  try {
    return await makeRequest('/api/student-create', 'PSOT', student_profile)
  } catch (error) {
    console.error('Произошла ошибка при соаздании профиля студента', error)
  }
}

export async function setResult(request_body) {
  try {
    return await makeRequest(`/api/results`, 'POST', request_body)
  } catch (error) {
    console.error('Произошла ошибка при добавлении результата ученика', error)
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

export async function getTeacherOperations() {
  try {
    return await makeGetRequest('/api/operations')
  }catch (error) {
    console.error('Произошла ошибка при получении информации об операциях учителя', error)
  }
}

export async function getTeacherExpenses () {
  try {
    return await makeGetRequest('/api/expenditures')
  } catch(error) {
    console.error('Произошла ошибка при получении расходов учителя', error)
  }
}

export async function getTeacherIncome() {
  try {
    return await makeGetRequest('/api/incomes')
  } catch(error) {
    console.error('Произошла ошибка при получении доходов учителей', error)
  }
}

export async function deleteTeacherOperations(payment_id) {
  try {
    return await makeRequest(`/api/payments/${payment_id}`, 'DELETE')
  } catch (error) {
    console.error('Произошла ошибка при получении информации об операциях учителя', error)
  }
}

export async function setIncome(requestBody) {
  try {
    return await makeRequest('/api/income', 'POST', requestBody)
  } catch (error) {
    console.error('Произошла ошибка при добавлении дохода учителя', error)
  }
}

export async function setExpense(requestBody) {
  try {
    return await makeRequest('/api/expenditures', 'POST', requestBody)
  } catch(error) {
    console.error('Произошла ошибка при добавлении расхода учителя', error)
  }
}

export async function setPayment(requestBody) {
  try {
     const response = await makeRequest('/api/payments', 'POST', requestBody)
      if(response.ok) {
        router.go(0)
      }
      return response
  } catch(error) {
    console.error('Произошла ошибка при добавлении оплаты', error)
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

export async function getTodayLessons() {
  try {
    return await makeRequest('/api/today-lessons')
  } catch (error) {
    console.error('Произошла ошибка при получении уроков на сегодня', error)
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
    return await makeGetRequest('/api/all-students-teachers')
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

/* Пробелмы предыдущего занятяи */

export async function getPreviousProblems(lesson_id) {
  try {
    return await makeGetRequest(`/api/lesson-last-problems/${lesson_id}`)
  } catch (error) {
    console.error('Произошла ошибка при получении списка проблем прошлого занятия', error)
  }
}

/* Проблемы занятия */

export async function getLessonProblems(lesson_id) {
  try {
    return await makeGetRequest(`/api/lesson-problems/${lesson_id}`)
  } catch (error) {
    console.error('Произошла ошибка при получении списка проблем урока')
  }
}

export async function setLessonProblems(data) {
  try {
    return await makeRequest(`/api/create-lesson-problems`, 'POST', data)
  } catch (error) {
    console.error('Произошла ошибка при создании проблем урока', error)
  }
}

export async function deleteLessonProblem(problem_id) {
  try {
    return await makeRequest(`/api/delete-problem/${problem_id}`, 'DELETE')
  } catch (error) {
    console.error('Произошла ошибка при удалении проблемы', error)
  }
}

export async function cancelLesson(lesson_data) {
  try {
    return await makeRequest(`/api/cancel-lesson`, 'POST', lesson_data)
  } catch (error) {
    console.error('Произошла ошибка при удалении проблемы', error)
  }
}

export async function deleteRuleLessons(student_id)  {
  try {
    return await makeRequest(`/api/delete-student-rule-lessons/${student_id}`, 'DELETE')
  } catch (error) {
    console.error('Произошла ошибка при удалении уроков в правиле', error)
  }
}

/* Домашние задания */

export async function getLessonHomeWork(lesson_id) {
  try {
    return await makeGetRequest(`/api/lesson-homework/${lesson_id}`)
  } catch (error) {
    console.error('Произошла ошибка при получении списка домашних заданий урока', error)
  }
}

export async function setLessonHomeWork(data) {
  try {
    return await makeRequest(`/api/create-homework`, 'POST', data)
  } catch (error) {
    console.error('Произошла ошибка при создании домашнего задания урока', error)
  }
}

export async function deleteLessonHomework(homework_id) {
  try {
    return await makeRequest(`/api/delete-homework/${homework_id}`, 'DELETE')
  } catch (error) {
    console.error('Произошла ошибка при удалении домашнего задания', error)
  }
}

/* Темы занятия */

export async function getLessonTopics(lesson_id) {
  try {
    return await makeGetRequest(`/api/lesson-topics/${lesson_id}`)
  } catch (error) {
    console.error('Произошла ошибка при получении списка тем урока', error)
  }
}

export async function getAllStudents() {
  try {
    return await makeRequest('/api/all-students-teachers')
  } catch (error) {
    console.error('Произошла ошибка получения всех учеников для учителя', error)
  }
}

export async function setLessonTopics(data) {
  try {
    return await makeRequest(`/api/create-topic`, 'POST', data)
  } catch (error) {
    console.error('Произошла ошибка при создании проблем урока', error)
  }
}

export async function deleteLessonTopic(topic_id) {
  try {
    return await makeRequest(`/api/delete-topic/${topic_id}`, 'DELETE')
  } catch (error) {
    console.error('Произошла ошибка при удалении проблемы', error)
  }
}

/*=================================================================== Остальные методы с использованием общей функции =============================================================== */
export async function deleteLessonById(lesson_id) {
  try {
    await makeRequest(`/api/lessons/${lesson_id}`, 'DELETE')
    router.go(0)
  } catch (error) {
    console.error('Произошла ошибки при удалении урока', error)
  }
}

export async function getTeacherTasks() {
  try {
    await makeRequest(`/api/teacher-tasks`, 'GET')
  } catch (error) {
    console.error('Произошла ошибки при получении заданий учителя', error)
  }
}

export async function setTeacherTasks(data) {
  try {
    makeRequest(`/api/add-task-teacher`, 'POST', data)
  } catch (error) {
    console.error('Произошла ошибки при создании задач учителя', error)
  }
}
export async function transferLesson(lesson_id, data, updateAfterTransfer = false) {
  try {
    const response = await makeRequest(`/api/lessons/${lesson_id}`, 'PUT', data)
   /*  if (updateAfterTransfer) {
      router.go(0)
    } */
    console.log('Запрос прошёл успешно')
    return response
  } catch (error) {
    console.error('Произошла ошибки при переносе урока', error)
  }
}

export async function setTopic(data) {
  try {
    const response = await makeRequest('/api/create-topic/', 'POST', data)
    console.log('Запрос прошёл успешно')
    return response
  } catch (error) {
    console.error('Произошла ошибки при создании темы', error)
  }
}

export async function setOneTimeLesson(data) {
  try {
    const requestData = data
    const response = await makeRequest('/api/lesson-one-time', 'POST', requestData)
    router.go(0)
    return response
  } catch (error) {
    console.error('Произошла ошибки при добавлении одноразового урока', error)
  }
}

export async function setTrialLesson(data) {
  try {
    const requestData = data.requestBody || data
    const response = await makeRequest('/api/lesson-trial', 'POST', requestData)
    router.go(0)
    return response
  } catch (error) {
    console.error('Произошла ошибки при добавлении одноразового урока', error)
  }
}

export async function setStableLesson(data) {
  try {
    const response = await makeRequest('/api/lessons', 'POST', data)
    router.go(0)
    return response
  } catch (error) {
    console.error('Произошла ошибки при создании постоянного урока', error)
  }
}

export async function editRule(data) {
  try {
    const response = await makeRequest('/api/edit-rule', 'PUT', data)
    router.go(0)
    return response
  } catch (error) {
    console.error('Произошла ошибки при переносе урока', error)
  }
}

/*=================================================================== Финансы =============================================================== */

export async function getEarningsForDay() {
  try {
    return await makeGetRequest(`/api/earned-for-today`)
  } catch (error) {
    console.error('Произошла ошибка при получении зарабтка учителя за день', error)
  }
}


export async function getEarningsForPeriod(startDate, endDate) {
  try {
    return await makeGetRequest(`/api/earned-for-period?start_date=${startDate}&end_date=${endDate}`)
  } catch (error) {
    console.error('Произошла ошибка при получении зарабтка учителя за промежуток', error)
  }
}


export async function getMonthlyEarnings(year) {
  try {
    return await makeGetRequest(`/api/monthly-earnings?year=${year}`)
  } catch (error) {
    console.error('Произошла ошибка при получении зарабтка учителя за год по месяцам', error)
  }
}


export async function getEarningsForYear(year) {
  try {
    return await makeGetRequest(`/api/total-earnings?year=${year}`)
  } catch (error) {
    console.error('Произошла ошибка при получении зарабтка учителя за год', error)
  }
}

export async function getDailyEarnings(startDate, endDate) {
  try {
    return await makeGetRequest(`/api/daily-earnings?startDate=${startDate}&endDate=${endDate}`)
  } catch (error) {
    console.error('Произошла ошибка при получении зарабтка учителя за промежуток по дням', error)
  }
}

export async function getStudentsEarnings() {
  try {
    return await makeGetRequest(`/api/students-earnings`)
  } catch (error) {
    console.error('Произошла ошибка при получении зарабтка учителя поу ученикам', error)
  }
}


export async function getStudentEarning (student_id, start_date, end_date) {
  try {
    return await makeGetRequest(`/api/student-earnings?student_id=${student_id}&start_date=${start_date}&end_date=${end_date}`)
  } catch (error) {
    console.error('Произошла ошибка при получении зарабтка учителя поу ученикам', error)
  }
}
