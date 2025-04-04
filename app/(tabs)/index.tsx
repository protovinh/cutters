import 'expo-dev-client'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocationPermission } from '@/src/hooks/useLocationPermission'
import { useFetchSalons } from '@/src/api/useFetchSalons'
import CuttersMapStyle from '@/src/constants/CuttersMapStyle.json'

export default function App() {
    const { location } = useLocationPermission()
    const { data, loading } = useFetchSalons()

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
                {data.map((marker) => {
                    const latitude = parseFloat(marker.coordinates.latitude)
                    const longitude = parseFloat(marker.coordinates.longitude)

                    if (isNaN(latitude) || isNaN(longitude)) {
                        console.log(
                            `Invalid coordinates for marker ${marker.id}`
                        )
                        return null
                    }

                    return (
                        <Marker
                            key={marker.id}
                            coordinate={{ latitude, longitude }}
                            title={marker.name}
                            description={marker.address}
                        />
                    )
                })}
            </MapView>

            <View style={styles.listContainer}>
                <FlatList
                    horizontal={true}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemAddress}>
                                {item.address}
                            </Text>
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
})
