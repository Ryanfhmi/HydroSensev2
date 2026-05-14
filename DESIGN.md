# HydSense v2 - Design System Documentation

Dokumentasi desain teknis untuk dashboard monitoring air IoT. File ini menjadi referensi bagi Cursor (atau AI agent lainnya) untuk memilih warna hex, ukuran font, spacing, dan shadow yang tepat saat mengimplementasikan UI.

---

## 1. Visual Theme & Atmosphere

**Mood**: High-end, precise, industrial-modern, and trustworthy.

**Theme**: Light Mode exclusively (Vercel-inspired clean white surfaces).

**Density**: Spacious layout dengan high whitespace untuk fokus pada data kritis.

**Grid System**: 12-column responsive grid untuk semua tampilan utama.

---

## 2. Color Palette & Token System

### Background Colors
- **Surface-Base**: `#F9FAFB` - Latar belakang utama aplikasi (Light gray)
- **Surface-Card**: `#FFFFFF` - Semua container/card dashboard (Pure white)
- **Surface-Hover**: `#F3F4F6` - Background saat hover pada elemen interaktif

### Border & Dividers
- **Border-Subtle**: `#E5E7EB` - Border 1px untuk cards dan sidebar
- **Border-Strong**: `#D1D5DB` - Border 2px untuk section dividers

### Text Colors
- **Text-Heading**: `#111827` - Deep black/slate untuk semua judul utama
- **Text-Primary**: `#1F2937` - Text warna standar untuk body content
- **Text-Muted**: `#6B7280` - Medium gray untuk labels, secondary info, timestamps
- **Text-Disabled**: `#9CA3AF` - Light gray untuk disabled states

### Status & Semantic Colors
- **Status-Online**: `#10B981` - Emerald green untuk status "Online/Active"
- **Status-Offline**: `#EF4444` - Red untuk status "Offline/Error"
- **Status-Warning**: `#F59E0B` - Amber untuk status "Warning/Alert"
- **Status-Neutral**: `#8B5CF6` - Purple untuk status "Neutral/Pending"

### Primary Action Colors
- **Primary-Action**: `#3B82F6` - Electric Blue untuk active icons, buttons, links
- **Primary-Hover**: `#2563EB` - Darker blue untuk hover states
- **Primary-Light**: `#DBEAFE` - Very light blue untuk badge backgrounds (10% opacity)

### Accent Colors (untuk data visualization)
- **Chart-Blue**: `#3B82F6` - Primary line chart color
- **Chart-Blue-Light**: `#EFF6FF` - Light gradient fill untuk area charts
- **Chart-Green**: `#10B981` - Secondary line untuk data positif

---

## 3. Typography Specifications

### Font Family
- **Primary Font**: `Inter` (sans-serif) - Dari Google Fonts
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Font Sizes & Weights

#### Headings
- **H1** (Dashboard Title): 28px, Semibold (600), tracking-tight, text-heading
- **H2** (Section Headers): 20px, Semibold (600), text-heading
- **H3** (Card Titles): 16px, Semibold (600), text-heading

#### Body & Labels
- **Body Regular**: 14px, Regular (400), line-height: 1.5, text-primary
- **Body Small**: 12px, Regular (400), text-muted
- **Label**: 12px, Medium (500), uppercase, tracking-wider, text-muted

#### Special Values
- **KPI-Values**: 32px, Semibold (600), tracking-tight, text-heading (untuk angka utama di scorecard)
- **KPI-Secondary**: 14px, Regular (400), text-muted (keterangan di bawah KPI)

---

## 4. Component Styles (Filosofi "Seperlunya")

### Cards
```
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-Radius: 12px (rounded-lg)
- Padding: 16px (p-4)
- Shadow: 0 1px 2px rgba(0, 0, 0, 0.05)
- Hover State: Background #F3F4F6, shadow increase ke 0 1px 3px rgba(0, 0, 0, 0.1)
```

### Sidebar
```
- Width: 240px (fixed)
- Background: #FFFFFF
- Border-Right: 1px solid #E5E7EB
- Padding: 24px (p-6) pada top/bottom, 16px (p-4) left/right
- Text: text-primary, 14px regular untuk menu items
- Active Item: background #DBEAFE, text #3B82F6
```

### Status Badges
```
- Online: background #D1FAE5 (10% opacity green), text #047857
- Offline: background #FEE2E2 (10% opacity red), text #B91C1C
- Warning: background #FEF3C7 (10% opacity amber), text #92400E
- Border-Radius: 16px (full rounded pill shape)
- Padding: 4px 12px
- Font: 12px Medium, uppercase tracking-wider
```

### KPI Scorecard
```
- 4 kolom equal width dalam responsive grid
- Setiap card: 16px padding, white background, subtle border
- Icon size: 24px (Lucide React)
- Icon color: #3B82F6 (primary-action)
- Value: 32px Semibold, text-heading
- Label: 12px Medium, text-muted, uppercase
```

