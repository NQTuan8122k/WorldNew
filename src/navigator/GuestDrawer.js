import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GuestCustomDrawer} from '../components/CustomDrawer';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/fonts';
import {SCREEN_NAME} from '../constants/screenName';
import authContainer from '../screens/auth/auth.container';
import {scale} from '../utils/fontConfig';

const Drawer = createDrawerNavigator();

function GuestDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      id="RightDrawer"
      drawerContent={props => <GuestCustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.black,
        drawerActiveBackgroundColor: COLORS.gray,
        drawerLabelStyle: {
          marginLeft: scale(-20),
          fontFamily: FONT_FAMILY.MEDIUM,
        },
        drawerPosition: 'right',
      }}>
      {/* <Drawer.Screen
        name={SCREEN_NAME.AUTH_SCREEN}
        component={authContainer}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="login-variant"
              color={color}
              size={scale(20)}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name={RouteConstant.Signup}
        component={SignUpContainer}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-plus-outline"
              color={color}
              size={scale(20)}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={RouteConstant.ForgotPassword}
        component={ForgotPasswordScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-plus-outline"
              color={color}
              size={scale(20)}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}
export default GuestDrawer;
