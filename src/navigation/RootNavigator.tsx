import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '@/screens/HomeScreen'
import AboutScreen from '@/screens/AboutScreen'
import ScissorScreen from '@/screens/ScissorScreen'
import Entypo from '@expo/vector-icons/Entypo'
import Octicons from '@expo/vector-icons/Octicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    animation: 'shift',
                    tabBarStyle: {
                        position: 'absolute',
                        borderTopWidth: 0,
                        backgroundColor: '#000000',
                    },
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFDD00',
                    tabBarInactiveTintColor: '#3c3c3c',
                    tabBarIconStyle: {
                        marginTop: 4,
                        width: 28,
                        height: 28,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="map-marker-radius-outline"
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Dine bestillinger"
                    component={ScissorScreen}
                    options={{
                        headerTitleStyle: { color: '#FFFFFF' },
                        headerShown: true,
                        headerStyle: { backgroundColor: '#000000' },
                        tabBarIcon: ({ color }) => (
                            <Entypo
                                name="scissors"
                                size={28}
                                color={color}
                                style={{ transform: [{ rotate: '-45deg' }] }}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profil"
                    component={AboutScreen}
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: '#000000' },
                        headerTitleStyle: { color: '#FFFFFF' },
                        tabBarIcon: ({ color }) => (
                            <Octicons name="person" size={28} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
