import 'expo-dev-client'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocationPermission } from '@/hooks/useLocationPermission'
import { useFetchSalons } from '@/api/useFetchSalons'
import CuttersMapStyle from '@/constants/CuttersMapStyle.json'
import { CustomMarker } from '@/components/ui/CustomMarker'
import { mockSaloon } from '@/api/mocks/saloonNorge'
import { openingHours } from '@/api/mocks/openingHours'

export default function HomeScreen() {
    const { location } = useLocationPermission()
    const { data, loading } = useFetchSalons()

    // Combine mock salon data with opening hours data
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

            <View style={styles.listContainer}>
                <FlatList
                    horizontal={true}
                    data={salonsWithOpeningHours}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemAddress}>
                                {item.address}
                            </Text>
                            {item.openingHours && (
                                <Text style={styles.itemOpeningHours}>
                                    Opening hours:{' '}
                                    {item.openingHours.schedule.mon.isOpen
                                        ? 'Open'
                                        : 'Closed'}
                                </Text>
                            )}
                        </View>
                    )}
                />
            </View>
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
    listContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        maxHeight: Dimensions.get('screen').height * 0.3,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        margin: 10,
    },
    item: {
        padding: 20,
        width: Dimensions.get('screen').height * 0.3,
        margin: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderRadius: 16,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(250, 236, 43, 0.95)',
    },
    itemAddress: {
        fontSize: 13,
        color: 'rgba(250, 236, 43, 0.95)',
    },
    itemOpeningHours: {
        fontSize: 12,
        color: 'rgba(250, 236, 43, 0.95)',
    },
})
