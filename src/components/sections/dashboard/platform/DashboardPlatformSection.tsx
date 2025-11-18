import CreatePlatformWidget from './CreatePlatformWidget';
import YourPlatformsWidget from './YourPlatformsWidget';
import React from 'react';
import SubscriptionPlanSection from '@/components/sections/dashboard/home/SubscriptionPlanSection';
import { getUserPlatforms } from '@/lib/apiClient';

export default async function DashboardPlatformSection() {
  const platforms = await getUserPlatforms();
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
              <YourPlatformsWidget platforms={platforms} />

              <SubscriptionPlanSection planName={'Enterprise'} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
