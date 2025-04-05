import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
    title: string
    onPress: () => void
    disabled?: boolean
    accessibilityLabel?: string
}

const Button = ({
    title,
    onPress,
    disabled = false,
    accessibilityLabel,
}: Props) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                disabled ? styles.disabledContainer : styles.buttonContainer,
                pressed && !disabled && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            accessible={true}
            accessibilityLabel={accessibilityLabel || title}
        >
            <Text style={disabled ? styles.disabledText : styles.buttonText}>
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFDD00',
        borderRadius: 100,
        padding: 12,
        width: '100%',
    },
    disabledContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 100,
        padding: 12,
        width: '100%',
        borderWidth: 2,
        borderColor: 'grey',
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '700',
    },
    disabledText: {
        color: 'grey',
        fontSize: 15,
        fontWeight: '700',
    },
})

export default Button
