import ForecastShape from './ForecastShape'

interface WeatherDataReducerShape {
  city: string
  data: {
    temperature: string
    wind: string
    description: string
    forecast: ForecastShape[]
  }
}

export default WeatherDataReducerShape
