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
                    tabBarActiveTintColor: '#FFDD00',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        backgroundColor: 'black',
                    },
                    headerShown: false,
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
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Scissor"
                    component={ScissorScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <Entypo name="scissors" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <Octicons name="person" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
