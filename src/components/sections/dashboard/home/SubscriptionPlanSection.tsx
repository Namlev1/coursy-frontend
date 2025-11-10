import React from 'react';
import { getUserPlatforms } from '@/lib/apiClient';

interface SubscriptionPlanProps {
  planName: string;
}

export default async function SubscriptionPlanSection({
  planName,
}: SubscriptionPlanProps) {
  const platforms = await getUserPlatforms();
  const usagePercentage = (platforms.length / 4) * 100;
  // const [platforms, setPlatforms] = React.useState<PlatformResponse[]>([]);
  //
  // useEffect(() => {
  //   const fetchPlatforms = async () => {
  //     const response = await getUserPlatforms()
  //     setPlatforms(response)
  //   }
  //   fetchPlatforms();
  // }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h4 className="text-base font-semibold text-gray-900">
        Subscription Plan
      </h4>
      <p className="mt-1 text-sm text-gray-600">
        You are on the {planName} plan
      </p>
      <div className="mt-4 h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${usagePercentage}%`,
            backgroundColor: '#0d7ef3',
          }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {platforms.length} of 4 platforms used.
      </p>
      <button
        className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        style={{
          backgroundColor: 'white',
        }}
        disabled
      >
        Manage Subscription
      </button>
    </div>
  );
}
