import { FC } from 'react'
import { View } from 'react-native'

import { StatusBar } from 'expo-status-bar'

import Overview from 'weather/views/screens/Overview/Overview'

const AppRoot: FC = () => (
  <>
    <Overview />
    <StatusBar style='light' />
  </>
)

export default AppRoot
