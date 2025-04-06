import 'expo-dev-client'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    Pressable,
    AccessibilityInfo,
} from 'react-native'
import { useState } from 'react'
import { mockSaloon } from '@/api/mocks/saloonNorge'
import { openingHours } from '@/api/mocks/openingHours'
import { useFetchSalons } from '@/api/useFetchSalons'

export function SaloonCard() {
    const [expandedShopId, setExpandedShopId] = useState<number | null>(null)
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

    const toggleOpeningHours = (shopId: number) => {
        setExpandedShopId((prevId) => (prevId === shopId ? null : shopId))
    }
    return (
        <View style={styles.listContainer}>
            <FlatList
                horizontal={true}
                data={salonsWithOpeningHours}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemAddress}>{item.address}</Text>
                        <Pressable
                            onPress={() => toggleOpeningHours(item.id)}
                            style={styles.dropdownButton}
                            accessibilityRole="button"
                            accessibilityLabel={
                                expandedShopId === item.id
                                    ? `Hide opening hours for ${item.name}`
                                    : `Show opening hours for ${item.name}`
                            }
                        >
                            <Text style={styles.dropdownText}>
                                {expandedShopId === item.id
                                    ? 'Hide Opening Hours'
                                    : 'Show Opening Hours'}
                            </Text>
                        </Pressable>

                        {expandedShopId === item.id && item.openingHours && (
                            <View
                                style={styles.openingHoursContainer}
                                accessible
                                accessibilityLabel={`Opening hours for ${item.name}`}
                            >
                                {Object.keys(item.openingHours.schedule).map(
                                    (day) => {
                                        const schedule =
                                            item.openingHours?.schedule[
                                                day as keyof typeof item.openingHours.schedule
                                            ]
                                        return (
                                            <View key={day} style={styles.day}>
                                                <Text style={styles.dayName}>
                                                    {day}:
                                                </Text>
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
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        position: 'absolute',
        bottom: 60,
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
