import { UUID } from 'node:crypto';

export interface QuizDto {
  quizTitle: string;
  quizSynopsis: string | null;
  nrOfQuestions: string; // String, bo komponent tego oczekuje
  questions: QuestionDto[];
  position?: number;
  course: UUID;
  id?: UUID;
}

export interface QuestionDto {
  question: string;
  questionType?: string; // Optional with default "text"
  answerSelectionType: 'single' | 'multiple';
  answers: string[];
  correctAnswer: string | number[]; // String for single, number[] for multiple
  messageForCorrectAnswer?: string;
  messageForIncorrectAnswer?: string;
  explanation?: string | null;
  point?: string;
}
