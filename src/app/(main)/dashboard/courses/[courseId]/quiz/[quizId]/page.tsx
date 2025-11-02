import { UUID } from 'node:crypto';
import { getCachedConfig } from '@/lib/configCache';
import { fetchQuiz } from '@/lib/apiClient/requests/quiz';
import UpdateQuizForm from '@/components/sections/dashboard/courses/quiz/UpdateQuizForm';

interface ManageQuizPageProps {
  params: {
    courseId: string;
    quizId: UUID;
  };
}

export default async function ManageQuizPage({
  params: { quizId },
}: ManageQuizPageProps) {
  const quiz = await fetchQuiz(quizId);
  const config = await getCachedConfig();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <div className="mx-auto w-full">
          <div className="flex items-center justify-center min-h-full w-full">
            <div className="w-full max-w-2xl px-4 py-8">
              <div
                className="rounded-lg shadow-lg p-8"
                style={{ backgroundColor: config.colors.background }}
              >
                <UpdateQuizForm quizDto={quiz} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
