import 'expo-dev-client'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'

interface Shop {
    id: number
    name: string
    address: string
    coordinates: {
        latitude: string
        longitude: string
    }
}

export default function App() {
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    )
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [data, setData] = useState<Shop[]>([])

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }

            let currentLocation = await Location.getCurrentPositionAsync({})
            setLocation(currentLocation)
        }

        getCurrentLocation()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await fetch(
                    'https://api.test.cutters.no/v2/salons'
                )
                const apiData: Shop[] = await apiResponse.json()
                setData(apiData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
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
