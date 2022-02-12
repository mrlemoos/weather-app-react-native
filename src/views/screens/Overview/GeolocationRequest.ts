import { useEffect, useState } from 'react'

import * as Location from 'expo-location'

import type GeolocationPermissionStatus from './GeolocationPermissionStatus'
import type GeolocationResult from './GeolocationResult'

function GeolocationRequest() {
  const useGeolocation = (): {
    permissionStatus: GeolocationPermissionStatus
    location: GeolocationResult
  } => {
    const [location, setLocation] = useState<GeolocationResult>()
    const [permissionStatus, setPermissionStatus] = useState<GeolocationPermissionStatus>(
      Location.PermissionStatus.UNDETERMINED
    )

    useEffect(() => {
      ;(async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        setPermissionStatus(status)

        if (status !== 'granted') {
          return
        }

        const location = await Location.getCurrentPositionAsync({})
        setLocation(location)
      })()
    }, [])

    return {
      location,
      permissionStatus,
    }
  }

  return { useGeolocation }
}

export default GeolocationRequest
