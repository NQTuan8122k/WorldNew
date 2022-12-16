import React, {useCallback, useEffect} from 'react';
import {StatusBar, useColorScheme, Platform} from 'react-native';
import {SCREEN_NAME} from '../constants/screenName';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import HomeContainer from '../screens/home/home.container';
import {useDispatch, useSelector} from 'react-redux';
import NavigationServices from '../utils/navigationServices';
import NotificationModal from '../components/NotificationModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

let webClientId =
  Platform.OS == 'android'
    ? '344123500469-i49grpauufg77d9d58h8uhsqrp93kb1d.apps.googleusercontent.com'
    : '93177892516-j69ufnokhj5sn2f4b418ukm5ug166722.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: webClientId,
});

import {LINKING_URL} from '../constants/linkingURL';
import MainBottomTab from './mainBottomTab';
import ProductDetailContainer from '../screens/product_detail/productDetail.container';
import {COLORS} from '../constants/colors';
import ProductGalleryContainer from '../screens/productGallery/productGallery.container';
import FilterContainer from '../screens/filter/filter.container';
import AuthContainer from '../screens/auth/auth.container';
import confirmOPTContainer from '../screens/confirmOTP/confirmOPT.container';
import CreatePasswordContainer from '../screens/createPassword/createPassword.container';
import CartContainer from '../screens/cart/cart.container';
import MyAddress from '../screens/myAddress/myAddress.container';
import EditAddAddress from '../screens/customEditAddAddress';
import {
  notifeeListener,
  NotificationListener,
  requestUserPermission,
} from '../utils/pushNotification';
import ThanksContainer from '../screens/thanks/thanks.container';
import {getUserSelector} from '../redux/user/user.selectors';
import {GuestCustomDrawer} from '../components/CustomDrawer';
import requestPermission from '../utils/permission';
import CheckoutContainer from '../screens/checkout/checkout.container';
import MembershipClass from '../screens/MembershipClass/membership.container';

import PurchasedContainer from '../screens/purchased/purchased.container';
import ChangePassword from '../screens/account/components/ChangePassword';
import Profile from '../screens/account/components/Profile';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  const user = useSelector(getUserSelector);
  useEffect(() => {
    requestUserPermission();
    requestPermission();
    NotificationListener();
    const unsubscribe = notifeeListener();

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      <Stack.Screen
        name={SCREEN_NAME.BOTTOM_TAB_MAIN_SCREEN}
        component={MainBottomTab}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name={SCREEN_NAME.GALLERY_SCREEN}
        component={ProductGalleryContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.PRODUCT_DETAIL_SCREEN}
        component={ProductDetailContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.FILTER_SCREEN}
        component={FilterContainer}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      /> */}
      <Stack.Screen
        name={SCREEN_NAME.AUTH_SCREEN}
        component={AuthContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.CONFIRM_OTP_SCREEN}
        component={confirmOPTContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.CREATE_PASSWORD_SCREEN}
        component={CreatePasswordContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.CART_SCREEN}
        component={CartContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.THANKS_SCREEN}
        component={ThanksContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.GUEST_DRAWER}
        component={GuestCustomDrawer}
      />
      <Stack.Screen
        name={SCREEN_NAME.CHECK_OUT_SCREEN}
        component={CheckoutContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.PURCHASED_SCREEN}
        component={PurchasedContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.MY_ADDRESS_SCREEN}
        component={MyAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.EDIT_ADD_SCREEN}
        component={EditAddAddress}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.MEMBER_CLASS}
        component={MembershipClass}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.PROFILE_SCREEN}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppContainer = () => {
  const dispatch = useDispatch();

  const config = {
    screens: {
      CART_SCREEN: 'CART_SCREEN',
      HOME_SCREEN: 'HOME_SCREEN',
      PURCHASED_SCREEN: 'PURCHASED_SCREEN',
      THANKS_SCREEN: 'THANKS_SCREEN',
      // PURCHASED_SCREEN: {
      //   path: 'PURCHASED_SCREEN/:status',
      //   parse: {
      //     status: status => `${status}`,
      //   },
      // },
    },
  };
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.dark_bg : COLORS.light_bg,
  };
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: string,
      background: COLORS.light_bg,
      // background: isDarkMode ? COLORS.dark_bg : COLORS.light_bg,
      // card: string,
      text: COLORS.light_basic_text,
      // text: isDarkMode ? COLORS.dark_basic_text : COLORS.light_basic_text,
      border: COLORS.border,
      // notification: string,
    },
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={NavigationServices.navigationRef}
        linking={{
          prefixes: [LINKING_URL().ORIGIN],
          config,
        }}
        theme={MyTheme}>
        {/* <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        /> */}
        <MainStack />
        <NotificationModal />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
