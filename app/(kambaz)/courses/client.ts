import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`,
  );
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module,
  );
  return response.data;
};
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`,
  );
  return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`,
  );
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`,
  );
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course,
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module,
  );
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment,
  );
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment,
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};

export const findUsersForCourse = async (courseId: string) => {
 const response = await axios.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
};

export const deleteQuiz = async (quizId: string) => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/quizzes/${quizId}/questions`);
  return data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.post(`${HTTP_SERVER}/api/quizzes/${quizId}/questions`, question);
  return data;
};

export const updateQuestion = async (question: any) => {
  await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
};

export const deleteQuestion = async (questionId: string) => {
  await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
};

export const submitAttempt = async (quizId: string, answers: any, score: number) => {
  const { data } = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts`,
    { answers, score }
  );
  return data;
};

export const getLastAttempt = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts/last`
  );
  return data;
};

export const getAttemptCount = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts/count`
  );
  return data;
};