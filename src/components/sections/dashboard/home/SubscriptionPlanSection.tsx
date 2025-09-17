import React from 'react';
import { PlatformConfig } from '@/types/platformConfig';

interface SubscriptionPlanProps {
  planName: string;
  config: PlatformConfig;
}

export default function SubscriptionPlanSection({
  planName,
  config,
}: SubscriptionPlanProps) {
  const usagePercentage = 75;
  console.log(config.colors);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h4 className="text-base font-semibold text-gray-900">
        Subscription Plan
      </h4>
      <p className="mt-1 text-sm text-gray-600">
        You are on the{' '}
        <span className="font-semibold text-gray-800">{planName}</span>.
      </p>
      <div className="mt-4 h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${usagePercentage}%`,
            // backgroundColor: config.colors.primary,
          }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">3 of 4 platforms used.</p>
      <button
        // onClick={onManageSubscription}
        className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        style={{
          // borderColor: config.colors.primary,
          // color: config.colors.primary,
          backgroundColor: 'white',
        }}
        // onMouseEnter={(e) => {
        //   e.currentTarget.style.backgroundColor = `${theme.colors.primary}0D`; // 5% opacity
        // }}
        // onMouseLeave={(e) => {
        //   e.currentTarget.style.backgroundColor = 'white';
        // }}
      >
        Manage Subscription
      </button>
    </div>
  );
}
