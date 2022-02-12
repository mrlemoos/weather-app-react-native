import { FC, useCallback, useMemo, useReducer, useRef, useLayoutEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, Text, Platform } from 'react-native'

import { Feather as FIcon } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar'
import { lighten } from 'polished'

import { primaryColor } from 'weather/views/constants/Constants'
import weatherDataReducer, {
  initialState as weatherDataInitialState,
} from 'weather/domain/reducers/WeatherDataReducer'
import fetchWeather from './fetchWeather'
import Card from 'weather/views/components/Card/Card'
import GeolocationRequest from './GeolocationRequest'
import FloatingActionButton from 'weather/views/components/FloatingActionButton/FloatingActionButton'
import SearchBar from './SearchBar'

const days: { [key: string]: string } = {
  1: 'Sunday',
  2: 'Monday',
  3: 'Tuesday',
  4: 'Wednesday',
  5: 'Thursday',
  6: 'Friday',
  7: 'Saturday',
}

const { useGeolocation } = GeolocationRequest()

const Overview: FC = () => {
  const [isSearchBottomSheetVisible, setSearchBottomSheetVisible] = useState(false)
  const [localState, dispatchAction] = useReducer(weatherDataReducer, weatherDataInitialState)
  const cityRef = useRef('New York')

  const { location, permissionStatus } = useGeolocation()

  const emojiTextEl = useMemo(() => {
    let iconName = ''

    switch (localState.data.data.description) {
      case 'Sunny':
      case 'Clear':
        iconName = 'sun'
        break
      case 'Partly cloudy':
        iconName = 'cloud'
        break
      case 'Rainy':
        iconName = 'cloud-drizzle'
        break
      case 'Snowy':
        iconName = 'cloud-snow'
        break
    }

    return <FIcon name={iconName as any} size={48} color='#f5f5f5' />
  }, [localState.data.data.description])

  const handleTapFloatingActionButton = useCallback(
    () => setSearchBottomSheetVisible(true),
    [setSearchBottomSheetVisible]
  )

  const handleCloseSearchBottomSheet = useCallback(
    () => setSearchBottomSheetVisible(false),
    [setSearchBottomSheetVisible]
  )

  const handleCityChange = useCallback(async () => {
    const res = await fetchWeather(cityRef.current.replace(/\s/g, ''))
    dispatchAction({
      type: 'weatherData/fetch',
      payload: {
        data: {
          city: cityRef.current,
          data: res,
        },
      },
    })
  }, [dispatchAction, cityRef.current])

  const handleSelect = useCallback((town: string) => {
    cityRef.current = town
    handleCityChange()
  }, [])

  useLayoutEffect(() => {
    setStatusBarStyle('dark')

    if (Platform.OS === 'android') {
      setStatusBarTranslucent(true)
    }

    return () => {
      setStatusBarStyle('auto')
    }
  }, [])

  useLayoutEffect(() => {
    handleCityChange()
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f5f5f5', primaryColor, lighten(0.3, primaryColor), primaryColor]}
        style={styles.linearGradient}>
        <SafeAreaView>
          <View style={styles.page}>
            <Text style={styles.title}>Overview</Text>
          </View>
          {typeof localState.data.data.temperature === 'string' && (
            <View style={styles.titleContainer}>
              <Text style={styles.temperature}>
                {localState.data.data.temperature.replace('+', '')}
              </Text>
              <Text style={styles.emoji}>{emojiTextEl}</Text>
              <Text style={styles.description}>{localState.data.data.description}</Text>
            </View>
          )}
          {Object.keys(localState.data.data).length > 0 && (
            <View style={styles.cardContainer}>
              <Card>
                <View>
                  <Text style={styles.city}>{localState.data.city}</Text>
                  <View style={styles.details}>
                    <Text>
                      Wind is currently at{' '}
                      <Text style={{ fontWeight: 'bold' }}>{localState.data.data.wind}</Text>
                    </Text>
                  </View>
                  <View style={styles.forecast}>
                    {localState.data.data.forecast.map(({ day, temperature, wind }) => (
                      <View style={styles.forecastDay} key={`${day}${temperature}${wind}`}>
                        {/* ☀️🌅🌤🌦⛅️🌥 */}
                        <Text style={styles.forecastTitle}>{days[day]}</Text>
                        <Text>
                          Expect to be <Text style={{ fontWeight: 'bold' }}>{temperature}</Text>
                        </Text>
                        <Text>
                          Wind at <Text style={{ fontWeight: 'bold' }}>{wind}</Text>
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Card>
            </View>
          )}
        </SafeAreaView>
      </LinearGradient>
      <FloatingActionButton onTap={handleTapFloatingActionButton} />
      {isSearchBottomSheetVisible && (
        <SearchBar onSelect={handleSelect} onClose={handleCloseSearchBottomSheet} />
      )}
    </View>
  )
}

export default Overview

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#141414',
  },
  page: {
    paddingHorizontal: 30,
    paddingTop: 12,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  temperature: {
    fontSize: 36,
    color: '#000',
  },
  city: {
    fontSize: 24,
    marginBottom: 12,
  },
  cardContainer: {
    alignItems: 'center',
  },
  details: {
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecast: {
    marginTop: 60,
  },
  forecastDay: {
    fontSize: 20,
    fontWeight: 'bold',
    maxHeight: 100,
    marginBottom: 12,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastEmoji: {
    position: 'absolute',
    top: -10,
    left: -10,
  },
  emoji: {
    fontSize: 56,
    marginTop: 30,
  },
  description: {
    fontSize: 14,
    color: '#f5f5f5',
  },
})
