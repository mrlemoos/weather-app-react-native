import WeatherDataFetchActionPayloadShape from './interfaces/WeatherDataFetchActionPayloadShape'

const weatherDataReducerActions = {
  'weatherData/fetch': (payload: WeatherDataFetchActionPayloadShape) => ({
    type: 'weatherData/fetch',
    payload,
  }),
}

export default weatherDataReducerActions
