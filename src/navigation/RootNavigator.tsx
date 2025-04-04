import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '@/screens/HomeScreen'
import AboutScreen from '@/screens/AboutScreen'

const Tab = createBottomTabNavigator()

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
