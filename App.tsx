import 'expo-dev-client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootNavigator from './src/navigation/RootNavigator'
import { StatusBar } from 'expo-status-bar'

export default function App() {
    return (
        <SafeAreaProvider style={{ backgroundColor: '#1a1a1a' }}>
            <StatusBar style="light" />
            <RootNavigator />
        </SafeAreaProvider>
    )
}
