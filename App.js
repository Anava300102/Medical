import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ServicesScreen from './src/screens/ServicesScreen';
import NewServiceScreen from './src/screens/NewServiceScreen';
import RolScreen from './src/screens/RolScreen';
import EspecialistaScreen from './src/screens/EspecialistaScreen';
import RepartidorScreen from './src/screens/RepartidorScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ClienteScreen from './src/screens/ClienteScreen';
import VisitScreen from './src/screens/VisitScreen';
import PharmacyScreen from './src/screens/PharmacyScreen';
import GeneralDoctorScreen from './src/screens/GeneralDoctorScreen';
import SpecialistScreen from './src/screens/SpecialistScreen';
import ProductsPharmacyScreen from './src/screens/ProductsPharmacyScree';
import OrdersScreen from './src/screens/OrdersScreen';
import ConfirmAppointmentScreen from './src/screens/ConfirmAppointmentScreen';
import { LanguageProvider } from './Context';
import { OrientationProvider } from './OrientationProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <OrientationProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            {/* Uso correcto de Stack.Screen */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen name="NewService" component={NewServiceScreen} />
            <Stack.Screen name="Rol" component={RolScreen} />
            <Stack.Screen name="Especialista" component={EspecialistaScreen} />
            <Stack.Screen name="Repartidor" component={RepartidorScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Cliente" component={ClienteScreen} />
            <Stack.Screen name="VisitScreen" component={VisitScreen} />
            <Stack.Screen name="PharmacyScreen" component={PharmacyScreen} />
            <Stack.Screen name="GeneralDoctorScreen" component={GeneralDoctorScreen} />
            <Stack.Screen name="SpecialistScreen" component={SpecialistScreen} />
            <Stack.Screen name="ProductsPharmacy" component={ProductsPharmacyScreen} />
            <Stack.Screen name="AppointmentsOrders" component={OrdersScreen} />
            <Stack.Screen name="ConfirmAppointmentScreen" component={ConfirmAppointmentScreen} options={{ title: 'Confirmar cita' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </OrientationProvider>
  );
}
