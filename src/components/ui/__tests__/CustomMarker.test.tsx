import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { CustomMarker } from '../CustomMarker' // Adjust the path if needed
import { Shop } from '@/api/types'

// ✅ Mock the Marker component from react-native-maps
jest.mock('react-native-maps', () => {
    const { View } = require('react-native')
    return {
        Marker: ({ children, ...props }: any) => (
            <View {...props}>{children}</View>
        ),
    }
})

// ✅ Mock data for a shop
const mockShop: Shop = {
    id: 1,
    name: 'Test Shop',
    address: '123 Test Street',
    coordinates: {
        latitude: '59.9139',
        longitude: '10.7522',
    },
    openingHours: undefined, // Optional based on your type
}

describe('CustomMarker', () => {
    it('renders with collapsed view', () => {
        const { getByText, getByLabelText } = render(
            <CustomMarker
                marker={mockShop}
                isExpanded={false}
                onPress={jest.fn()}
            />
        )

        // Should show only the first letter of the name
        expect(getByText('T')).toBeTruthy()

        // Should have proper accessibility label
        expect(
            getByLabelText('Location: Test Shop, Address: 123 Test Street')
        ).toBeTruthy()
    })

    it('renders with expanded view', () => {
        const { getByText } = render(
            <CustomMarker
                marker={mockShop}
                isExpanded={true}
                onPress={jest.fn()}
            />
        )

        // Full shop name should be shown
        expect(getByText('Test Shop')).toBeTruthy()
    })

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn()

        const { getByLabelText } = render(
            <CustomMarker
                marker={mockShop}
                isExpanded={false}
                onPress={onPressMock}
            />
        )

        const marker = getByLabelText(
            'Location: Test Shop, Address: 123 Test Street'
        )

        fireEvent.press(marker)
        expect(onPressMock).toHaveBeenCalled()
    })
})
