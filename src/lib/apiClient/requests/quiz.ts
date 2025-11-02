import { getApiClient } from '@/lib/apiClient/apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { QuizDto } from '@/types/Quiz';
import { UUID } from 'node:crypto';

export async function addQuiz(dto: QuizDto) {
  try {
    const client = await getApiClient();
    const response = await client.post<QuizDto>('/api/content/quiz', dto);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchQuiz(quizId: UUID) {
  try {
    const client = await getApiClient();
    const response = await client.get<QuizDto>(`/api/content/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updateQuiz(dto: QuizDto) {
  try {
    const client = await getApiClient();
    const response = await client.put<QuizDto>(`/api/content/quiz`, dto);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
