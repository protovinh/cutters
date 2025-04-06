import { Shop } from '@/api/types'
import React, { useState } from 'react'
import { Marker } from 'react-native-maps'
import { View, Text, StyleSheet, Pressable } from 'react-native'

interface Props {
    marker: Shop
}

export function CustomMarker(props: Props) {
    const latitude = parseFloat(props.marker.coordinates.latitude)
    const longitude = parseFloat(props.marker.coordinates.longitude)

    const [expanded, setExpanded] = useState(false)

    if (isNaN(latitude) || isNaN(longitude)) {
        console.log(`Invalid coordinates for marker ${props.marker.id}`)
        return null
    }

    return (
        <Marker
            key={props.marker.id}
            coordinate={{ latitude, longitude }}
            title={props.marker.name}
            description={props.marker.address}
            accessibilityLabel={`Location: ${props.marker.name}, Address: ${props.marker.address}`}
            accessible={true}
            onPress={() => setExpanded(!expanded)}
        >
            <View style={[styles.circle, expanded && styles.circleExpanded]}>
                <Text style={styles.text}>
                    {expanded ? props.marker.name : props.marker.name[0]}
                </Text>
            </View>
        </Marker>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFDD00',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
    },
    circleExpanded: {
        minWidth: 80,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    text: {
        color: 'black',
        fontWeight: '700',
        textAlign: 'center',
    },
})
