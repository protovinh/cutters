import { Text, View, StyleSheet } from 'react-native'
import Button from '@/components/ui/Button'

export default function AktivScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Press me"
                    onPress={() => {
                        console.log('Aktive')
                    }}
                />
            </View>
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
    buttonContainer: {
        marginHorizontal: 10,
        display: 'flex',
        width: '100%',
    },
    text: {
        color: '#fff',
    },
})
