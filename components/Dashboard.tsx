'use client';

import { useState, useEffect, useMemo } from 'react';
import { Droplets, AlertTriangle, Wifi, Gauge } from 'lucide-react';
import { KPICard } from './KPICard';
import { TemperatureChart } from './charts/TemperatureChart';
import { WaterFlowChart } from './charts/WaterFlowChart';
import { DeviceStatusTable } from './DeviceStatusTable';
import { useWaterData } from '@/hooks/useWaterData';

// Base devices configuration
const baseDevices = [
  {
    id: '1',
    name: 'Main Valve Sensor',
    type: 'Sensor' as const,
    status: 'online' as const,
    location: 'Factory Floor A',
    lastUpdate: '2 min ago',
    signalStrength: 92,
  },
  {
    id: '2',
    name: 'Pressure Monitor',
    type: 'Sensor' as const,
    status: 'online' as const,
    location: 'Pipe Section B',
    lastUpdate: '1 min ago',
    signalStrength: 85,
  },
  {
    id: '3',
    name: 'Leak Detector',
    type: 'Valve' as const,
    status: 'warning' as const,
    location: 'Storage Tank',
    lastUpdate: '5 min ago',
    signalStrength: 72,
  },
  {
    id: '4',
    name: 'Gateway Hub',
    type: 'Gateway' as const,
    status: 'online' as const,
    location: 'Control Room',
    lastUpdate: 'Just now',
    signalStrength: 98,
  },
];

export function Dashboard() {
  const { historicalData, currentFlow, currentVibration, sensorData, error } = useWaterData();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Create dynamic devices array based on sensor status
  const devices = useMemo(() => {
    return baseDevices.map((device) => {
      // Update Leak Detector status based on sensor status
      if (device.id === '3') {
        return {
          ...device,
          status: sensorData?.status === 'LEAK' ? 'warning' : ('online' as const),
          lastUpdate: 'Just now',
        };
      }
      return device;
    });
  }, [sensorData?.status]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#111827] mb-1">Dashboard</h1>
          <p className="text-sm text-[#6B7280]">Real-time water monitoring system status</p>
          {error && <p className="text-xs text-red-600 mt-2">Error: {error}</p>}
        </div>

        {/* KPI Scorecard - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* System Status - First Position (Primary Card) */}
          <KPICard
            icon={AlertTriangle}
            label="System Status"
            value={sensorData?.status || 'LOADING'}
            unit=""
            borderColor={
              sensorData?.status === 'LEAK'
                ? 'red'
                : sensorData?.status === 'NORMAL'
                  ? 'green'
                  : sensorData?.status === 'KOSONG'
                    ? 'yellow'
                    : 'default'
            }
            valueColor={
              sensorData?.status === 'LEAK'
                ? 'red'
                : sensorData?.status === 'NORMAL'
                  ? 'green'
                  : sensorData?.status === 'KOSONG'
                    ? 'yellow'
                    : 'default'
            }
            bgTint={
              sensorData?.status === 'LEAK'
                ? 'red'
                : sensorData?.status === 'NORMAL'
                  ? 'green'
                  : sensorData?.status === 'KOSONG'
                    ? 'yellow'
                    : 'default'
            }
          />
          {/* Water Flow - Second Position */}
          <KPICard
            icon={Droplets}
            label="Water Flow"
            value={currentFlow}
            unit="L/h"
            trend={currentFlow > 0 ? 'up' : 'stable'}
          />
          {/* Devices Online - Third Position */}
          <KPICard
            icon={Wifi}
            label="Devices Online"
            value={4}
            unit="active"
            trend="stable"
          />
          {/* Vibration Intensity - Fourth Position */}
          <KPICard
            icon={Gauge}
            label="Vibration Intensity"
            value={currentVibration}
            unit="g"
            trend="stable"
          />
        </div>

        {/* Charts Section - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TemperatureChart
            data={historicalData}
            height={300}
            title="Vibration Intensity (G-Force)"
          />
          <WaterFlowChart
            data={historicalData}
            height={300}
            title="Water Flow Rate (Simulated)"
          />
        </div>

        {/* Device Status Section - Full Width */}
        <div className="mb-6">
          <DeviceStatusTable
            devices={devices}
            title="Connected Devices"
          />
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 text-center text-xs text-[#6B7280]">
          <p>
            Dashboard last updated: {isClient ? currentTime : '—'} 
            {sensorData?.status === 'LEAK' ? ' • ⚠️ Leak Alert Active' : ' • All systems nominal'}
          </p>
        </div>
      </div>
    </div>
  );
}
