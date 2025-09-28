import AddVideoForm from '@/components/sections/dashboard/courses/AddVideoForm';

export default async function AddVideoPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <div className="mx-auto w-full">
          <AddVideoForm />
        </div>
      </div>
    </div>
  );
}
