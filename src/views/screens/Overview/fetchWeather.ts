import fetchWeatherData from 'weather/domain/asynchronous/weather/fetchWeatherData/fetchWeatherData'
import type WeatherDataReducerShape from 'weather/domain/reducers/interfaces/WeatherDataReducerShape'

async function fetchWeather(city = 'NewYork'): Promise<WeatherDataReducerShape['data']> {
  const data = await fetchWeatherData(city)
  return data
}

export default fetchWeather
