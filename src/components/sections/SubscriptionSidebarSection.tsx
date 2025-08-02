import React from 'react';

interface SubscriptionInfo {
  planName: string;
  platformsUsed: number;
  platformsLimit: number;
  usagePercentage: number;
}

interface SubscriptionSidebarSectionProps {
  subscription: SubscriptionInfo;
  theme: any;
}

export default function SubscriptionSidebarSection({
  subscription,
  theme,
}: SubscriptionSidebarSectionProps) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Subscription Plan Card */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h4 className="text-base font-semibold text-gray-900">
          Subscription Plan
        </h4>
        <p className="mt-1 text-sm text-gray-600">
          You are on the{' '}
          <span className="font-semibold text-gray-800">
            {subscription.planName}
          </span>
          .
        </p>
        <div className="mt-4 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full"
            style={{
              backgroundColor: theme.colors.primary,
              width: `${subscription.usagePercentage}%`,
            }}
          ></div>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {subscription.platformsUsed} of {subscription.platformsLimit}{' '}
          platforms used.
        </p>
        <button
          className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm hover:opacity-80"
          style={{
            borderColor: theme.colors.primary,
            color: theme.colors.primary,
            backgroundColor: 'white',
          }}
        >
          Manage Subscription
        </button>
      </div>

      {/* Support Card */}
      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: `${theme.colors.primary}15` }}
      >
        <h4 className="text-base font-semibold text-gray-900">Need Help?</h4>
        <p className="mt-1 text-sm text-gray-600">
          Our support team is here to assist you.
        </p>
        <button
          className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}