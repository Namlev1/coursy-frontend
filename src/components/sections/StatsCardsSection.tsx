import React from 'react'
import { TenantTheme } from '@/types/tenant';

interface StatCard {
  label: string
  value: string | number
}

interface StatsCardsSectionProps {
  stats: StatCard[]
  theme: TenantTheme
}

export default function StatsCardsSection({ stats, theme }: StatsCardsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200">
          <p className="text-gray-600 text-base font-medium mb-2">{stat.label}</p>
          <p className="text-gray-900 text-4xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}