import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../pages/home/home';
import Chat from '../pages/chat/chat';
import Login from '../pages/login/components/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Profile from '../pages/profile/profile';
import Match from '../pages/match/match';
import Home_login from '../pages/login/home_login';
import CreatePet from '../pages/profile/componentes/createPet/createPet';
const Tab = createBottomTabNavigator<any>();
const Slack = createStackNavigator<any>();

export default function AppNavigation() {
    const [user, setUser] = React.useState(null);

    async function loadUserFromStorage() {
        try {
            const userJson = await AsyncStorage.getItem('user');
            const storedUser = userJson ? JSON.parse(userJson) : null;
            setUser(storedUser);
        } catch (error) {
            console.error('Error al cargar el usuario desde AsyncStorage', error);
        }
    }

    useEffect(() => {
        loadUserFromStorage();
    }, []);

    if (!user) {
        return (
            <NavigationContainer>
                <Slack.Navigator screenOptions={{
                    headerTitle: () => <></>,
                    headerStyle: {
                        backgroundColor: '#ffffff',
                        height: 0,
                    },
                }}>
                    <Slack.Screen name="home_login">
                        {(props) => <Home_login {...props} loadUserFromStorage={loadUserFromStorage} />}
                    </Slack.Screen>
                    <Slack.Screen name="login">
                        {(props) => <Login {...props} loadUserFromStorage={loadUserFromStorage} />}
                    </Slack.Screen>
                    <Slack.Screen name="resgiter">
                        {(props) => <Login {...props} loadUserFromStorage={loadUserFromStorage} />}
                    </Slack.Screen>
                </Slack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        // Routing ya logueado
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                headerTitle: () => <></>,
                headerStyle: {
                    backgroundColor: '#ffffff',
                    height: 0,
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'sms') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else {
                        iconName = focused ? 'flame' : 'flame-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="home">
                    {(props) => <Home {...props} loadUserFromStorage={loadUserFromStorage} />}
                </Tab.Screen>
                <Tab.Screen name="match">
                    {(props) => <Match {...props} loadUserFromStorage={loadUserFromStorage} />}
                </Tab.Screen>
                <Tab.Screen name="sms">
                    {(props) => <Chat {...props} loadUserFromStorage={loadUserFromStorage} />}
                </Tab.Screen>
                <Tab.Screen name="profile">
                    {(props) => <Profile {...props} loadUserFromStorage={loadUserFromStorage} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )


}
