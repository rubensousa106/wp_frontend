import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/components/Login';
import Dashboard from './src/components/Dashboard';
import EditProfile from './src/components/EditProfile';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator id="mainStack" initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerTitle: 'Dashboard' }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ headerTitle: 'Editar Perfil' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
