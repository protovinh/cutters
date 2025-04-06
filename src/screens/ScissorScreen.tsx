import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AktivScreen from './AktivScreen'
import HistoryScreen from './HistoryScreen'

const Tab = createMaterialTopTabNavigator()

export default function ScissorScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#FFDD00',

                tabBarStyle: { backgroundColor: '#25292e' },
                tabBarIndicatorStyle: {
                    backgroundColor: '#FFDD00',
                    padding: 2,
                },
            }}
        >
            <Tab.Screen name="Home" component={AktivScreen} />
            <Tab.Screen name="Profile" component={HistoryScreen} />
        </Tab.Navigator>
    )
}
