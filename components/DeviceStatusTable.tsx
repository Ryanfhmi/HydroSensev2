'use client';

import { Signal, Wifi, WifiOff } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'Sensor' | 'Valve' | 'Gateway';
  status: 'online' | 'offline' | 'warning';
  location: string;
  lastUpdate: string;
  signalStrength: number;
}

interface DeviceStatusTableProps {
  devices: Device[];
  title?: string;
}

export function DeviceStatusTable({ devices, title = 'Device Status' }: DeviceStatusTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return { bg: '#D1FAE5', text: '#047857', label: 'Online' };
      case 'offline':
        return { bg: '#FEE2E2', text: '#B91C1C', label: 'Offline' };
      case 'warning':
        return { bg: '#FEF3C7', text: '#92400E', label: 'Warning' };
      default:
        return { bg: '#E5E7EB', text: '#374151', label: 'Unknown' };
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
      {/* Header */}
      <h3 className="text-base font-semibold text-[#111827] mb-4">{title}</h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left px-2 py-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Device</th>
              <th className="text-left px-2 py-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Type</th>
              <th className="text-left px-2 py-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Location</th>
              <th className="text-left px-2 py-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Status</th>
              <th className="text-left px-2 py-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Signal</th>
              <th className="text-left px-2 py-3 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const statusColor = getStatusColor(device.status);
              return (
                <tr key={device.id} className="border-b border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors">
                  {/* Device Name */}
                  <td className="px-2 py-3 text-[#111827] font-medium">{device.name}</td>

                  {/* Type */}
                  <td className="px-2 py-3 text-[#1F2937]">{device.type}</td>

                  {/* Location */}
                  <td className="px-2 py-3 text-[#6B7280]">{device.location}</td>

                  {/* Status Badge */}
                  <td className="px-2 py-3">
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor.text }}></span>
                      {statusColor.label}
                    </span>
                  </td>

                  {/* Signal Strength */}
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-1">
                      {device.status === 'online' ? (
                        <>
                          <Wifi className="w-4 h-4 text-[#10B981]" />
                          <span className="text-[#6B7280]">{device.signalStrength}%</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-4 h-4 text-[#EF4444]" />
                          <span className="text-[#6B7280]">-</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Last Update */}
                  <td className="px-2 py-3 text-[#6B7280] text-xs">{device.lastUpdate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {devices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#6B7280]">No devices found</p>
        </div>
      )}
    </div>
  );
}
