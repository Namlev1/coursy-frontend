import React from 'react';
import { TenantTheme } from '@/types/tenant';

interface AnalyticsCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  chartType: 'line' | 'bar';
  chartData?: any;
}

interface AnalyticsGridSectionProps {
  title: string;
  analytics: AnalyticsCard[];
  theme: TenantTheme;
}

export default function AnalyticsGridSection({
  title,
  analytics,
  theme,
}: AnalyticsGridSectionProps) {
  const getChangeIcon = () => (
    <svg
      fill="currentColor"
      height="16"
      viewBox="0 0 256 256"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
  );

  const LineChart = () => (
    <div className="h-48">
      <svg
        fill="none"
        height="100%"
        preserveAspectRatio="none"
        viewBox="-3 0 478 150"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
          fill={`url(#paint0_linear_${theme.colors.primary})`}
        ></path>
        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
          stroke={theme.colors.primary}
          strokeLinecap="round"
          strokeWidth="3"
        ></path>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`paint0_linear_${theme.colors.primary}`}
            x1="236"
            x2="236"
            y1="1"
            y2="149"
          >
            <stop stopColor={theme.colors.primary} stopOpacity="0.2"></stop>
            <stop
              offset="1"
              stopColor={theme.colors.primary}
              stopOpacity="0"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  const BarChart = () => (
    <>
      <div className="h-48 grid grid-flow-col gap-6 items-end justify-items-center">
        <div
          className="w-full rounded-t-lg"
          style={{
            height: '50%',
            backgroundColor: `${theme.colors.primary}33`,
          }}
        ></div>
        <div
          className="w-full rounded-t-lg"
          style={{
            height: '90%',
            backgroundColor: `${theme.colors.primary}33`,
          }}
        ></div>
        <div
          className="w-full rounded-t-lg"
          style={{
            height: '70%',
            backgroundColor: `${theme.colors.primary}33`,
          }}
        ></div>
        <div
          className="w-full rounded-t-lg"
          style={{
            height: '55%',
            backgroundColor: `${theme.colors.primary}33`,
          }}
        ></div>
      </div>
      <div className="grid grid-flow-col gap-6 justify-items-center mt-2">
        <p className="text-gray-500 text-xs font-medium">Course A</p>
        <p className="text-gray-500 text-xs font-medium">Course B</p>
        <p className="text-gray-500 text-xs font-medium">Course C</p>
        <p className="text-gray-500 text-xs font-medium">Course D</p>
      </div>
    </>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analytics.map((analytic, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-base font-medium">
                  {analytic.title}
                </p>
                <p className="text-gray-900 text-3xl font-bold mt-1">
                  {analytic.value}
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                {getChangeIcon()}
                <span className="text-sm font-semibold">{analytic.change}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-1 mb-4">vs last 30 days</p>
            {analytic.chartType === 'line' ? <LineChart /> : <BarChart />}
          </div>
        ))}
      </div>
    </div>
  );
}
