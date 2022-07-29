import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
// import firebase from '@react-native-firebase/app';
import { Platform, StyleSheet, View } from 'react-native';

import { DrawerParamList, NavigatorParamList } from './core/types';
import { Dashboard, ForgotPasswordScreen, HomeScreen, LoginScreen, MapScreen, ProductsScreen, RegisterScreen } from './screens';
import { theme } from './core/variables';
import { FirebaseAuthProvider } from './core/FirebaseAuthContext';
import { Icon } from './components/theme';

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     clientId: '',
//     appId: '1:883110208819:android:b4bee915c2053055ae4a46',
//     apiKey: 'AIzaSyDr3j8WAjAEG80u6n5npoAvuOiUsZoh59Q',
//     databaseURL: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     projectId: '',
//   });
//   firebase.firestore();
// } else {
//   firebase.app(); // if already initialized, use that one
// }
console.log('here');

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme} settings={{ icon: props => <Icon {...props} /> }}>
        <FirebaseAuthProvider>
          <Nav />
        </FirebaseAuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export const Nav = () => {
  const Stack = createNativeStackNavigator<NavigatorParamList>();
  const Drawer = createDrawerNavigator<DrawerParamList>();

  const CustomDrawerContent = props => (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ backgroundColor: 'rgb(200, 199, 204)', height: StyleSheet.hairlineWidth }} />
      <DrawerItem label="Help" onPress={() => console.log('here')} />
    </DrawerContentScrollView>
  );

  const Root = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerHideStatusBarOnOpen: true,
          drawerStatusBarAnimation: 'slide',
        }}
        drawerContent={CustomDrawerContent}
        initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Group>
          <Stack.Screen name="Root" component={Root} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" options={{ presentation: 'modal' }} component={ForgotPasswordScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
