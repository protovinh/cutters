import 'expo-dev-client'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocationPermission } from '@/hooks/useLocationPermission'
import { useFetchSalons } from '@/api/useFetchSalons'
import CuttersMapStyle from '@/constants/CuttersMapStyle.json'
import { CustomMarker } from '@/components/ui/CustomMarker'
import { mockSaloon } from '@/api/mocks/saloonNorge'
import { openingHours } from '@/api/mocks/openingHours'
import { SaloonCard } from '@/components/ui/SaloonCard'

export default function HomeScreen() {
    const { location } = useLocationPermission()
    const { data, loading } = useFetchSalons()

    const salonsWithOpeningHours = mockSaloon.salons.map((salon) => {
        const salonHours = openingHours.find(
            (hours) => hours.openinghours.salonId === salon.id
        )
        return {
            ...salon,
            openingHours: salonHours ? salonHours.openinghours : null,
        }
    })

    return (
        <View style={styles.container}>
            {loading ? (
                <View>
                    <ActivityIndicator />
                </View>
            ) : null}
            <MapView
                style={styles.map}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
                customMapStyle={CuttersMapStyle}
                initialRegion={{
                    latitude: location?.coords.latitude ?? 60.3913,
                    longitude: location?.coords.longitude ?? 5.3221,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {salonsWithOpeningHours.map((shop) => (
                    <CustomMarker key={shop.id} marker={shop} />
                ))}
            </MapView>
            {SaloonCard()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})
