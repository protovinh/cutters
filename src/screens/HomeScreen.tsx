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
import { useMapActions } from '@/hooks/useMapActions'
import PagerView from 'react-native-pager-view'
import { useState } from 'react'

export default function HomeScreen() {
    const { location } = useLocationPermission()
    const { data, loading } = useFetchSalons()
    const [expandedMarkerId, setExpandedMarkerId] = useState<number | null>(
        null
    )

    const salonsWithOpeningHours = mockSaloon.salons.map((salon) => {
        const salonHours = openingHours.find(
            (hours) => hours.openinghours.salonId === salon.id
        )
        return {
            ...salon,
            openingHours: salonHours ? salonHours.openinghours : null,
        }
    })
    const { mapRef, pagerRef, handleMarkerPress, handlePageSelected } =
        useMapActions({
            data: salonsWithOpeningHours,
            loading,
            setExpandedMarkerId,
            expandedMarkerId,
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
                ref={mapRef}
                rotateEnabled={false}
                pitchEnabled={false}
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
                    <CustomMarker
                        key={shop.id}
                        marker={shop}
                        isExpanded={expandedMarkerId === shop.id}
                        onPress={() => handleMarkerPress(shop.id)}
                    />
                ))}
            </MapView>
            {loading ? null : (
                <View style={styles.overlayContainer}>
                    <View style={styles.pagerContainer}>
                        <PagerView
                            ref={pagerRef}
                            style={styles.pagerView}
                            initialPage={0}
                            onPageSelected={handlePageSelected}
                            orientation="horizontal"
                        >
                            {salonsWithOpeningHours.map((shop, index) => (
                                <View key={shop.id} style={styles.page}>
                                    <View style={styles.debugPage}>
                                        <SaloonCard
                                            item={shop}
                                            ref={mapRef}
                                            setExpandedMarkerId={
                                                setExpandedMarkerId
                                            }
                                        />
                                    </View>
                                </View>
                            ))}
                        </PagerView>
                    </View>
                </View>
            )}
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
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        pointerEvents: 'box-none',
    },
    pagerContainer: {
        height: 200,
        marginBottom: 80,
        backgroundColor: 'transparent',
    },
    pagerView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    page: {
        flex: 1,
        pointerEvents: 'none',
    },
    debugPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        pointerEvents: 'none',
    },
})
