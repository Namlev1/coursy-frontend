'use client';

import CreatePlatformWidget from './CreatePlatformWidget';
import YourPlatformsWidget from './YourPlatformsWidget';
import React from 'react';

// Mock data - replace with your actual data
const mockPlatforms = [
  { id: '1', name: 'Innovate & Learn' },
  { id: '2', name: 'Marketing Masters' },
  { id: '3', name: 'Sales Academy' },
];

interface DashboardPlatformSectionProps {
  // You can add props here for data, handlers, etc.
  platforms?: Array<{ id: string; name: string }>;
  onCreatePlatform?: (data: any) => void;
  onManagePlatform?: (platformId: string) => void;
  onManageSubscription?: () => void;
  subscriptionWidget?: React.ReactNode;
  dashboardHeader?: React.ReactNode;
}

export default function DashboardPlatformSection({
  platforms = mockPlatforms,
  onCreatePlatform,
  onManagePlatform,
  onManageSubscription,
  subscriptionWidget,
  dashboardHeader,
}: DashboardPlatformSectionProps) {
  const handlePlatformSubmit = (data: any) => {
    console.log('Platform created:', data);
    onCreatePlatform?.(data);
  };

  const handlePlatformManage = (platformId: string) => {
    console.log('Manage platform:', platformId);
    onManagePlatform?.(platformId);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column - Create Platform Widget */}
          <div className="lg:col-span-2">
            <CreatePlatformWidget
              onSubmit={handlePlatformSubmit}
              onCancel={handleCancel}
            />
          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Your Platforms Widget */}
              <YourPlatformsWidget
                platforms={platforms}
                onManagePlatform={handlePlatformManage}
              />

              {/* Subscription Widget (if provided) */}
              {subscriptionWidget && <div>{subscriptionWidget}</div>}

              {/* Default Subscription Widget (if no custom one provided) */}
              {!subscriptionWidget && (
                <div className="rounded-lg bg-white p-6 shadow">
                  <h4 className="text-base font-semibold text-gray-900">
                    Subscription Plan
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    You are on the{' '}
                    <span className="font-semibold text-gray-800">
                      Enterprise Plan
                    </span>
                    .
                  </p>
                  <div className="mt-4 h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {platforms.length} of 4 platforms used.
                  </p>
                  <button
                    onClick={onManageSubscription}
                    className="mt-4 w-full rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
                  >
                    Manage Subscription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
