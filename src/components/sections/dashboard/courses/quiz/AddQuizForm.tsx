'use client';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { useConfig } from '@/components/ConfigProvider';
import { QuizDto } from '@/types/Quiz';
import { UUID } from 'node:crypto';
import { addQuiz } from '@/lib/apiClient/requests/quiz';

const quizSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters'),
  synopsis: z.string().optional(),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, 'Question is required'),
        answerSelectionType: z.enum(['single', 'multiple']),
        answers: z
          .array(z.string().min(1, 'Answer cannot be empty'))
          .min(2, 'At least 2 answers required'),
        correctAnswers: z
          .array(z.number())
          .min(1, 'Select at least one correct answer'),
        explanation: z.string().optional(),
      })
    )
    .min(1, 'At least one question is required'),
});

type QuizFormData = z.infer<typeof quizSchema>;

export default function AddQuizForm() {
  const config = useConfig();
  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      synopsis: '',
      questions: [
        {
          question: '',
          answerSelectionType: 'single',
          answers: ['', ''],
          correctAnswers: [],
          explanation: '',
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: QuizFormData) => {
    try {
      const dto: QuizDto = {
        quizTitle: data.title,
        quizSynopsis: data.synopsis || null,
        nrOfQuestions: data.questions.length.toString(),
        questions: data.questions.map((q) => ({
          question: q.question,
          answerSelectionType: q.answerSelectionType,
          answers: q.answers,
          correctAnswer:
            q.answerSelectionType === 'single'
              ? q.correctAnswers[0].toString()
              : q.correctAnswers,
          explanation: q.explanation || null,
          point: '10',
        })),
        course: params.courseId as UUID,
      };
      await addQuiz(dto);
      router.push(`/dashboard/courses/${params.courseId}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: config.colors.textPrimary }}
      >
        Add New Quiz
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Quiz Title */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="quiz-title"
            style={{ color: config.colors.textPrimary }}
          >
            Quiz Title
          </label>
          <input
            {...register('title')}
            className="form-input w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none"
            style={
              {
                backgroundColor: config.colors.background,
                borderColor: config.colors.secondary,
                color: config.colors.textPrimary,
                '--tw-ring-color': config.colors.primary,
              } as React.CSSProperties
            }
            id="quiz-title"
            type="text"
            placeholder="e.g., Spring Boot Fundamentals Quiz"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Quiz Synopsis */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="quiz-synopsis"
            style={{ color: config.colors.textPrimary }}
          >
            Synopsis (Optional)
          </label>
          <textarea
            {...register('synopsis')}
            className="form-textarea w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none"
            style={
              {
                backgroundColor: config.colors.background,
                borderColor: config.colors.secondary,
                color: config.colors.textPrimary,
                '--tw-ring-color': config.colors.primary,
              } as React.CSSProperties
            }
            id="quiz-synopsis"
            rows={3}
            placeholder="Brief description of the quiz..."
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl font-semibold"
              style={{ color: config.colors.textPrimary }}
            >
              Questions
            </h2>
            <button
              type="button"
              onClick={() =>
                appendQuestion({
                  question: '',
                  answerSelectionType: 'single',
                  answers: ['', ''],
                  correctAnswers: [],
                  explanation: '',
                })
              }
              className="px-4 py-2 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: config.colors.primary,
                color: '#ffffff',
              }}
            >
              + Add Question
            </button>
          </div>

          {questionFields.map((field, questionIndex) => (
            <QuestionItem
              key={field.id}
              questionIndex={questionIndex}
              control={control}
              register={register}
              watch={watch}
              removeQuestion={removeQuestion}
              config={config}
              errors={errors}
              canRemove={questionFields.length > 1}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border rounded-lg font-medium transition-all"
            style={{
              borderColor: config.colors.secondary,
              color: config.colors.textPrimary,
            }}
          >
            Cancel
          </button>
          <button
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={
              {
                backgroundColor: config.colors.primary,
                color: '#ffffff',
                '--tw-ring-color': config.colors.primary,
              } as React.CSSProperties
            }
            type="submit"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </>
  );
}

function QuestionItem({
  questionIndex,
  control,
  register,
  watch,
  removeQuestion,
  config,
  errors,
  canRemove,
}: any) {
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  const answerSelectionType = watch(
    `questions.${questionIndex}.answerSelectionType`
  );
  const correctAnswers =
    watch(`questions.${questionIndex}.correctAnswers`) || [];

  const toggleCorrectAnswer = (answerIndex: number, setValue: any) => {
    if (answerSelectionType === 'single') {
      setValue(`questions.${questionIndex}.correctAnswers`, [answerIndex]);
    } else {
      const newCorrect = correctAnswers.includes(answerIndex)
        ? correctAnswers.filter((i: number) => i !== answerIndex)
        : [...correctAnswers, answerIndex];
      setValue(`questions.${questionIndex}.correctAnswers`, newCorrect);
    }
  };

  return (
    <div
      className="border rounded-lg p-6 space-y-4"
      style={{ borderColor: config.colors.secondary }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="text-lg font-medium"
          style={{ color: config.colors.textPrimary }}
        >
          Question {questionIndex + 1}
        </h3>
        {canRemove && (
          <button
            type="button"
            onClick={() => removeQuestion(questionIndex)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Remove
          </button>
        )}
      </div>

      {/* Question Text */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: config.colors.textPrimary }}
        >
          Question
        </label>
        <input
          {...register(`questions.${questionIndex}.question`)}
          className="form-input w-full border rounded-lg px-4 py-3"
          style={
            {
              backgroundColor: config.colors.background,
              borderColor: config.colors.secondary,
              color: config.colors.textPrimary,
            } as React.CSSProperties
          }
          placeholder="Enter your question..."
        />
        {errors.questions?.[questionIndex]?.question && (
          <p className="mt-1 text-sm text-red-600">
            {errors.questions[questionIndex].question.message}
          </p>
        )}
      </div>

      {/* Answer Type */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: config.colors.textPrimary }}
        >
          Answer Type
        </label>
        <select
          {...register(`questions.${questionIndex}.answerSelectionType`)}
          className="form-select w-full border rounded-lg px-4 py-3"
          style={
            {
              backgroundColor: config.colors.background,
              borderColor: config.colors.secondary,
              color: config.colors.textPrimary,
            } as React.CSSProperties
          }
        >
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
        </select>
      </div>

      {/* Answers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            className="block text-sm font-medium"
            style={{ color: config.colors.textPrimary }}
          >
            Answers
          </label>
          <button
            type="button"
            onClick={() => appendAnswer('')}
            className="text-sm font-medium"
            style={{ color: config.colors.primary }}
          >
            + Add Answer
          </button>
        </div>

        {answerFields.map((field, answerIndex) => (
          <div key={field.id} className="flex items-center gap-3">
            <Controller
              name={`questions.${questionIndex}.correctAnswers`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <input
                  type={answerSelectionType === 'single' ? 'radio' : 'checkbox'}
                  checked={correctAnswers.includes(answerIndex)}
                  onChange={() => {
                    if (answerSelectionType === 'single') {
                      onChange([answerIndex]);
                    } else {
                      const newCorrect = correctAnswers.includes(answerIndex)
                        ? correctAnswers.filter(
                            (i: number) => i !== answerIndex
                          )
                        : [...correctAnswers, answerIndex];
                      onChange(newCorrect);
                    }
                  }}
                  className="w-4 h-4"
                  style={{ accentColor: config.colors.primary }}
                />
              )}
            />
            <input
              {...register(`questions.${questionIndex}.answers.${answerIndex}`)}
              className="form-input flex-1 border rounded-lg px-4 py-2"
              style={
                {
                  backgroundColor: config.colors.background,
                  borderColor: config.colors.secondary,
                  color: config.colors.textPrimary,
                } as React.CSSProperties
              }
              placeholder={`Answer ${answerIndex + 1}`}
            />
            {answerFields.length > 2 && (
              <button
                type="button"
                onClick={() => removeAnswer(answerIndex)}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: config.colors.textPrimary }}
        >
          Explanation (Optional)
        </label>
        <textarea
          {...register(`questions.${questionIndex}.explanation`)}
          className="form-textarea w-full border rounded-lg px-4 py-3"
          style={
            {
              backgroundColor: config.colors.background,
              borderColor: config.colors.secondary,
              color: config.colors.textPrimary,
            } as React.CSSProperties
          }
          rows={2}
          placeholder="Explain why this is the correct answer..."
        />
      </div>
    </div>
  );
}
