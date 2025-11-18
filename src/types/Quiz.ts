import { UUID } from 'node:crypto';

export interface QuizDto {
  quizTitle: string;
  quizSynopsis: string | null;
  nrOfQuestions: string;
  questions: QuestionDto[];
  position?: number;
  course: UUID;
  id?: UUID;
}

export interface QuestionDto {
  question: string;
  questionType?: string;
  answerSelectionType: 'single' | 'multiple';
  answers: string[];
  correctAnswer: string | number[];
  messageForCorrectAnswer?: string;
  messageForIncorrectAnswer?: string;
  explanation?: string | null;
  point?: string;
}
