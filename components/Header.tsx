'use client';

import { Settings, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between z-40">
      {/* Left side - Title */}
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Water Monitoring</h1>
        <p className="text-xs text-[#6B7280] mt-0.5">Real-time IoT Dashboard</p>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Badge */}
        <button className="relative p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-[#6B7280]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>

        {/* Settings Button */}
        <button className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-[#6B7280]" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center cursor-pointer">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
}
