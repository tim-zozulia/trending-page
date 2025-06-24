# Trending Stories - Real-time News Explorer

A modern, animated, filterable, real-time story explorer using Perigon API with stunning UI/UX and advanced features.

## Features

### Core Features
- 🔥 **Trending Now Ticker** - Live pulse badges with animated ticker
- 🏷️ **Category Filters** - Horizontal pills with animated switching
- 📰 **Story Grid** - Morphing grid layout with expandable cards
- 🌍 **Geographic Filtering** - Filter stories by location
- 🔴 **Live Mode Toggle** - Auto-refresh with real-time updates

### Visual & Interactive Features
- ✨ **Animated Heat Badges** - Pulse animation based on story popularity
- 🎛️ **Smart Filters** - Category, search, and geographic filtering
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - TailwindCSS with shadcn/ui components
- 🎭 **Smooth Animations** - Framer Motion powered transitions

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion + CSS animations
- **API**: Perigon Stories API
- **Icons**: Lucide React
- **State Management**: React hooks + Context

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file and add your Perigon API key:
   ```
   NEXT_PUBLIC_PERIGON_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The app integrates with the Perigon Stories API to fetch real-time trending stories. If no API key is provided, it falls back to mock data for development purposes.

### Supported Features
- Story clustering and aggregation
- Category-based filtering
- Geographic filtering
- Real-time updates
- Search functionality

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API client
├── types/                # TypeScript type definitions
└── README.md
```

## Development Phases

This project was built following a 4-phase approach:

1. **MVP** - Basic story grid with API integration
2. **UI Polish** - TailwindCSS theming and hover effects
3. **Animations** - Framer Motion transitions and pulse effects
4. **Advanced Features** - Live mode and geographic filtering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
