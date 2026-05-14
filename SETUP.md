# 🚀 HydSense v2 Setup Guide

This guide will help you set up and run the HydSense v2 water monitoring dashboard locally.

## Prerequisites

Make sure you have the following installed:
- **Node.js** 18.17+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/hydsense-v2.git
cd hydsense-v2

# Install dependencies
npm install
```

## Step 2: Environment Setup

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API endpoints:

```env
# For local development
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3001

# For production (replace with actual endpoints)
# NEXT_PUBLIC_API_URL=https://api.hydsense.app
# NEXT_PUBLIC_WEBSOCKET_URL=wss://api.hydsense.app
```

## Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hydsense-v2/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with sidebar & header
│   ├── page.tsx             # Home/Dashboard page
│   ├── api/                 # API routes (optional)
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── Dashboard.tsx        # Main dashboard component
│   ├── KPICard.tsx          # KPI scorecard component
│   ├── Sidebar.tsx          # Left navigation
│   ├── Header.tsx           # Top header bar
│   ├── DeviceStatusTable.tsx # Device status table
│   └── charts/              # Chart components
│       ├── TemperatureChart.tsx
│       ├── WaterFlowChart.tsx
│       └── DeviceStatusChart.tsx
│
├── hooks/                   # Custom React hooks
│   └── useWaterData.ts      # Hook for fetching water data
│
├── lib/                     # Utility functions
│   ├── api.ts              # API client & functions
│   └── utils.ts            # Helper functions
│
├── public/                  # Static assets
│   └── images/
│
├── DESIGN.md               # Design system specification
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind CSS config
├── next.config.js          # Next.js config
└── tsconfig.json          # TypeScript config
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production
npm run build        # Build for production
npm start           # Start production server

# Maintenance
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript checks
```

## Adding New Components

### 1. Create Component File
Create a new file in `components/`:

```bash
touch components/MyComponent.tsx
```

### 2. Template Component

```tsx
'use client';

import { ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children?: ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
      <h3 className="text-base font-semibold text-[#111827] mb-4">{title}</h3>
      {children}
    </div>
  );
}
```

### 3. Import & Use
```tsx
import { MyComponent } from '@/components/MyComponent';

export default function Page() {
  return <MyComponent title="My Title">Content here</MyComponent>;
}
```

## Using Custom Hooks

### useWaterData Hook
Fetch water monitoring data from ESP32:

```tsx
import { useWaterData } from '@/hooks/useWaterData';

export function DeviceMonitor() {
  const { data, isLoading, error } = useWaterData('device-001');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <p>Temperature: {data?.temperature}°C</p>
      <p>Flow Rate: {data?.flowRate} L/h</p>
    </div>
  );
}
```

## Color System

All colors follow the DESIGN.md specification. Use these color classes:

```tsx
// Background
className="bg-[#F9FAFB]"    // surface-base
className="bg-[#FFFFFF]"    // surface-card
className="bg-[#F3F4F6]"    // surface-hover

// Text
className="text-[#111827]"  // text-heading
className="text-[#1F2937]"  // text-primary
className="text-[#6B7280]"  // text-muted

// Status
className="text-[#10B981]"  // online/success
className="text-[#EF4444]"  // offline/error
className="text-[#F59E0B]"  // warning
```

## API Integration

### Fetching Data

```tsx
import { fetchWaterData, fetchDevices } from '@/lib/api';

async function getDeviceInfo() {
  try {
    const data = await fetchWaterData('esp32-001');
    console.log('Water data:', data);
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}
```

### Real-time WebSocket

```tsx
import { connectWebSocket } from '@/lib/api';

connectWebSocket('esp32-001', (data) => {
  console.log('Real-time data:', data);
});
```

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial dashboard commit"
git push origin main
```

### 2. Connect to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration
5. Click "Deploy"

### 3. Set Environment Variables
In Vercel Dashboard:
1. Go to Project Settings
2. Environment Variables
3. Add:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_WEBSOCKET_URL`

### 4. Live Demo
Your site is live at `https://hydsense-v2.vercel.app` (replace with your actual domain)

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types
npm run type-check

# Update dependencies if needed
npm update
```

### Tailwind Classes Not Working
```bash
# Clear Tailwind cache
rm -rf .next

# Rebuild
npm run dev
```

## Need Help?

- Check [DESIGN.md](./DESIGN.md) for design specifications
- See [README.md](./README.md) for project overview
- Visit [Next.js Docs](https://nextjs.org/docs)
- Check [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Happy coding! 🌊**
