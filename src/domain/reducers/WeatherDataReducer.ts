import type WeatherDataFetchActionPayloadShape from './interfaces/WeatherDataFetchActionPayloadShape'

export const initialState: WeatherDataFetchActionPayloadShape = {
  data: {
    city: 'NewYork',
    data: {} as any,
  },
} as WeatherDataFetchActionPayloadShape

const weatherDataReducer = (
  state = initialState,
  {
    type,
    payload,
  }: {
    type: 'weatherData/fetch'
    payload: WeatherDataFetchActionPayloadShape
  }
) => {
  switch (type) {
    case 'weatherData/fetch':
      return payload
    default:
      return state
  }
}

export default weatherDataReducer
