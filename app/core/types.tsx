import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Navigation extends NativeStackNavigationProp<NavigatorParamList> {}
interface DrawerNavigation extends DrawerNavigationProp<DrawerParamList> {}

export type NavigatorParamList = {
  Home: undefined;
  Root: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
};
export interface NavProps {
  navigation: Navigation;
}

export type DrawerParamList = {
  Map: undefined;
  Dashboard: undefined;
  Products: undefined;
};
export interface DrawerNavProps {
  navigation: DrawerNavigation;
}
