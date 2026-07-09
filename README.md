# CrisisNexus

A comprehensive crisis management and disaster response platform that empowers organizations to effectively monitor, respond to, and manage emergency situations in real-time. Built with cutting-edge technologies including Next.js 14, TypeScript, and Tailwind CSS, CrisisNexus provides a robust solution for emergency management teams.

## Overview

CrisisNexus serves as a centralized hub for crisis management, enabling organizations to:
- Monitor and respond to emergencies in real-time
- Coordinate response efforts across multiple locations
- Track resource allocation and deployment
- Generate detailed incident reports and analytics
- Maintain communication channels during critical situations

## Features

- 🚨 **Real-time Alert System**
  - Instant disaster alerts and notifications
  - Priority-based alert categorization (High, Medium, Low)
  - Alert history and timeline tracking
  - Proximity-based alert filtering

- 📍 **Interactive Disaster Map**
  - Real-time disaster location tracking using Leaflet maps
  - Visual representation of active disasters
  - Multiple disaster types: floods, earthquakes, cyclones, wildfires, landslides
  - Location-based monitoring with custom location management

- 📊 **Comprehensive Dashboard**
  - Real-time disaster statistics and metrics
  - Active alerts feed with live updates
  - Disaster type filtering and severity indicators
  - Alert history with date range filtering

- 🤖 **CrisisMate AI Assistant**
  - 24/7 disaster safety companion
  - Step-by-step guidance during emergencies
  - Calm, reassuring voice prompts with text-to-speech
  - Quick tips and checklists for evacuation and emergency kits
  - Support for earthquakes, floods, fires, cyclones, and heatwaves

- 📚 **Emergency Resources Hub**
  - Emergency services directory
  - First aid guides and medical information
  - Evacuation plans and safe zones
  - Emergency kit checklists
  - Weather alerts and updates
  - Medical centers locator
  - Safety guidelines and disaster preparedness guides
  - Community support resources

- 🎨 **Modern UI/UX**
  - Dark/Light theme support
  - Responsive design for all device types
  - Accessible components with keyboard navigation
  - Smooth animations and transitions

## Tech Stack

### Currently In Use

- **Frontend Framework**: Next.js 14 with App Router
- **Programming Language**: TypeScript
- **Styling Solution**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React Hooks & Context API
- **Data Storage**: Mock Data (In-memory storage for development)
- **Maps**: Leaflet with React Leaflet
- **Notifications**: Sonner (Toast notifications)
- **Theming**: next-themes (Dark/Light mode)
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge, class-variance-authority, nanoid

### Planned/Not Yet Implemented

- **Vercel KV**: Included as dependency but not currently integrated (production storage planned)
- **External API Integrations**: Framework exists for News, YouTube, Weather, and Government APIs (requires API keys configuration)

## Getting Started

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm 8+ or yarn 1.22+
- Git for version control

### Environment Setup