### Charts (Area Chart - Recharts)
```
- Data Line: 2px thick, color #3B82F6
- Fill Gradient: dari #3B82F6 (opacity 20%) ke transparent
- Axis Text: 12px regular, text-muted
- Grid Lines: 1px solid #E5E7EB (subtle)
- Tooltip: white background, 1px border #E5E7EB, 8px padding, 8px border-radius
```

### Buttons (Jika ada)
```
- Primary Button: background #3B82F6, text white, 10px horizontal padding, 8px vertical padding, 8px border-radius
- Secondary Button: background transparent, border 1px #E5E7EB, text #3B82F6
- Hover: opacity 80% untuk primary, background #F3F4F6 untuk secondary
- Font: 14px Medium
```

---

## 5. Spacing & Layout Rules

### Container & Padding
- **Page Container**: Max-width 1400px, centered dengan margin auto
- **Main Padding**: p-6 (24px) di semua sides
- **Card Internal Padding**: p-4 (16px)

### Gap & Margins
- **Gap Between Cards**: 24px (gap-6)
- **Gap Between KPI Cards**: 16px (gap-4)
- **Margin Top Section Headers**: 32px (mt-8)
- **Margin Between Sections**: 24px (space-y-6)

### Responsive Breakpoints (Tailwind)
```
- Mobile (< 640px): Single column, full width cards
- Tablet (640px - 1024px): 2-column grid
- Desktop (> 1024px): 4-column grid untuk KPIs, 2-column untuk charts
```

---

## 6. Implementation Guide for AI Agents (Cursor)

### Key Principles
1. **Prioritize Lucide-React icons** untuk semua navigation dan KPI items
   - Icon size default: 20px untuk sidebar, 24px untuk KPI cards
   - Icon color: #3B82F6 (primary-action) untuk active states

2. **Ensure all charts are responsive** menggunakan Recharts
   - Gunakan Tailwind's text-muted untuk axis labels
   - Hover tooltip harus menampilkan nilai dengan precision 2 decimal

3. **Focus on 4 KPI Cards saja** di top section:
   - Devices Online (📡 icon + count)
   - Water Flow (💧 icon + litres per hour)
   - Active Alerts (⚠️ icon + count)
   - Signal Strength (📶 icon + percentage)

4. **Consistent color usage**:
   - Primary action selalu gunakan #3B82F6
   - Status indicators gunakan green/red/amber sesuai status
   - Jangan tambah warna baru di luar palette ini

5. **Typography strict adherence**:
   - KPI values harus 32px Semibold
   - Labels harus 12px Medium uppercase
   - Body text selalu 14px Regular

---

## 7. Layout Structure

### Dashboard Main Layout
```
┌─────────────────────────────────────────────┐
│  Header (Logo + Title + User Menu)          │ Height: 60px
├──────────┬──────────────────────────────────┤
│          │ Main Content Area                │
│ Sidebar  │ ┌────────────────────────────────┤
│ 240px    │ │ KPI Scorecard (4 columns)     │
│          │ ├────────────────────────────────┤
│ - Home   │ │ Temperature Chart              │
│ - Alerts │ │ (Full width, 300px height)     │
│ - Devices│ ├────────────────────────────────┤
│ - Stream │ │ Water Flow + Device Status     │
│ - Reports│ │ (2 columns, equal width)       │
│          │ └────────────────────────────────┘
└──────────┴──────────────────────────────────┘
```

### Sidebar Menu Items (Lucide Icons)
- 🏠 Dashboard → `Home` icon
- 🚨 Alerts → `AlertTriangle` icon
- 📱 Devices → `Smartphone` icon
- 📊 Analytics → `BarChart3` icon
- ⚙️ Settings → `Settings` icon

### Color Coding Rules
- **Online Device**: Green badge with #10B981
- **Offline Device**: Red badge with #EF4444
- **Warning/Leak Detected**: Amber with #F59E0B
- **Data positive trend**: Green line
- **Data negative trend**: Red line

---

## 8. Shadow & Elevation

### Shadow Hierarchy
- **Card Subtle**: `0 1px 2px rgba(0, 0, 0, 0.05)` - Default card shadow
- **Card Elevated**: `0 1px 3px rgba(0, 0, 0, 0.1)` - On hover
- **Dropdown/Modal**: `0 10px 15px rgba(0, 0, 0, 0.1)` - Floating elements

---

## 9. Accessibility & Best Practices

- Semua text contrast ratio minimal 4.5:1 untuk AA compliance
- Icon + text harus selalu bersama (jangan icon saja)
- Button size minimum 44x44px untuk touchable area
- Focus states: 2px outline dengan primary-action color
- Alt text untuk semua images dan icons
- Semantic HTML (h1, h2, p, section, etc)

---

## 10. Notes for Development

- Font Inter harus di-import dari Google Fonts di layout root
- Tailwind CSS config harus include custom colors dari palette ini
- Recharts ResponsiveContainer width="100%" untuk semua charts
- Mobile-first approach untuk responsive design
- Deploy ke Vercel dengan automatic deployments dari GitHub