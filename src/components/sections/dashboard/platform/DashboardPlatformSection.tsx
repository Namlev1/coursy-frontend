'use client';

import CreatePlatformWidget from './CreatePlatformWidget';
import YourPlatformsWidget from './YourPlatformsWidget';
import React from 'react';
import SubscriptionPlanSection from '@/components/sections/dashboard/home/SubscriptionPlanSection';

const mockPlatforms = [
  { id: '1', name: 'Innovate & Learn' },
  { id: '2', name: 'Marketing Masters' },
  { id: '3', name: 'Sales Academy' },
];

interface DashboardPlatformSectionProps {
  platforms?: Array<{ id: string; name: string }>;
  subscriptionWidget?: React.ReactNode;
}

export default function DashboardPlatformSection({
  platforms = mockPlatforms,
}: DashboardPlatformSectionProps) {
  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column - Create Platform Widget */}
          <div className="lg:col-span-2">
            <CreatePlatformWidget />
          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Your Platforms Widget */}
              <YourPlatformsWidget platforms={platforms} />

              <SubscriptionPlanSection planName={'Enterprise'} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
