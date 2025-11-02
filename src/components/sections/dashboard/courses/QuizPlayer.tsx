'use client';
import React from 'react';
import { PlatformConfig } from '@/types/platformConfig';
import { QuizDto } from '@/types/Quiz';

interface QuizPlayerProps {
  quiz: QuizDto;
  config: PlatformConfig;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, config }) => {
  return <p>{quiz.quizTitle}</p>;
};

export default QuizPlayer;
