import { Text, View, StyleSheet } from 'react-native'
import Button from '@/components/ui/Button'

export default function AboutScreen() {
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
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
})
