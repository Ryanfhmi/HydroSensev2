'use client';

import { Home, AlertTriangle, Smartphone, BarChart3, Settings, Droplets } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
  { icon: Smartphone, label: 'Devices', href: '/devices' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-[#E5E7EB] p-4 flex flex-col">
      {/* Logo / Branding */}
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <span className="text-lg font-semibold text-[#111827]">HydSense</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#DBEAFE] text-[#3B82F6]'
                  : 'text-[#1F2937] hover:bg-[#F3F4F6]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
        <p className="mb-1">System Status</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
          <span>All devices online</span>
        </div>
      </div>
    </aside>
  );
}
