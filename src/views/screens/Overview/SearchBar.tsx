import { FC, useCallback, useMemo, useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'

import BottomSheet from '@gorhom/bottom-sheet'
import throttle from 'lodash.throttle'

import SearchBarProps from './SearchBarProps'
import WeatherDataReducerShape from 'weather/domain/reducers/interfaces/WeatherDataReducerShape'
import fetchWeather from './fetchWeather'

const SearchBar: FC<SearchBarProps> = ({ onClose, onSelect }) => {
  const [storedSearchTerm, storeSearchTerm] = useState('')
  const [storedData, storeData] = useState<WeatherDataReducerShape['data']>(
    {} as WeatherDataReducerShape['data']
  )
  const [isLoading, setLoading] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>()
  const readBottomSheetRef = (ref: BottomSheet) => {
    bottomSheetRef.current = ref
  }
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  const handleChangeText = useCallback((text: string) => storeSearchTerm(text), [storeSearchTerm])

  const handleTap = useCallback(() => {
    if (storedSearchTerm.length === 0) {
      return
    }

    onSelect(storedSearchTerm)
    bottomSheetRef.current?.close()
  }, [storedSearchTerm, bottomSheetRef.current?.close, onSelect])

  const handleSearch = useCallback(
    throttle(
      async () => {
        if (storedSearchTerm.length > 0) {
          setLoading(true)

          const data = await fetchWeather(storedSearchTerm)

          storeData(data)
          setLoading(false)
        }
      },
      200,
      { leading: false }
    ),
    [setLoading, storeData, storedSearchTerm]
  )

  useMemo<void>(() => {
    if (storedSearchTerm.length > 0) {
      handleSearch()
    }
  }, [storedSearchTerm, handleSearch])

  return (
    <View style={styles.container}>
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        ref={readBottomSheetRef}
        onClose={onClose}
        enablePanDownToClose>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Search for a City</Text>
            <TextInput style={styles.input} placeholder='Search' onChangeText={handleChangeText} />
          </View>
          <View>
            {storedSearchTerm.length > 0 && Object.keys(storedData).length > 0 && (
              <TouchableOpacity onPress={handleTap}>
                <View style={styles.row}>
                  {isLoading && (
                    <View style={{ marginRight: 8 }}>
                      <ActivityIndicator size='small' />
                    </View>
                  )}
                  <Text>
                    <Text style={{ fontWeight: 'bold' }}>{storedSearchTerm}</Text>{' '}
                    {storedData.temperature} {storedData.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inputContainer: {
    height: 300,
    padding: 24,
  },
  input: {
    fontSize: 16,
    paddingVertical: 6,
    lineHeight: 18,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#eee',
    padding: 8,
  },
})
