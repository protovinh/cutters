import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export function useLocationPermission() {
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    )

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }

            let currentLocation = await Location.getCurrentPositionAsync({})
            setLocation(currentLocation)
        }

        getCurrentLocation()
    }, [])
    return { location }
}
