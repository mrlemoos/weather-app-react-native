import { FC, memo, useCallback, useEffect, useRef } from 'react'
import { Animated, StyleSheet, View, TouchableOpacity } from 'react-native'

import { Feather as FIcon } from '@expo/vector-icons'
import { primaryColor } from 'weather/views/constants/Constants'

import type FloatingActionButtonProps from './FloatingActionButtonProps'

const ANIMATION_DURATION = 400
const ANIMATION_DELAY = 5000
const ANIMATION_USE_NATIVE_DRIVER = false

const FloatingActionButton: FC<FloatingActionButtonProps> = ({ onTap }) => {
  const animationRef = useRef(new Animated.Value(0)).current

  const animateOut = useCallback(() => {
    Animated.timing(animationRef, {
      toValue: 0,
      useNativeDriver: ANIMATION_USE_NATIVE_DRIVER,
      duration: ANIMATION_DURATION,
      delay: ANIMATION_DELAY,
    }).start()
  }, [animationRef])

  const animateIn = useCallback(() => {
    Animated.timing(animationRef, {
      toValue: 1,
      useNativeDriver: ANIMATION_USE_NATIVE_DRIVER,
      duration: ANIMATION_DURATION,
      delay: ANIMATION_DELAY,
    }).start(({ finished }) => {
      if (finished) {
        animateOut()
      }
    })
  }, [animationRef, animateOut])

  useEffect(() => {
    animateIn()
  }, [])

  return (
    <TouchableOpacity onPress={onTap}>
      <Animated.View
        style={[
          styles.position,
          styles.containerButton,
          {
            width: animationRef.interpolate({
              inputRange: [0, 1],
              outputRange: [60, 200],
            }),
            borderRadius: animationRef.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 8],
            }),
          },
        ]}>
        <View style={styles.content}>
          <Animated.View>
            <FIcon name='search' size={20} color={primaryColor} />
          </Animated.View>
          <Animated.Text
            style={{
              opacity: animationRef,
              width: animationRef.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 140],
              }),
            }}>
            Tap here to Search
          </Animated.Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default memo(FloatingActionButton)

const styles = StyleSheet.create({
  containerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    position: 'absolute',
    bottom: 56,
    right: 30,
  },
})
