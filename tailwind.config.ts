import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surface Colors
        'surface-base': '#F9FAFB',
        'surface-card': '#FFFFFF',
        'surface-hover': '#F3F4F6',

        // Border Colors
        'border-subtle': '#E5E7EB',
        'border-strong': '#D1D5DB',

        // Text Colors
        'text-heading': '#111827',
        'text-primary': '#1F2937',
        'text-muted': '#6B7280',
        'text-disabled': '#9CA3AF',

        // Status Colors
        'status-online': '#10B981',
        'status-offline': '#EF4444',
        'status-warning': '#F59E0B',
        'status-neutral': '#8B5CF6',

        // Primary Action Colors
        'primary-action': '#3B82F6',
        'primary-hover': '#2563EB',
        'primary-light': '#DBEAFE',

        // Chart Colors
        'chart-blue': '#3B82F6',
        'chart-blue-light': '#EFF6FF',
        'chart-green': '#10B981',
      },
      fontSize: {
        'kpi-value': ['32px', { fontWeight: '600', letterSpacing: '-0.02em' }],
        'h1': ['28px', { fontWeight: '600', letterSpacing: '-0.02em' }],
        'h2': ['20px', { fontWeight: '600' }],
        'h3': ['16px', { fontWeight: '600' }],
        'label': ['12px', { fontWeight: '500', letterSpacing: '0.1em' }],
      },
      spacing: {
        'container': '24px',
        'card': '16px',
      },
      borderRadius: {
        'card': '12px',
        'badge': '16px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'card-elevated': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      gridTemplateColumns: {
        'dashboard-kpi': 'repeat(auto-fit, minmax(240px, 1fr))',
      },
    },
  },
  plugins: [],
};

export default config;
