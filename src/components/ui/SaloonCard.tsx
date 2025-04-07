import 'expo-dev-client'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import { Shop } from '@/api/types'
import React from 'react'

interface Props {
    item: Shop
    setExpandedMarkerId: (id: number) => void
}
export const SaloonCard = React.forwardRef((props: Props, ref: any) => {
    const [expandedShopId, setExpandedShopId] = useState<number | null>(null)

    /*     const toggleOpeningHours = (shopId: number) => {
        setExpandedShopId((prevId) => (prevId === shopId ? null : shopId))
    } */
    const handleItemPress = (item: Shop) => {
        try {
            if (ref && item.coordinates) {
                props.setExpandedMarkerId(item.id)
                setExpandedShopId((prevId) =>
                    prevId === item.id ? null : item.id
                )

                setTimeout(() => {
                    if (ref.current) {
                        ref.current.animateToRegion(
                            {
                                latitude: parseFloat(item.coordinates.latitude),
                                longitude: parseFloat(
                                    item.coordinates.longitude
                                ),
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            },
                            1000
                        )
                    }
                }, 100)
            }
        } catch (error) {
            console.error('Error animating map:', error)
        }
    }
    return (
        <Pressable
            onPress={() => {
                handleItemPress(props.item)
            }}
            style={styles.item}
        >
            <Text style={styles.itemName}>{props.item.name}</Text>
            <Text style={styles.itemAddress}>{props.item.address}</Text>
            {/*  <Pressable
                onPress={() => toggleOpeningHours(props.item.id)}
                style={styles.dropdownButton}
                accessibilityRole="button"
                accessibilityLabel={
                    expandedShopId === props.item.id
                        ? `Hide opening hours for ${props.item.name}`
                        : `Show opening hours for ${props.item.name}`
                }
            >
                <Text style={styles.dropdownText}>
                    {expandedShopId === props.item.id
                        ? 'Hide Opening Hours'
                        : 'Show Opening Hours'}
                </Text>
            </Pressable> */}

            {expandedShopId === props.item.id && props.item.openingHours && (
                <View
                    style={styles.openingHoursContainer}
                    accessible
                    accessibilityLabel={`Opening hours for ${props.item.name}`}
                >
                    {Object.keys(props.item.openingHours.schedule).map(
                        (day) => {
                            const schedule =
                                props.item.openingHours?.schedule[
                                    day as keyof typeof props.item.openingHours.schedule
                                ]
                            return (
                                <View key={day} style={styles.day}>
                                    <Text style={styles.dayName}>{day}:</Text>
                                    <Text style={styles.dayHours}>
                                        {schedule?.isOpen
                                            ? `Open from ${schedule.periods[0].from.hours}:${schedule.periods[0].from.minutes < 10 ? '0' : ''}${schedule.periods[0].from.minutes} to ${schedule.periods[0].to.hours}:${schedule.periods[0].to.minutes < 10 ? '0' : ''}${schedule.periods[0].to.minutes}`
                                            : 'Closed'}
                                    </Text>
                                </View>
                            )
                        }
                    )}
                </View>
            )}
        </Pressable>
    )
})

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    item: {
        padding: 20,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        color: 'rgba(0, 0, 0, 0.95)',
    },
    dropdownButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#FFDD00',
        borderRadius: 5,
        alignItems: 'center',
    },
    dropdownText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    openingHoursContainer: {
        marginTop: 10,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
    },
    day: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    dayName: {
        fontWeight: '600',
        marginRight: 5,
    },
    dayHours: {
        fontWeight: '400',
    },
})