1. Create a `.env` file in the root directory (optional for advanced features):
```env
# External API integrations (Optional - for real-time data)
NEXT_PUBLIC_NEWS_API_KEY="your-news-api-key"
NEXT_PUBLIC_NEWS_API_URL="your-news-api-url"
NEXT_PUBLIC_YOUTUBE_API_KEY="your-youtube-api-key"
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID="your-channel-id"
NEXT_PUBLIC_WEATHER_API_KEY="your-weather-api-key"
NEXT_PUBLIC_WEATHER_API_URL="your-weather-api-url"

# Note: The app works with mock data by default without any configuration
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crisisnexus.git
cd crisisnexus
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
├── src/                     # Source directory
│   ├── app/                # Next.js 14 App Router
│   │   ├── admin/         # Admin dashboard
│   │   ├── alerts/        # Alerts page
│   │   ├── api/           # API routes
│   │   │   └── disasters/ # Disaster API endpoints
│   │   ├── contact/       # Contact page
│   │   ├── crisismate/    # CrisisMate assistant page
│   │   ├── dashboard/     # Main dashboard
│   │   ├── history/       # Alert history page
│   │   ├── locations/     # Location management
│   │   ├── resources/     # Emergency resources hub
│   │   │   ├── community/         # Community support
│   │   │   ├── emergency-kit/     # Emergency kit checklist
│   │   │   ├── emergency-services/# Emergency services directory
│   │   │   ├── evacuation/        # Evacuation plans
│   │   │   ├── first-aid/         # First aid guides
│   │   │   ├── medical-centers/   # Medical centers locator
│   │   │   ├── preparedness/      # Disaster preparedness
│   │   │   ├── safety/            # Safety guidelines
│   │   │   └── weather/            # Weather alerts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── globals.css    # Global styles
│   │   ├── error.tsx      # Error boundary
│   │   ├── loading.tsx    # Loading component
│   │   └── not-found.tsx  # 404 page
│   ├── components/        # React components
│   │   ├── admin/         # Admin components
│   │   ├── crisismate/    # CrisisMate widget
│   │   ├── dashboard/     # Dashboard components
│   │   ├── layout/        # Layout components (header, sidebar, etc.)
│   │   ├── locations/     # Location management components
│   │   ├── map/           # Map components (Leaflet)
│   │   ├── providers/     # Context providers (theme, etc.)
│   │   ├── search/        # Search components
│   │   └── ui/            # Reusable UI components (shadcn/ui)
│   ├── context/           # React Context providers
│   │   ├── locations-context.tsx  # Location state management
│   │   └── search-context.tsx     # Search state management
│   ├── lib/               # Utility functions
│   │   ├── api/           # API integration utilities
│   │   ├── constants.ts   # Application constants
│   │   └── utils.ts       # General utilities
│   ├── services/          # Service layer
│   │   ├── backend-service.ts     # Backend API service
│   │   └── disaster-service.ts   # Disaster data service
│   └── types/             # TypeScript definitions
│       ├── disaster.ts    # Disaster type definitions
│       └── index.ts       # General types
├── public/                # Static assets
│   ├── india-map-bg.png   # Map background
│   └── marker-icon.png    # Map markers
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Key Components

### Core Components
- **Dashboard**: Main command center for disaster monitoring
  - Real-time disaster statistics
  - Active alerts feed
  - Interactive disaster map
  - Alert history with filtering

- **DisasterMap**: Interactive map visualization using Leaflet
  - Real-time disaster location markers
  - Multiple disaster type support
  - Custom location management
  - Location-based filtering

- **AlertSystem**: Alert management and tracking
  - Priority-based alert display
  - Alert history timeline
  - Date range filtering
  - Alert status tracking

- **CrisisMate**: AI-powered disaster assistant
  - Step-by-step emergency guidance
  - Text-to-speech support
  - Disaster-specific instructions
  - Mental health support

### UI Components
- **AlertCard**: Displays alert information with priority styling
- **AlertFeed**: Real-time alert stream component
- **StatsCard**: Dashboard statistics display
- **DisasterControl**: Disaster type filtering controls
- **MapComponent**: Leaflet-based map wrapper
- **DateRangePicker**: Date range selection for history
- **ThemeProvider**: Dark/Light theme management

### Services
- **DisasterService**: Manages disaster data operations
  - Fetch active alerts
  - Get latest updates
  - Retrieve alert history
  - Disaster location management

- **BackendService**: Handles external API integrations
  - Disaster data aggregation
  - News updates fetching
  - Alert history retrieval

### Context Providers
- **LocationsContext**: Manages user-monitored locations
- **SearchContext**: Handles global search functionality
- **ThemeProvider**: Manages application theming (dark/light mode)

## Unused Dependencies

The following packages are currently installed but not being used in the codebase and can be removed:

- **@vercel/kv** - Vercel KV database client (imported but not implemented)
- **leaflet.locatecontrol** - Leaflet location control plugin (not imported anywhere)
- **critters** - CSS inlining tool (not configured or used)

To remove these unused dependencies:
```bash
npm uninstall @vercel/kv leaflet.locatecontrol critters
# or
yarn remove @vercel/kv leaflet.locatecontrol critters
```

**Note**: Keep `@vercel/kv` if you plan to implement Vercel KV storage in the future.

## Development Guidelines

### Code Style
- Follow the TypeScript strict mode guidelines
- Use ES6+ features appropriately
- Implement proper error handling
- Write meaningful comments and documentation

### Component Structure
- Implement atomic design principles
- Use proper component composition
- Maintain single responsibility principle
- Follow React best practices

### Linting
```bash
# Run ESLint
npm run lint
```

### Performance Optimization
- Implement code splitting
- Use proper caching strategies
- Optimize images and assets
- Monitor and improve Core Web Vitals

## Deployment

### Production Deployment
1. Build the application:
```bash
npm run build
```

2. Set up environment variables on your hosting platform (optional - for external API integrations)
3. Deploy the application (recommended: Vercel, Netlify, or any Node.js hosting platform)
4. Verify all environment variables are properly set if using external APIs

**Note**: Currently, the application uses in-memory mock data. For production use, you'll need to implement a persistent database solution (e.g., PostgreSQL, MongoDB, or Vercel KV).

### Monitoring
- Set up error tracking (e.g., Sentry)
- Configure performance monitoring
- Implement logging system
- Set up uptime monitoring

## Security

- Secure API endpoints with proper error handling
- Environment variable management for sensitive data
- Input validation and sanitization
- Follows OWASP security guidelines
- Server-side data handling with Next.js API routes

## Support

For support, please:
1. Check the [documentation](https://docs.crisisnexus.com)
2. Search existing [issues](https://github.com/yourusername/crisisnexus/issues)
3. Create a new issue if needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Maps powered by [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/)
- Toast notifications with [Sonner](https://sonner.emilkowal.ski/)
- Theming with [next-themes](https://github.com/pacocoursey/next-themes)