import WeatherDataReducerShape from 'weather/domain/reducers/interfaces/WeatherDataReducerShape'
import { apiUrl } from '../../../constants/Constants'

const fetchWeatherData = async (city: string) => {
  const raw = await fetch(`${apiUrl}/${city}`, {
    method: 'GET',
  })
  const res = await raw.json()
  return res as WeatherDataReducerShape['data']
}

export default fetchWeatherData
