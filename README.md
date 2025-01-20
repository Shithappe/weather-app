# Weather Application

A modern weather application built with Nuxt 3 that provides detailed weather information and location search functionality. The application displays current weather conditions, hourly forecasts, and weekly forecasts for locations worldwide.

- [Live Demo](https://weather-app-ten-gules-59.vercel.app/)
- [Demo](https://drive.google.com/file/d/1ILV3OU4s50k72MOoHeGx43v6J6aC6HGd/view?usp=sharing)

## Features

- Location search with autocomplete
- Current weather display including:
  - Temperature and "feels like" temperature
  - Weather conditions description
  - Clothing recommendations based on weather
  - Key meteorological data (wind speed, humidity, visibility, pressure, dew point)
- Hourly weather forecast
- Weekly weather forecast
- Responsive design
- Geolocation support

## Tech Stack

- **Frontend Framework**: Nuxt 3
- **Location Services**: Nominatim API for geocoding and location search
- **Weather Data**: OpenWeatherMap API for weather information
- **AI Integration**: GROQ for intelligent weather analysis and recommendations

## API Integration

### Nominatim
- Used for geocoding and reverse geocoding
- Provides location search with coordinates (format: latitude, longitude)

### OpenWeatherMap
- Provides comprehensive weather data including:
  - Current conditions
  - Temperature
  - Humidity
  - Wind speed
  - Visibility
  - Atmospheric pressure
  - Dew point

### GROQ
- Processes weather data to provide intelligent clothing recommendations
- Analyzes weather conditions to provide user-friendly descriptions
- Generates context-aware weather advisories

## Environment Variables

```bash
WEATHER_API=
GROQ_API_KEY=
```

## Setup

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Rename .env.example file with required API keys

4. Run development server
```bash
npm run dev
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT

## Acknowledgments

- OpenWeatherMap for weather data
- Nominatim for location services
- GROQ for AI-powered recommendations