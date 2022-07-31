import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { DrawerParamList, NavigatorParamList } from '../../core/types';
import { Dashboard, ForgotPasswordScreen, HomeScreen, LoginScreen, MapScreen, ProductsScreen, RegisterScreen } from '../../screens';
import { useFirebaseAuth } from '../../core/FirebaseAuthContext';
import { StyleSheet, View } from 'react-native';

export const Navigation = () => {
  const user = useFirebaseAuth();
  const Stack = createNativeStackNavigator<NavigatorParamList>();
  const Drawer = createDrawerNavigator<DrawerParamList>();

  const CustomDrawerContent = props => (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.separator} />
      <DrawerItem label="Help" onPress={() => console.log('here')} />
    </DrawerContentScrollView>
  );

  const Root = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerHideStatusBarOnOpen: false,
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
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user ? 'Root' : 'Home'}>
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

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
});
