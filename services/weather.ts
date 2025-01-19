interface WeatherParams {
  lat: number;
  lon: number;
  exclude?: string[];
  units?: 'standard' | 'metric' | 'imperial';
}

export const weatherService = {
  async getWeather({ lat, lon, exclude = [], units = 'metric' }: WeatherParams, weatherKey: string) {
    try {
      const excludeString = exclude.join(',')
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${excludeString}&units=${units}&appid=${weatherKey}&lang=ru`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching weather:', error)
      throw error
    }
  }
}