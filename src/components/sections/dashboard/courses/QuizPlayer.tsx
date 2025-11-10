'use client';

import { useState } from 'react';
import { QuestionDto, QuizDto } from '@/types/Quiz';
import { PlatformConfig } from '@/types/platformConfig';

interface QuizPlayerProps {
  quizContent: QuizDto;
  config: PlatformConfig;
  onComplete?: (result: QuizResult) => void;
}

export interface QuizResult {
  correctCount: number;
  total: number;
  scorePercent: number;
  details: { question: string; correct: boolean }[];
}

export default function QuizPlayer({
  quizContent,
  config,
  onComplete,
}: QuizPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | string[] | null)[]>(
    Array(quizContent.questions.length).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const question = quizContent.questions[currentQuestion];

  const handleAnswer = (answer: string | string[]) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizContent.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    const details = quizContent.questions.map((q, i) => {
      const correct = checkAnswer(q, answers[i]);
      if (correct) correctCount++;
      return { question: q.question, correct };
    });

    const result: QuizResult = {
      correctCount,
      total: quizContent.questions.length,
      scorePercent: Math.round(
        (correctCount / quizContent.questions.length) * 100
      ),
      details,
    };

    setIsCompleted(true);
    onComplete?.(result);
  };

  const resetQuiz = () => {
    setAnswers(Array(quizContent.questions.length).fill(null));
    setCurrentQuestion(0);
    setIsCompleted(false);
  };

  const checkAnswer = (q: QuestionDto, given: any) => {
    if (q.answerSelectionType === 'single') {
      const correctIndex = Number(q.correctAnswer);
      const correctValue = q.answers[correctIndex];
      return given === correctValue;
    } else if (q.answerSelectionType === 'multiple') {
      const correctIndexes = Array.isArray(q.correctAnswer)
        ? q.correctAnswer.map(Number)
        : [];
      const correctValues = correctIndexes.map((i) => q.answers[i]).sort();
      const givenValues = Array.isArray(given) ? given.sort() : [];
      return JSON.stringify(correctValues) === JSON.stringify(givenValues);
    }
    return false;
  };

  if (isCompleted) {
    const correctCount = answers.reduce(
      (acc, ans, i) =>
        acc + (checkAnswer(quizContent.questions[i], ans) ? 1 : 0),
      0
    );
    const total = quizContent.questions.length;
    const percent = Math.round((correctCount / total) * 100);

    return (
      <div
        className="p-8 rounded-lg"
        style={{
          backgroundColor: config.colors.background,
          color: config.colors.textPrimary,
        }}
      >
        <h1 className="text-3xl font-bold mb-4">{quizContent.quizTitle}</h1>
        <p className="text-lg mb-6">
          Your score: {correctCount}/{total} ({percent}%)
        </p>

        <ul className="space-y-3 mb-8">
          {quizContent.questions.map((q, i) => {
            const correct = checkAnswer(q, answers[i]);
            return (
              <li key={i}>
                <span
                  className={
                    correct ? 'text-green-600 font-semibold' : 'text-red-600'
                  }
                >
                  {correct ? '✓' : '✗'} {q.question}
                </span>
              </li>
            );
          })}
        </ul>

        <button
          onClick={resetQuiz}
          className="px-6 py-2 rounded-lg font-semibold"
          style={{
            backgroundColor: config.colors.primary,
            color: config.colors.textOnPrimary,
          }}
        >
          Reset quiz
        </button>
      </div>
    );
  }

  return (
    <div
      className="p-8 rounded-lg"
      style={{
        backgroundColor: config.colors.background,
        color: config.colors.textPrimary,
      }}
    >
      <h1 className="text-3xl font-bold mb-4">{quizContent.quizTitle}</h1>

      {quizContent.quizSynopsis && (
        <p
          className="text-lg mb-6"
          style={{ color: config.colors.textSecondary }}
        >
          {quizContent.quizSynopsis}
        </p>
      )}

      <div className="mb-4">
        <p className="font-semibold mb-3">
          {currentQuestion + 1}. {question.question}
        </p>

        <div className="space-y-2">
          {question.answers.map((answer, idx) => {
            const isMultiple = question.answerSelectionType === 'multiple';
            const selected = answers[currentQuestion];
            const isChecked = isMultiple
              ? Array.isArray(selected) && selected.includes(answer)
              : selected === answer;

            const handleChange = () => {
              if (isMultiple) {
                const arr = Array.isArray(selected) ? [...selected] : [];
                if (arr.includes(answer)) {
                  handleAnswer(arr.filter((a) => a !== answer));
                } else {
                  handleAnswer([...arr, answer]);
                }
              } else {
                handleAnswer(answer);
              }
            };

            return (
              <label key={idx} className="block cursor-pointer">
                <input
                  type={isMultiple ? 'checkbox' : 'radio'}
                  name={`question-${currentQuestion}`}
                  value={answer}
                  checked={isChecked}
                  onChange={handleChange}
                  className="mr-2"
                />
                {answer}
              </label>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={answers[currentQuestion] === null}
        className="mt-4 px-6 py-2 rounded-lg font-semibold"
        style={{
          backgroundColor: config.colors.primary,
          color: config.colors.textOnPrimary,
          opacity: answers[currentQuestion] === null ? 0.5 : 1,
        }}
      >
        {currentQuestion < quizContent.questions.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
}
