import { Shop } from '@/api/types'
import React, { useState, memo } from 'react'
import { Marker } from 'react-native-maps'
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'

interface Props {
    marker: Shop
    isExpanded: boolean
    onPress: () => void
}

export function CustomMarkerComponent(props: Props) {
    const latitude = parseFloat(props.marker.coordinates.latitude)
    const longitude = parseFloat(props.marker.coordinates.longitude)

    if (isNaN(latitude) || isNaN(longitude)) {
        console.log(`Invalid coordinates for marker ${props.marker.id}`)
        return null
    }

    return (
        <Marker
            key={props.marker.id}
            coordinate={{ latitude, longitude }}
            accessibilityLabel={`Location: ${props.marker.name}, Address: ${props.marker.address}`}
            accessible={true}
            onPress={() => props.onPress()}
            tracksViewChanges={Platform.OS === 'android'}
        >
            <View
                style={[
                    styles.circle,
                    props.isExpanded && styles.circleExpanded,
                ]}
            >
                <Text style={styles.text}>
                    {props.isExpanded
                        ? props.marker.name
                        : props.marker.name[0]}
                </Text>
            </View>
        </Marker>
    )
}

export const CustomMarker = memo(
    CustomMarkerComponent,
    (prevProps, nextProps) => {
        return prevProps.isExpanded === nextProps.isExpanded
    }
)

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
        minWidth: 150,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    text: {
        color: 'black',
        fontWeight: '700',
        textAlign: 'center',
    },
})
