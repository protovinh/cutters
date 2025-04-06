import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import Button from '../Button'

describe('Button', () => {
    it('renders correctly with title', () => {
        const { getByText } = render(
            <Button title="Click Me" onPress={() => {}} />
        )
        expect(getByText('Click Me')).toBeTruthy()
    })

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn()
        const { getByText } = render(
            <Button title="Click Me" onPress={onPressMock} />
        )

        fireEvent.press(getByText('Click Me'))

        expect(onPressMock).toHaveBeenCalledTimes(1)
    })

    it('does not call onPress when disabled', () => {
        const onPressMock = jest.fn()
        const { getByText } = render(
            <Button title="Click Me" onPress={onPressMock} disabled={true} />
        )

        fireEvent.press(getByText('Click Me'))

        expect(onPressMock).not.toHaveBeenCalled()
    })

    it('applies accessibility label correctly', () => {
        const { getByLabelText } = render(
            <Button
                title="Click Me"
                onPress={() => {}}
                accessibilityLabel="Custom Label"
            />
        )
        expect(getByLabelText('Custom Label')).toBeTruthy()
    })
})
