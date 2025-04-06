import { Text, View, StyleSheet } from 'react-native'
import Button from '@/components/ui/Button'

export default function ScissorScreen() {
    return (
        <View style={styles.container}>
            <Button
                title="Press me"
                onPress={() => {
                    console.log('Pressed')
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
})
