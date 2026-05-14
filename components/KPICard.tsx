'use client';

import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  borderColor?: 'red' | 'green' | 'yellow' | 'default';
  valueColor?: 'red' | 'green' | 'yellow' | 'default';
  bgTint?: 'red' | 'green' | 'yellow' | 'default';
}

export function KPICard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  borderColor = 'default',
  valueColor = 'default',
  bgTint = 'default',
}: KPICardProps) {
  // Map color names to Tailwind classes
  const borderColorMap = {
    red: 'border-red-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
    default: 'border-[#E5E7EB]',
  };

  const valueColorMap = {
    red: 'text-red-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    default: 'text-[#111827]',
  };

  const bgTintMap = {
    red: 'bg-red-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    default: 'bg-white',
  };

  return (
    <div
      className={`${bgTintMap[bgTint]} rounded-lg border-2 ${borderColorMap[borderColor]} p-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Header with icon and label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          {label}
        </span>
        <Icon className="w-6 h-6 text-[#3B82F6]" />
      </div>

      {/* Value section */}
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-semibold tracking-tight ${valueColorMap[valueColor]}`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-[#6B7280]">
            {unit}
          </span>
        )}
      </div>

      {/* Trend indicator (optional) */}
      {trend && (
        <div className="mt-2">
          <span
            className={`inline-flex items-center text-xs font-medium ${
              trend === 'up'
                ? 'text-green-600'
                : trend === 'down'
                  ? 'text-red-600'
                  : 'text-gray-600'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trend}
          </span>
        </div>
      )}
    </div>
  );
}
