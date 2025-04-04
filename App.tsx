import 'expo-dev-client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
    return (
        <SafeAreaProvider>
            <RootNavigator />
        </SafeAreaProvider>
    )
}
