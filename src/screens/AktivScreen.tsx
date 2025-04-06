import { Text, View, StyleSheet } from 'react-native'
import Button from '@/components/ui/Button'

export default function AktivScreen() {
    return (
        <View style={styles.container}>
            <Button
                title="Aktive"
                onPress={() => {
                    console.log('Aktive')
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
