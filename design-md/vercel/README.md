# Vercel Inspired Design System

Design system details have been moved to: https://getdesign.md/vercel/design-md

# DESIGN.MD - HydSense v2 (Connexio Inspired)

## 1. Visual Theme & Atmosphere
- **Mood**: Professional, clean, data-dense, trustworthy.
- **Density**: Spacious with clear grouping.
- **Philosophy**: Minimalist light surfaces with vibrant blue primary accents.

## 2. Color Palette & Roles
- **Surface-Base**: #F9FAFB (Light gray background)
- **Surface-Card**: #FFFFFF (Pure white cards)
- **Primary-Blue**: #3B82F6 (Main action and active state color)
- **Text-Primary**: #111827 (Dark slate for headings)
- **Text-Secondary**: #6B7280 (Gray for sub-labels)
- **Status-Success**: #10B981 (Green for online/ok)
- **Status-Error**: #EF4444 (Red for leaks/critical)

## 3. Typography Rules
- **Family**: Inter, system-ui, sans-serif.
- **Scale**: 
  - H1: 24px, Bold, tight tracking.
  - KPI-Value: 32px, Semibold.
  - Label: 12px, Medium, uppercase for tracking headers.

## 4. Component Stylings
- **Cards**: Pure white, 12px border-radius, soft subtle shadow (`0 1px 3px rgba(0,0,0,0.1)`).
- **Sidebar**: Fixed width, light border-right, active links use Primary-Blue background with 10% opacity.
- **Charts**: Use area charts with soft blue gradients under the line.

## 5. Layout Principles
- **Grid**: 12-column grid system.
- **Spacing**: 8px base unit (p-4 = 16px, p-5 = 20px).
- **Navigation**: Left-side vertical navigation with icons.

## 6. Agent Prompt Guide
- "Build components using Tailwind CSS."
- "Use white surfaces with soft shadows for all containers."
- "Ensure the 'Main Valve' card is mapped to the live API data stream."