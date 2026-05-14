'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface DataPoint {
  time: string;
  gForce: number;
}

interface TemperatureChartProps {
  data: DataPoint[];
  height?: number;
  title?: string;
}

export function TemperatureChart({ data, height = 300, title = 'Vibration Intensity' }: TemperatureChartProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
        <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-1 rounded">
          Last 24h
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            unit=" g"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px',
            }}
            labelStyle={{ color: '#111827', fontSize: '12px' }}
            formatter={(value: number) => `${value.toFixed(2)} g`}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', color: '#6B7280' }}
          />
          <Area
            type="monotone"
            dataKey="gForce"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#tempGradient)"
            name="Vibration (g)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
