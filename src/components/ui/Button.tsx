import React from 'react'
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

interface Props {
    title: string
    onPress: () => void
    disabled?: boolean
}

const Button = (props: Props) => {
    if (props.disabled) {
        return (
            <Pressable disabled={true} style={styles.disabledContainer}>
                <Text style={styles.disabledText}>{props.title}</Text>
            </Pressable>
        )
    }
    return (
        <Pressable style={styles.buttonContainer} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFDD00',
        borderRadius: 100,
        padding: 12,
        width: '100%',
    },
    disabledContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 100,
        padding: 12,
        width: '100%',
        borderWidth: 2,
        borderColor: 'grey',
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 700,
    },
    disabledText: {
        color: 'grey',
        fontSize: 15,
        fontWeight: 700,
    },
})

export default Button
