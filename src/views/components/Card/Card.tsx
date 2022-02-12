import { FC, memo } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'

import type CardProps from './CardProps'

const { width } = Dimensions.get('screen')

const Card: FC<CardProps> = ({ children }) => <View style={styles.container}>{children}</View>

export default memo(Card)

const styles = StyleSheet.create({
  container: {
    width: width - 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
})
