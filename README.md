# 🌊 HydSense v2 - IoT Water Monitoring Dashboard

An intelligent IoT dashboard for real-time water leak detection and monitoring powered by ESP32 sensors. Built with Next.js, Tailwind CSS, and deployed on Vercel.

## 🚀 Live Demo

**[View Live Dashboard](https://hydsense-v2.vercel.app)** (Coming Soon)

---

## 📋 Features

### Core Capabilities
- ✅ **Real-time Monitoring** - Live data streaming from ESP32 water sensors
- ✅ **Leak Detection** - Instant alerts when abnormal water flow detected
- ✅ **Device Dashboard** - 4 KPI cards showing critical metrics
- ✅ **Historical Charts** - Temperature and pressure trend visualization
- ✅ **Device Status** - Online/offline status with signal strength
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### Key Metrics Tracked
- **Devices Online** - Active sensor count
- **Water Flow** - Real-time flow rate (L/h)
- **Active Alerts** - Number of leak detections
- **Signal Strength** - WiFi signal quality (%)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 14+](https://nextjs.org/) (React) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **State Management** | React Context API / Zustand |
| **API Communication** | Axios + WebSocket (for real-time data) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hydsense-v2.git
   cd hydsense-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3001
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

---

## 🏗️ Project Structure

```
hydsense-v2/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard homepage
│   └── api/                    # API routes (optional)
├── components/
│   ├── Dashboard.tsx           # Main dashboard container
│   ├── KPICard.tsx            # KPI scorecard component
│   ├── Sidebar.tsx            # Left navigation sidebar
│   ├── Header.tsx             # Top header bar
│   ├── charts/
│   │   ├── TemperatureChart.tsx
│   │   ├── WaterFlowChart.tsx
│   │   └── DeviceStatusChart.tsx
│   └── ui/                    # shadcn/ui components
├── hooks/
│   └── useWaterData.ts        # Custom hook for ESP32 data
├── lib/
│   ├── api.ts                 # API client setup
│   └── utils.ts               # Utility functions
├── styles/
│   └── globals.css            # Global Tailwind styles
├── public/
│   └── images/                # Logos, icons
├── DESIGN.md                  # Design system specification
└── tailwind.config.ts         # Tailwind configuration
```

---

## 🎨 Design System

The project uses a **DESIGN.md** file to define all UI specifications:
- Color palette (hex codes)
- Typography (font sizes, weights)
- Component styles
- Spacing rules
- Layout guidelines

See [DESIGN.md](./DESIGN.md) for complete technical specifications.

### Color Palette
- **Primary**: `#3B82F6` (Electric Blue)
- **Success**: `#10B981` (Emerald Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)
- **Background**: `#F9FAFB` (Light Gray)
- **Surface**: `#FFFFFF` (Pure White)

---

## 🔌 API Integration

### ESP32 Connection
The dashboard connects to ESP32 sensors via:
- **REST API** - For device status and configuration
- **WebSocket** - For real-time data streaming

### Expected Data Format
```json
{
  "deviceId": "esp32-001",
  "temperature": 24.5,
  "pressure": 1.2,
  "flowRate": 0.85,
  "signalStrength": 85,
  "leakDetected": false,
  "timestamp": "2026-04-28T10:30:00Z"
}
```

---

## 📊 Components Documentation

### KPI Scorecard
```tsx
<KPICard
  icon={AlertCircle}
  label="Active Alerts"
  value={12}
  unit="alerts"
/>
```

### Temperature Chart
```tsx
<TemperatureChart
  data={temperatureData}
  height={300}
  timeRange="24h"
/>
```

### Device Status Table
```tsx
<DeviceStatusTable
  devices={devices}
  onDeviceClick={handleDeviceSelect}
/>
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial dashboard commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration
   - Click "Deploy"

3. **Set Environment Variables on Vercel**
   - In Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WEBSOCKET_URL`

4. **Live Dashboard**
   - Your site is now live at `https://hydsense-v2.vercel.app`

---

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow React functional component patterns
- Use Tailwind CSS utility classes (no custom CSS)
- Import icons from Lucide React

### Component Example
```tsx
'use client';

import { BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetchWaterData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <header className="mb-8">
        <h1 className="text-[28px] font-semibold text-[#111827]">
          Water Monitoring Dashboard
        </h1>
      </header>
      {/* Dashboard content */}
    </div>
  );
}
```

### Adding New Components
1. Create component in `components/` folder
2. Use Tailwind classes from DESIGN.md
3. Import icons from `lucide-react`
4. Export as default
5. Document props with TypeScript interfaces

---

## 🐛 Troubleshooting

### WebSocket Connection Issues
- Check if ESP32 is reachable and sending data
- Verify `NEXT_PUBLIC_WEBSOCKET_URL` is correct
- Check browser console for errors

### Chart Not Rendering
- Ensure data is in correct format
- Verify chart height is set (>200px)
- Check if Recharts is installed

### Styling Not Applied
- Clear Tailwind cache: `rm -rf .next`
- Rebuild: `npm run dev`
- Verify `tailwind.config.ts` includes correct paths

---

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)
- [Recharts API](https://recharts.org/en-US/api)
- [Lucide Icons](https://lucide.dev/)
- [Design System](./DESIGN.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/yourusername/hydsense-v2/issues)
- Contact: your-email@example.com
- Discord: [Join Community](https://discord.gg/your-server)

---

**Built with ❤️ for water conservation and smart IoT monitoring.**

- [**Airtable**](https://getdesign.md/airtable/design-md) - Spreadsheet-database hybrid. Colorful, friendly, structured data aesthetic
- [**Clay**](https://getdesign.md/clay/design-md) - Creative agency. Organic shapes, soft gradients, art-directed layout
- [**Figma**](https://getdesign.md/figma/design-md) - Collaborative design tool. Vibrant multi-color, playful yet professional
- [**Framer**](https://getdesign.md/framer/design-md) - Website builder. Bold black and blue, motion-first, design-forward
- [**Miro**](https://getdesign.md/miro/design-md) - Visual collaboration. Bright yellow accent, infinite canvas aesthetic
- [**Webflow**](https://getdesign.md/webflow/design-md) - Visual web builder. Blue-accented, polished marketing site aesthetic

### Fintech & Crypto

- [**Binance**](https://getdesign.md/binance/design-md) - Crypto exchange. Bold Binance Yellow on monochrome, trading-floor urgency
- [**Coinbase**](https://getdesign.md/coinbase/design-md) - Crypto exchange. Clean blue identity, trust-focused, institutional feel
- [**Kraken**](https://getdesign.md/kraken/design-md) - Crypto trading platform. Purple-accented dark UI, data-dense dashboards
- [**Mastercard**](https://getdesign.md/mastercard/design-md) - Global payments network. Warm cream canvas, orbital pill shapes, editorial warmth
- [**Revolut**](https://getdesign.md/revolut/design-md) - Digital banking. Sleek dark interface, gradient cards, fintech precision
- [**Stripe**](https://getdesign.md/stripe/design-md) - Payment infrastructure. Signature purple gradients, weight-300 elegance
- [**Wise**](https://getdesign.md/wise/design-md) - International money transfer. Bright green accent, friendly and clear

### E-commerce & Retail

- [**Airbnb**](https://getdesign.md/airbnb/design-md) - Travel marketplace. Warm coral accent, photography-driven, rounded UI
- [**Meta**](https://getdesign.md/meta/design-md) - Tech retail store. Photography-first, binary light/dark surfaces, Meta Blue CTAs
- [**Nike**](https://getdesign.md/nike/design-md) - Athletic retail. Monochrome UI, massive uppercase Futura, full-bleed photography
- [**Shopify**](https://getdesign.md/shopify/design-md) - E-commerce platform. Dark-first cinematic, neon green accent, ultra-light display type
- [**Starbucks**](https://getdesign.md/starbucks/design-md) - Coffee retail flagship. Four-tier earth-green system, warm cream canvas, proprietary SoDoSans typography

### Media & Consumer Tech

- [**Apple**](https://getdesign.md/apple/design-md) - Consumer electronics. Premium white space, SF Pro, cinematic imagery
- [**IBM**](https://getdesign.md/ibm/design-md) - Enterprise technology. Carbon design system, structured blue palette
- [**NVIDIA**](https://getdesign.md/nvidia/design-md) - GPU computing. Green-black energy, technical power aesthetic
- [**Pinterest**](https://getdesign.md/pinterest/design-md) - Visual discovery platform. Red accent, masonry grid, image-first
- [**PlayStation**](https://getdesign.md/playstation/design-md) - Gaming console retail. Three-surface channel layout, cyan hover-scale interaction
- [**SpaceX**](https://getdesign.md/spacex/design-md) - Space technology. Stark black and white, full-bleed imagery, futuristic
- [**Spotify**](https://getdesign.md/spotify/design-md) - Music streaming. Vibrant green on dark, bold type, album-art-driven
- [**The Verge**](https://getdesign.md/theverge/design-md) - Tech editorial media. Acid-mint and ultraviolet accents, Manuka display type
- [**Uber**](https://getdesign.md/uber/design-md) - Mobility platform. Bold black and white, tight type, urban energy
- [**Vodafone**](https://getdesign.md/vodafone/design-md) - Global telecom brand. Monumental uppercase display, Vodafone Red chapter bands
- [**WIRED**](https://getdesign.md/wired/design-md) - Tech magazine. Paper-white broadsheet density, custom serif, ink-blue links

### Automotive

- [**BMW**](https://getdesign.md/bmw/design-md) - Luxury automotive. Dark premium surfaces, precise German engineering aesthetic
- [**Bugatti**](https://getdesign.md/bugatti/design-md) - Luxury hypercar. Cinema-black canvas, monochrome austerity, monumental display type
- [**Ferrari**](https://getdesign.md/ferrari/design-md) - Luxury automotive. Chiaroscuro black-white editorial, Ferrari Red with extreme sparseness
- [**Lamborghini**](https://getdesign.md/lamborghini/design-md) - Luxury automotive. True black cathedral, gold accent, LamboType custom Neo-Grotesk
- [**Renault**](https://getdesign.md/renault/design-md) - French automotive. Vivid aurora gradients, NouvelR proprietary typeface, zero-radius buttons
- [**Tesla**](https://getdesign.md/tesla/design-md) - Electric vehicles. Radical subtraction, cinematic full-viewport photography, Universal Sans


## What's Inside Each DESIGN.md

Every file follows the [Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/) with extended sections:

| # | Section | What it captures |
|---|---------|-----------------|
| 1 | Visual Theme & Atmosphere | Mood, density, design philosophy |
| 2 | Color Palette & Roles | Semantic name + hex + functional role |
| 3 | Typography Rules | Font families, full hierarchy table |
| 4 | Component Stylings | Buttons, cards, inputs, navigation with states |
| 5 | Layout Principles | Spacing scale, grid, whitespace philosophy |
| 6 | Depth & Elevation | Shadow system, surface hierarchy |
| 7 | Do's and Don'ts | Design guardrails and anti-patterns |
| 8 | Responsive Behavior | Breakpoints, touch targets, collapsing strategy |
| 9 | Agent Prompt Guide | Quick color reference, ready-to-use prompts |

Each site includes:

| File | Purpose |
|------|---------|
| `DESIGN.md` | The design system (what agents read) |
| `preview.html` | Visual catalog showing color swatches, type scale, buttons, cards |
| `preview-dark.html` | Same catalog with dark surfaces |

### How to Use


1. Copy a site's `DESIGN.md` into your project root
2. Tell your AI agent to use it.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- **Improve existing files**: Fix wrong colors, missing tokens, weak descriptions
- **Report issues**: Let us know if something looks off

Before opening a PR, please [open an issue](https://github.com/VoltAgent/awesome-design-md/issues) first to discuss your idea and get feedback from maintainers.


## License

MIT License - see [LICENSE](LICENSE)

This repository is a curated collection of design system documents extracted from public websites. All DESIGN.md files are provided "as is" without warranty. The extracted design tokens represent publicly visible CSS values. We do not claim ownership of any site's visual identity. These documents exist to help AI agents generate consistent UI.
