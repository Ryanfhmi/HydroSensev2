'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FlowData {
  time: string;
  flow: number;
}

interface WaterFlowChartProps {
  data: FlowData[];
  height?: number;
  title?: string;
}

export function WaterFlowChart({ data, height = 280, title = 'Water Flow Rate' }: WaterFlowChartProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
        <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-1 rounded">
          L/h
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px',
            }}
            labelStyle={{ color: '#111827', fontSize: '12px' }}
            formatter={(value) => `${value.toFixed(2)} L/h`}
          />
          <Bar
            dataKey="flow"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
            name="Flow Rate"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
